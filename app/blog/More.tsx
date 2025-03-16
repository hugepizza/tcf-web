"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { PostItem } from "./PostItem";
import { fetchPosts } from "./actions";
import { useInView } from "react-intersection-observer";
import { Loader2 } from "lucide-react";

export function More({ tagId }: { tagId?: string }) {
  const pageSize = 6;
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: async ({ pageParam = 2 }) => {
        const res = await fetchPosts(pageParam, pageSize, tagId);
        return res?.data?.items || [];
      },
      getNextPageParam: (lastPage, allPages) => {
        // 如果最后一页数据少于 pageSize，说明没有更多数据了
        return lastPage.length === pageSize
          ? allPages.length + 2 // 因为从第2页开始
          : undefined;
      },
      initialPageParam: 2,
    });

  // 当观察元素进入视图时加载更多
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="col-span-2 lg:col-span-3 flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* 展示所有已加载的文章 */}
      {data?.pages.map((group, i) =>
        group.map((post) => <PostItem key={post.id} {...post} />)
      )}

      {/* 加载更多触发器 */}
      <div
        ref={ref}
        className="col-span-2 lg:col-span-3 flex justify-center py-8"
      >
        {isFetchingNextPage ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : hasNextPage ? (
          <span className="text-sm text-muted-foreground">
            向下滚动加载更多
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">没有更多文章了</span>
        )}
      </div>
    </>
  );
}
