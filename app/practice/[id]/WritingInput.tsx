"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
function WritingInput({
  text,
  setText,
  disabled,
  practiceId,
  questionIndex,
}: {
  text: string;
  setText: (text: string) => void;
  disabled: boolean;
  practiceId: string;
  questionIndex: number;
}) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (disabled) {
      return;
    }
    if (typeof window !== "undefined") {
      const localData = window.localStorage.getItem(
        `writing-draft-${practiceId}-${questionIndex}`
      );
      console.log("key", `writing-draft-${practiceId}-${questionIndex}`);
      console.log("localData", localData);
      if (localData) {
        if (localData.length > text.length) {
          console.log("localData", localData);
          setText(localData);
        }
      }
    }
  }, [questionIndex]);

  const [debouncedAnswer] = useDebounce(text, 300);

  useEffect(() => {
    if (debouncedAnswer) {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          `writing-draft-${practiceId}-${questionIndex}`,
          debouncedAnswer
        );
      }
    }
  }, [debouncedAnswer]);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: {
          keepMarks: true,
        },
      }),
      HardBreak,
    ],
    content: text.replace(/\n\n/g, "<br>").replace(/\n/g, "<br>"),
    immediatelyRender: false,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      const content = editor.getText();
      setText(content);
    },
  });

  useEffect(() => {
    console.log("text effect", text);

    if (editor && text !== editor.getText()) {
      editor.commands.setContent(
        text.replace(/\n\n/g, "<br>").replace(/\n/g, "<br>")
      );
    }
  }, [text, editor]);

  useEffect(() => {
    const content = text;
    // 计算单词数 通过\n\n 和 \n  和 空格分割
    const n = content
      .split(/[\n\n\s]/)
      .filter((s) => s.trim().length > 0).length;
    if (!content) {
      setCounter(0);
    } else {
      setCounter(n);
    }
  }, [text]);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full border-[1px] rounded-[4px] border-[#CCCCCC] overflow-scroll">
        <EditorContent
          editor={editor}
          className="h-full [&_.ProseMirror]:h-full [&_.ProseMirror]:p-4 [&_.ProseMirror]:bg-white [&_.ProseMirror]:outline-none"
        />
      </div>
      <div className="text-end text-sm text-[#434343]">
        字数统计 {counter > 0 && `${counter} word${counter > 1 ? "s" : ""}`}
      </div>
    </div>
  );
}

export default WritingInput;
