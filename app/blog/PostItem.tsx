"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { z } from "zod";
import { assetUrl } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { dateStringSchema } from "@/shared/schemas/base-schema";

interface PostItemProps {
  title: string;
  content: string;
  createdAt: z.infer<typeof dateStringSchema>;
  tags: { id: string; title: string }[];
  cover: string;
  id: string;
  readingTime: number;
}

export function PostItem({
  title,
  content,
  createdAt,
  tags,
  cover,
  id,
  readingTime,
}: PostItemProps) {
  const { push } = useRouter();
  return (
    <Card className="group hover:bg-accent/50 transition-colors rounded-xl shadow-none border-none flex flex-col min-h-40 max-h-[32rem] relative overflow-hidden">
      {cover && (
        <div className="absolute inset-0 opacity-10 w-full h-full overflow-hidden">
          <Image
            src={assetUrl(cover)}
            alt={title}
            fill
            className="object-cover object-top w-full"
            sizes="100vw"
          />
        </div>
      )}

      <CardHeader className="flex-1 p-2 lg:p-6">
        <div className="flex items-center lg:gap-4 gap-2 justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Badge key={t.id} variant="outline" className="text-xs">
                {t.title}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            {dayjs(createdAt).format("MMM D")}
          </div>
        </div>

        <CardTitle className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors mb-4">
          <Link href={`/blog/${id}`}>{title}</Link>
        </CardTitle>

        <CardDescription
          className="max-h-[12rem] sm:max-h-[16rem] md:max-h-[20rem] overflow-hidden cursor-pointer relative"
          onClick={() => push(`/blog/${id}`)}
        >
          <article className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </article>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent" />
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto p-2 lg:p-6">
        {/* 移除原来的 tags 渲染部分 */}
      </CardContent>
    </Card>
  );
}
