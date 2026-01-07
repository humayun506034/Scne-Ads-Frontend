import type React from "react";

import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

interface BulkUploaderProps {
  onFileUpload?: (files: FileList) => void;
}

export function BulkUploader({ onFileUpload }: BulkUploaderProps) {


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
          <Upload className="w-12 h-12 text-white" />
          <h3 className="text-title-color text-xl md:text-2xl font-medium mt-6">
            Bulk Uploader
          </h3>
        
        </label>
      </div>
    </Card>
  );
}
