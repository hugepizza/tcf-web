"use server";

import { z } from "zod";
import { Post, postSchema } from "./schema";
import { fetchQuery } from "@/lib/server-fetch";

const postListSchema = z.object({
  pins: z.array(postSchema),
  items: z.array(postSchema),
  count: z.number(),
});

type PostList = z.infer<typeof postListSchema>;

export const fetchPosts = async (
  page: number,
  pageSize: number,
  tagId?: string
) => {
  // 创建一个url对象
  let url = "/posts";
  if (tagId) {
    url += `?tagId=${tagId}&page=${page}&pageSize=${pageSize}`;
  } else {
    url += `?page=${page}&pageSize=${pageSize}`;
  }
  const response = await fetchQuery<PostList>({
    path: url,
  });
  return response;
};

export const fetchPost = async (id: string) => {
  const response = await fetchQuery<Post>({
    path: `/posts/${id}`,
  });
  return response;
};
