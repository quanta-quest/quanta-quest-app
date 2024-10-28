"use client";
import { Upload, X, File as FileIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  OpenFileDialog,
  ReadFile,
  ReceiveFile,
  SaveFile,
} from "@/wailsjs/go/controller/FileController";
import { Button } from "../ui/button";
import { ImportAppSource } from "@/wailsjs/go/controller/AppSource";

interface FileUploaderProps {
  label: string;
  onFileChanged: (file: File | null) => void;
}

const FileUploader = ({ label, onFileChanged }: FileUploaderProps) => {
  const [parserLoading, setParserLoading] = useState(false);
  const [error, setError] = useState("");

  // 清除选择的文件
  const clearFile = () => {
    setError("");
  };

  return (
    <div className="">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="file">{label}</Label>
        <Input
          id="file"
          type="file"
          onChange={(event) => {
            if (!event.target) {
              onFileChanged(null);
              console.log("target is empty");
              return;
            }

            const files = event.target.files;

            if (!files || files.length === 0) {
              onFileChanged(null);
              console.log("files is empty");
              return;
            }

            onFileChanged(files[0]);
          }}
        />
      </div>
      {/* <div className="mb-4">
        <div className="mb-2 flex items-center gap-4">
          <button
            onClick={handleFileSelect}
            disabled={loading}
            className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            选择文件
          </button>

          {selectedFile && (
            <button
              onClick={clearFile}
              className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              <X className="h-4 w-4" />
              清除
            </button>
          )}
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileIcon className="h-4 w-4" />
            <span>{selectedFile}</span>
          </div>
        )}

        {fileList && (
          <div className="flex flex-col items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <FileIcon className="h-4 w-4" />
              <span>{fileList[0].name}</span>
              <span>{fileList[0].size}</span>
            </div>
          </div>
        )}
      </div> */}

      {error && (
        <div className="mb-4 rounded bg-red-50 p-4 text-red-500">{error}</div>
      )}

      {parserLoading && (
        <div className="text-center text-gray-600">处理中...</div>
      )}
    </div>
  );
};

export default FileUploader;
