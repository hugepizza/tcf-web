import { apiUrl } from "@/lib/api";
import { Megaphone } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

async function Announcement() {
  const announcement = await fetch(apiUrl("/posts/announcement"));
  const announcementData = (await announcement.json()).data;
  if (!announcementData) return null;
  return (
    <div className="relative w-full max-w-[calc(100%-1rem)] mx-auto mt-1 text-sm bg-[#FCFCFC] border border-[#E0E0E085] rounded-lg filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      {/* 标题栏 */}
      <div className="p-2 flex items-center">
        <Megaphone className="w-4 h-4 mr-1 text-[#8c8c8c85]" />
        <h2 className="font-normal text-sm text-[#8c8c8c]">公告栏</h2>
      </div>

      <div className="bg-white rounded-b-lg rounded-t-lg border-y border-[#E0E0E085] py-2 px-4">
        {/* 内容区域 */}
        <article
          className="prose prose-sm dark:prose-invert max-w-none
          prose-p:my-1 prose-p:text-gray-600
          prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-700
          prose-ul:my-1 prose-li:my-0
          prose-code:text-pink-500 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
          prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600 prose-blockquote:my-2
          prose-h1:text-base prose-h1:font-medium prose-h1:text-gray-700 prose-h1:my-2
          prose-h2:text-sm prose-h2:font-medium prose-h2:text-gray-600 prose-h2:my-1.5
          prose-h3:text-sm prose-h3:font-normal prose-h3:text-gray-600 prose-h3:my-1
        "
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {announcementData.content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
export default Announcement;
