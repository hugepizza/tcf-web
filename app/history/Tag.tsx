import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function GradeTag({
  score,
  practiceId,
}: {
  score: number | null;
  practiceId: string;
}) {
  // 根据分数确定徽章的背景颜色
  const getBadgeColor = (score: number) => {
    if (score >= 500) return "border-green-500 text-green-500"; // 舒缓的绿色
    if (score >= 400) return "border-yellow-500 text-yellow-500"; // 黄色
    if (score >= 300) return "border-orange-500 text-orange-500"; // 橙色
    return "border-red-500 text-red-500"; // 红色
  };

  if (score !== null) {
    return (
      <Badge
        variant="outline"
        className={`w-[72px] rounded-lg ${getBadgeColor(score)} text-center`}
      >
        <div className="w-full text-center">{score}分</div>
      </Badge>
    );
  } else {
    return (
      <Link href={`/practice/${practiceId}`}>
        <Badge
          variant="outline"
          className={`w-[72px] rounded-lg ${getBadgeColor(500)} text-center`}
        >
          <div className="w-full text-center">继续答题</div>
        </Badge>
      </Link>
    );
  }
}
