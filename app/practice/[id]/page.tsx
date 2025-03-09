import Side from "./Side";
import Action from "./Action";
import { Practice } from "@/shared/schemas/practice";
import { notFound } from "next/navigation";
import Main from "./Main";
import PracticeProvider from "./context";
import HeaderServer from "@/components/Header/Universal";
import { fetchQuery } from "@/lib/server-fetch";

async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchQuery<Practice>({ path: `/practices/${id}` });
  console.log("data", data);
  if (!data.data) {
    return notFound();
  }
  const practice = data.data;
  const currentQuestion = practice.questions.find(
    (question) => question.id === practice.currentQuestion
  );
  if (!currentQuestion) {
    return notFound();
  }
  return (
    <div className="flex flex-col w-full sm:h-screen">
      <HeaderServer />
      <PracticeProvider practice={practice}>
        {/* 手机端反向布局 题目在上面看起来合理一点 */}
        <div className="flex sm:flex-row flex-col-reverse  w-full grow">
          <Side />
          <div className="grow flex flex-col bg-[#FAFAFA]">
            <Main />
            <Action />
          </div>
        </div>
      </PracticeProvider>
    </div>
  );
}

export default PracticePage;
