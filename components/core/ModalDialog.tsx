// 移除 "use client" 指令
import { ReactNode, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  maxWidth?: string;
}

export function ModalDialog({
  isOpen,
  onOpenChange,
  trigger,
  title,
  children,
  footer,
  maxWidth = "lg:max-w-[480px]",
}: ModalDialogProps) {
  const handleOpenChange = useCallback((open: boolean) => {
    onOpenChange(open);
  }, [onOpenChange]);

  return (
    <>
      <style jsx global>{`
        .modal-animation {
          transform-origin: 50% 50%;
          animation: scaleIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .modal-animation[data-state='closed'] {
          animation: scaleOut 0.15s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .modal-overlay {
          animation: fadeIn 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .modal-overlay[data-state='closed'] {
          animation: fadeOut 0.15s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        @keyframes scaleIn {
          0% {
            transform: translate(-50%, -48%) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        @keyframes scaleOut {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -48%) scale(0.95);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 modal-overlay" />
          <Dialog.Content
            className={`fixed left-1/2 top-1/2 z-50 w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white antialiased shadow-sm dark:bg-black ${maxWidth} modal-animation`}
          >
            {title && (
              <Dialog.Title className="p-5 pb-3 text-lg font-medium text-gray-900">
                {title}
              </Dialog.Title>
            )}

            <div className="px-5 text-gray-600">
              {children}
            </div>

            {footer && (
              <div className="mt-6 flex justify-between rounded-b-xl border-t border-gray-200 bg-gray-50 p-5">
                {footer}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}