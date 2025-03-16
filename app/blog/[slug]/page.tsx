import Link from "next/link";
import { fetchPost } from "../actions";
import { notFound } from "next/navigation";
import dayjs from "dayjs";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // 这里可以根据 slug 获取文章数据
  // const post = await fetchPostBySlug(params.slug);
  const post = await fetchPost(slug);
  if (!post.data) {
    notFound();
  }

  return (
    <article className="w-full px-4 sm:px-8 md:px-12 lg:px-48 py-12">
      {/* 面包屑导航 */}
      <nav className="pt-12 pb-8">
        <div className="flex items-center justify-center text-sm text-gray-600">
          <Link href="/blog" className="hover:text-gray-900">
            ← 备考攻略
          </Link>
          {post.data.tags.map((tag) => (
            <>
              <span className="mx-2">/</span>
              <span className="text-black-800 font-medium">{tag.title}</span>
            </>
          ))}
        </div>
      </nav>
      {/* 主要内容区 */}
      <div className="max-w-[750px] mx-auto">
        {/* 文章标题 */}
        <h1 className="text-4xl font-medium text-black-900 tracking-tight mb-8 text-center">
          {post.data.title}
        </h1>

        {/* 标签、阅读时间和日期 */}
        <div className="flex items-center justify-between mb-12">
          {/* 左侧：标签和阅读时间 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {post.data.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                >
                  {tag.title}
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {post.data.readingTime} min read
            </span>
          </div>

          {/* 右侧：日期 */}
          <time className="text-sm text-gray-500">
            {dayjs(post.data.createdAt).format("MMM D YYYY")}
          </time>
        </div>

        {/* 文章摘要 */}
        {/* <div className="text-xl text-gray-600 mb-12">
        Expanding v0's offering for fast-moving teams and organizations with
        strict security requirements.
      </div> */}

        {/* 文章内容 */}
        <div className="prose prose-base dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.data.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
