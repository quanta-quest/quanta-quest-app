import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { DeleteAppSource } from "@/wailsjs/go/controller/AppSource";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { APP_INFO_LIST } from "@/lib/constants/apps";

interface ClearAppDataModalProps {
  appKey: string;
  buttonClassName?: string;
}

const ClearAppDataModal = ({
  appKey,
  buttonClassName,
}: ClearAppDataModalProps) => {
  const { setCurrentPage } = useAppStore();
  const [deleting, setDeleting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getAppName = () => {
    return APP_INFO_LIST.find((app) => app.key === appKey)?.name || "";
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size={"sm"} variant={"destructive"} className={buttonClassName}>
          Delete App
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You are deleting {getAppName()}</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm: This will permanently erase data of this app. You
            cannot undo this action.
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
              DeleteAppSource(appKey)
                .then((res) => {
                  if (res.code === 200) {
                    toast.success("Clear data success");
                    setOpen(false);
                    setCurrentPage("apps");
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

export default ClearAppDataModal;
