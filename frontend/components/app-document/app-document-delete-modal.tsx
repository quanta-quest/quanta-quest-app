import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { DeleteAppSource } from "@/wailsjs/go/controller/AppSource";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { DeleteAppDocument } from "@/wailsjs/go/controller/AppDocumentController";
import { useAppStore } from "@/stores/app-store";

interface AppDocumentDeleteModalProps {
  id: number;
  title: string;
  buttonClassName?: string;
}

const AppDocumentDeleteModal = ({
  id,
  title,
  buttonClassName,
}: AppDocumentDeleteModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const { fetchAppDocumentTableData } = useAppStore();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please confirm delete</AlertDialogTitle>
          <AlertDialogDescription>
            You are deleting {"["}
            <span className="font-medium text-foreground">{title}</span>
            {"]"}. This will permanently delete this document. You cannot undo
            this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction asChild> */}
          <Button
            variant={"destructive"}
            onClick={(e) => {
              e.preventDefault();
              setDeleting(true);
              DeleteAppDocument(id)
                .then((res) => {
                  if (res.code === 200) {
                    toast.success("Delete success");
                    setOpen(false);
                    fetchAppDocumentTableData();
                  } else {
                    toast.error(res.message);
                  }
                  setDeleting(false);
                })
                .catch(() => {
                  toast.error("Clear data failed");
                })
                .finally(() => {
                  setDeleting(false);
                });
            }}
          >
            {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes, delete it
          </Button>
          {/* </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppDocumentDeleteModal;
