"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePractice } from "./context";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Grade } from "@/shared/schemas/practice";

function Side() {
  const {
    practice,
    jumpToQuestion,
    clientSideCurrentQuestion,
    clientSideAnswers,
    isSubmitted,
  } = usePractice();
  const { back } = useRouter();
  return (
    <div className="sm:w-[236px] w-full  flex flex-col gap-2 pt-[15px]  pb-2 px-3 border-[#F2F2F2] border-[1px]">
      <div>
        <Button
          variant="outline"
          className="w-full border-[#FF2442] text-[#FF2442] hover:bg-[#FF2442] hover:text-white"
          onClick={() => back()}
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </Button>
      </div>

      <div className="w-full px-4 h-[1px] bg-[#E6E6E6]" />

      {isSubmitted && (
        <>
          {practice.grade && <Grades grade={practice.grade} />}
          <div className="w-full px-4 h-[1px] bg-[#E6E6E6]" />
        </>
      )}

      <div className="flex flex-col gap-2">
        <div className="text-center font-semibold">题目选择</div>
        <div className="inline-flex gap-2 justify-center text-[#595959] text-sm">
          {!isSubmitted ? (
            <>
              <div className="inline-flex gap-1 items-center">
                <div className="bg-[#1782FF] w-4 h-4 rounded-md"></div>当前
              </div>
              <div className="inline-flex gap-1 items-center">
                <div className="bg-[#434343] w-4 h-4 rounded-md"></div>已答
              </div>
            </>
          ) : (
            <>
              <div className="inline-flex gap-1 items-center">
                <div className="bg-[#18A058] w-4 h-4 rounded-md"></div>正确
              </div>
              <div className="inline-flex gap-1 items-center">
                <div className="bg-[#FF2442] w-4 h-4 rounded-md"></div>错误
              </div>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-6 gap-1 text-center">
        {practice.questions.map((question, index) => (
          <div
            key={question.id}
            className={cn(
              "aspect-square text-[#595959]  font-medium w-full h-full bg-[#F2F2F2] rounded-md flex items-center justify-center cursor-pointer",
              !isSubmitted &&
                clientSideAnswers.find(
                  (answer) => answer.questionId === question.id
                )?.answer !== "" &&
                "bg-[#434343] text-white",
              !isSubmitted &&
                question.id === clientSideCurrentQuestion &&
                "bg-[#1782FF] text-white",
              isSubmitted &&
                clientSideAnswers.find(
                  (answer) => answer.questionId === question.id
                )?.answerKey ===
                  clientSideAnswers.find(
                    (answer) => answer.questionId === question.id
                  )?.answer &&
                "bg-[#18A058] text-white",
              isSubmitted &&
                clientSideAnswers.find(
                  (answer) => answer.questionId === question.id
                )?.answerKey !==
                  clientSideAnswers.find(
                    (answer) => answer.questionId === question.id
                  )?.answer &&
                "bg-[#FF2442] text-white"
            )}
            onClick={() => jumpToQuestion(question.id)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function Grades({ grade }: { grade: Grade }) {
  return (
    <div className="flex flex-col gap-2 justify-center w-full">
      <div className="w-full text-center">
        <span className="text-[#595959] text-xl font-semibold">得分：</span>
        <span className="text-[#1782FF] text-xl font-semibold">
          {grade.score}
        </span>
      </div>
      <div className="w-full text-center">
        <div>
          <span className="text-[#595959]  font-semibold">NCLC分数：</span>
          <span className="text-[#1782FF]  font-semibold">{grade.nclc}</span>
        </div>
        <div>
          <span className="text-[#595959]  font-semibold">CECRL等级：</span>
          <span className="text-[#1782FF]  font-semibold">{grade.ceral}</span>
        </div>
      </div>
    </div>
  );
}
export default Side;
