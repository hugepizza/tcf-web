import { PostItem } from "./PostItem";
import { More } from "./More";
import { fetchPosts } from "./actions";
import QueryClientProvider from "@/app/context/ClientQuery";

async function PostPage() {
  const response = await fetchPosts(1, 6);
  if (!response.data) {
    return <div>No posts</div>;
  }
  const { pins, items } = response.data;
  return (
    <div className="min-h-screen bg-black-50">
      {/* Header Section */}
      <div className="flex items-center gap-2 h-32 sm:h-40 px-4 sm:px-8 md:px-12 lg:px-48 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <h1 className="text-xl sm:text-[25px] font-medium bg-gradient-to-r from-[#3861FB] to-[#0F2694] text-transparent bg-clip-text border-b border-black-100">
          备考攻略
        </h1>
      </div>

      {/* Content Section */}
      <div className="w-full py-6 sm:py-8 md:py-12 px-4 sm:px-8 md:px-12 lg:px-48 space-y-8">
        {/* Pinned Posts Section */}
        {pins.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">精选内容</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {pins.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium">全部内容</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
            {items.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
            <QueryClientProvider>
              <More />
            </QueryClientProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
