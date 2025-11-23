import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({loading}) => {
  return (
    <div>
      <AlertDialog open={loading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="sr-only">Loading</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <div className="flex flex-col items-center py-10">
                  <Image alt="Loading animation" src="/loading.gif" width={100} height={100} unoptimized/>
                  <p className="mt-4 text-lg font-medium">Please wait... AI is working on your request</p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LoadingDialog;