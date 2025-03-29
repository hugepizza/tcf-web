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
    <div className="flex flex-col w-full min-h-screen sm:h-screen">
      <HeaderServer />
      <PracticeProvider practice={practice}>
        {/* 手机端反向布局 题目在上面看起来合理一点 */}
        <div className="flex sm:flex-row flex-col-reverse w-full grow sm:h-[calc(100vh-57px)] relative">
          <div className="sm:w-1/6 w-full flex flex-col gap-2 p-2 border-[#F2F2F2] sm:border-r-[1px] sm:h-full">
            <Side />
          </div>
          <div className="sm:w-5/6 w-full flex flex-col bg-white h-full">
            <div className="flex-1 overflow-auto pb-[64px] sm:pb-0">
              <Main />
            </div>
            <div className="fixed sm:relative bottom-0 left-0 right-0 z-50">
              <Action />
            </div>
          </div>
        </div>
      </PracticeProvider>
    </div>
  );
}

export default PracticePage;
