import type React from "react";

import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useState } from "react";
import { BulkUploadStatus } from ".";

interface BulkUploaderProps {
  onFileUpload?: (files: FileList) => void;
}

export function BulkUploader({ onFileUpload }: BulkUploaderProps) {
  const [uploadStatus, setUploadStatus] = useState<BulkUploadStatus>({
    isUploading: false,
    maxFileSize: "5 MB",
    recentUpload: "Image.png successfully uploaded",
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && onFileUpload) {
      onFileUpload(files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(setUploadStatus);
    if (files && onFileUpload) {
      onFileUpload(files);
    }
  };

  return (
    <Card className=" border-[#203265] bg-dashboard-card-bg p-6 rounded-xl">
      <div
        className=" border-gray-600 rounded-lg md:p-8 text-center hover:border-gray-500 transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,.mp4"
          onChange={handleFileSelect}
          className="hidden"
          id="bulk-upload"
        />
        <label
          htmlFor="bulk-upload"
          className="cursor-pointer grid place-items-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="44"
            viewBox="0 0 40 44"
            fill="none"
          >
            <path
              d="M38 28.6667V37.5556C38 38.7343 37.5786 39.8648 36.8284 40.6983C36.0783 41.5317 35.0609 42 34 42H6C4.93913 42 3.92172 41.5317 3.17157 40.6983C2.42143 39.8648 2 38.7343 2 37.5556V28.6667M30 13.1111L20 2M20 2L10 13.1111M20 2V28.6667"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="text-title-color text-xl md:text-2xl font-medium mt-6">
            Bulk Uploader
          </h3>
          <p className="text-title-color text-sm mt-4">
            Max file size {uploadStatus.maxFileSize}
          </p>

          {uploadStatus.recentUpload && (
            <div className="flex flex-col md:flex-row items-center w-full md:justify-center gap-2 text-green-400 bg-[#16294E] md:px-16  rounded-xl  px-4 py-2 md:py-5  text-sm mt-12">
              <Check className="w-4 h-4" />
              <span>{uploadStatus.recentUpload}</span>
            </div>
          )}
        </label>
      </div>
    </Card>
  );
}
