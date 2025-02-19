"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useEffect } from "react";
import { Icon } from "../ui/icon";

export const Dialog = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams.get("showDialog");

  useEffect(() => {
    if (showDialog === "y") {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const dialog: JSX.Element | null =
    showDialog === "y" ? (
      <dialog
        ref={dialogRef}
        className="top-50 left-50 -translate-x-50 -translate-y-50 fixed z-10  rounded-xl backdrop:bg-gray-800/50"
      >
        <div className="max-w-fullbg-gray-200 flex w-[500px] flex-col">
          <div className="mb-4 flex flex-row justify-between bg-yellow-400 px-5 pt-2">
            <button
              onClick={closeDialog}
              className="mb-2 h-8 w-8 cursor-pointer rounded border-none bg-red-600 px-2 py-1 font-bold text-white"
            >
              <Icon icon="carbon:close" className="size-6" />
            </button>
          </div>
          <div className="px-5 pb-6">{children}</div>
        </div>
      </dialog>
    ) : null;

  return dialog;
};
