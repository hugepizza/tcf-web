"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deletePractice } from "./actions";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DeleteAll() {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          删除全部记录
          <Trash className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要删除全部记录吗？</AlertDialogTitle>
          <AlertDialogDescription>
            此操作无法撤销。这将永久删除您的所有记录。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deletePractice("all");
              router.refresh();
            }}
          >
            继续
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DeleteOne({ practiceId }: { practiceId: string }) {
  const router = useRouter();
  return (
    <Trash
      className="w-4 h-4"
      onClick={async (e) => {
        e.stopPropagation();
        await deletePractice(practiceId);
        router.refresh();
      }}
    />
  );
}
