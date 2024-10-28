"use client";
import React, { useMemo, useState } from "react";
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
import FileUploader from "./file-uploader";
import { ImportAppSource } from "@/wailsjs/go/controller/AppSource";
import { ReceiveFile } from "@/wailsjs/go/controller/FileController";
import { controller } from "@/wailsjs/go/models";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";

interface AppSourceDataImportModalProps {
  appKey: string;
  appName: string;
  buttonClassName?: string;
}

const AppSourceDataImportModal = ({
  appKey,
  appName,
  buttonClassName,
}: AppSourceDataImportModalProps) => {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [importLoading, setImportLoading] = useState(false);
  const path = "apps/" + appKey + "/imports";
  const [importStage, setImportStage] = useState("");
  const { fetchAppSourceList, refreshAppDocumentTableData } = useAppStore();

  const importStageText = useMemo(() => {
    if (importStage === "upload") {
      return "Uploading...";
    } else if (importStage === "parser") {
      return "Parsing...";
    }

    return "Importing...";
  }, [importStage]);

  const importHandler = () => {
    if (!file) {
      return;
    }
    setError("");
    setImportLoading(true);
    setImportStage("");

    try {
      const reader = new FileReader();
      reader.onload = async function (e) {
        if (!e.target) return;

        // check for file type
        if (file.type !== "application/zip") {
          setError("File type must be zip");
          setImportLoading(false);
          setImportStage("");
          return;
        }

        setImportStage("upload");
        const arrayBuffer = e.target.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        try {
          // Assuming you have a Go function named 'ReceiveFile'
          const fileName = file.name.split(".")[0];
          const fileExt = file.name.split(".")[1];
          // generate a unique file name
          const uniqueFileName = Date.now() + "-" + fileName + "." + fileExt;
          const saveFileResult = await ReceiveFile(
            path,
            uniqueFileName,
            Array.from(uint8Array),
          );
          if (saveFileResult.code !== 200) {
            setError(saveFileResult.message);
            setImportLoading(false);
            setImportStage("");
            toast.warning("File upload failed.");
            return;
          } else {
            toast.success("File upload successfully, start to parsing.");
          }
          setImportStage("parser");
          const appSource: controller.ImportAppSourceReq = {
            appKey: appKey,
            zipFilePath: saveFileResult.data,
          };

          ImportAppSource(appSource)
            .then((res) => {
              if (res.code === 200) {
                setOpen(false);
                toast.success("Import success.");
                fetchAppSourceList();
                refreshAppDocumentTableData();
              } else {
                toast.warning("Import failed");
                setError(saveFileResult.message);
              }
              setImportLoading(false);
              setImportStage("");
            })
            .catch((error) => {
              console.error("Import failed:", error);
              setImportLoading(false);
              setError("Import failed.");
              setImportStage("");
            });
        } catch (error) {
          console.error("Error uploading file:", error);
          setImportLoading(false);
          setError("File upload failed.");
          setImportStage("");
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err: any) {
      setError("File upload failed: " + err.message);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"sm"} className={buttonClassName}>
          Import
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please import your data file</AlertDialogTitle>
          <AlertDialogDescription>
            You can import your data file to Quanta Quest, It will parser files,
            and save to local database. And you can management them in app page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <FileUploader
            label={`Please upload your file to ${appName}`}
            onFileChanged={(file) => {
              setFile(file);
            }}
          />
          {error && (
            <div className="rounded-md bg-red-50 p-4 text-red-500">{error}</div>
          )}
          {importLoading && (
            <div className="rounded-md bg-secondary p-4 text-sm text-secondary-foreground">
              {importStageText} It will take a few minutes.
            </div>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={importLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={!file || importLoading}
            onClick={(e) => {
              e.preventDefault();
              importHandler();
            }}
          >
            {importLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Import"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppSourceDataImportModal;
