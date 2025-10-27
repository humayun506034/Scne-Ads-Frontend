"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFiles } from "@/store/Slices/campaign/campaignSlice";
import { BulkUploader } from "./BulkUploader";
import { UploadedFileCard } from "./UploadFileCard";
import { UploadedFile } from ".";
import { useState } from "react";

export default function MobileUploadGraphics() {
  const dispatch = useAppDispatch();
  const uploadedFiles = useAppSelector((state) => state.campaign.files);

  // Optional local preview (for showing fake files before actual upload)
  const [localPreview, setLocalPreview] = useState<UploadedFile[]>([]);

  const handleBulkUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    dispatch(setFiles(fileArray));

    const previews: UploadedFile[] = fileArray.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      dimensions: "1920x1080",
      fileType: file.type,
      type: "landscape", 
      compatible: true,
    }));

    setLocalPreview(previews);
  };

  return (
    <div className="bg-dashboard-card-bg rounded-xl p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-medium mb-2">
          Upload Graphics
        </h1>
        <p className="text-title-color text-sm">
          Upload your images and media files for your campaigns.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="uploads" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#16294E] border-[#16294E]">
          <TabsTrigger
            value="uploads"
            className="text-title-color data-[state=active]:text-white data-[state=active]:bg-dashboard-card-bg"
          >
            Uploads
          </TabsTrigger>
          <TabsTrigger
            value="bulk"
            className="text-title-color data-[state=active]:text-white data-[state=active]:bg-dashboard-card-bg"
          >
            Bulk
          </TabsTrigger>
        </TabsList>

        {/* Uploaded Files */}
        <TabsContent value="uploads" className="mt-6">
          <div className="bg-dashboard-card-bg rounded-xl md:p-4 md:mb-6">
            <div className="flex bg-[#16294E] p-4 rounded-xl items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <rect width="22" height="22" fill="none" />
                <path
                  d="M7.45655 20.1634C6.83793 20.1634 6.30836 19.9839 5.86783 19.6249C5.4273 19.2658 5.20703 18.8342 5.20703 18.3301V5.49675H7.45655V18.3301H23.2032V20.1634H7.45655Z"
                  fill="#14CA74"
                />
              </svg>
              <span className="text-white text-base font-medium">
                Your Uploads
              </span>
            </div>

            <div className="space-y-4 mt-12">
              {localPreview.length > 0 ? (
                localPreview.map((file) => (
                  <UploadedFileCard key={file.id} file={file} />
                ))
              ) : uploadedFiles.length > 0 ? (
                uploadedFiles.map((file, i) => (
                  <UploadedFileCard
                    key={i}
                    file={{
                      id: String(i),
                      name: file.name,
                      url: URL.createObjectURL(file),
                      dimensions: "1920x1080",
                      fileType: file.type,
                      type: "landscape", // Default value, you might want to determine this based on actual file dimensions
                      compatible: true,
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center">
                  No uploads yet.
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Bulk Upload Tab */}
        <TabsContent value="bulk" className="mt-6">
          <BulkUploader onFileUpload={handleBulkUpload} />
        </TabsContent>
      </Tabs>
    </div>
  );
}