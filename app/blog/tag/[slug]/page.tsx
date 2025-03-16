import { PostItem } from "../../PostItem";
import { More } from "../../More";

import { Pin, SquareLibrary } from "lucide-react";
import { fetchPosts } from "../../actions";
import QueryClientProvider from "@/app/context/ClientQuery";

async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const response = await fetchPosts(1, 6, slug);
  if (!response.data) {
    return <div>No posts</div>;
  }

  const { pins, items } = response.data;
  return (
    <div className="w-full py-12 px-48 flex flex-col gap-4">
      {pins.length > 0 && <Pin />}
      <div className="grid grid-cols-3">
        {pins.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </div>
      <div className="h-4" />
      <SquareLibrary />
      <div className="grid grid-cols-3">
        {items.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
        <QueryClientProvider>
          <More />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default TagPage;
