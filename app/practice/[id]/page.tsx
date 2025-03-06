import { AlignLeft } from "lucide-react";
import Side from "./Side";
import Action from "./Action";
import headphone from "@/images/headphone.png";
import Image from "next/image";
import { Practice } from "@/shared/schemas/practice";
import { Subject } from "@/shared/enum";
import { notFound } from "next/navigation";
import { AudioPlayerWrapper } from "@/components/audio-player";
import { apiUrl } from "@/lib/api";
import Main from "./Main";
import PracticeProvider from "./context";
import HeaderServer from "@/components/Header/Universal";

async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetch(apiUrl(`/practices/${id}`));
  const practice = (await data.json()).data as Practice;
  const currentQuestion = practice.questions.find(
    (question) => question.id === practice.currentQuestion
  );
  if (!currentQuestion) {
    return notFound();
  }
  return (
    <div className="flex flex-col w-full h-screen">
      <HeaderServer />
      <PracticeProvider practice={practice}>
        <div className="flex sm:flex-row flex-col  w-full grow">
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
