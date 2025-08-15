import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import {
  LocationTemplate,
  locationTemplates,
  mockUploadedFiles,
  UploadedFile,
} from ".";
import { BulkUploader } from "./BulkUploader";

import { LocationTemplateCard } from "./ImagePreviewer";
import { UploadedFileCard } from "./UploadFileCard";

export default function MobileUploadGraphics() {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(mockUploadedFiles);
  const [templates] = useState<LocationTemplate[]>(locationTemplates);

  const handleBulkUpload = (files: FileList) => {
    console.log("Bulk uploading files:", files);
  };

  const handleTemplateUpload = (templateId: string, files: FileList) => {
    console.log(`Uploading files for template ${templateId}:`, files);
  };

  return (
    <div className="min-h-screen bg-[#0B1739] p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-white text-xl font-bold mb-2">Upload Graphics</h1>
          <p className="text-gray-400 text-sm">
            Upload your images and media files for your campaigns.
          </p>
        </div>

        {/* Mobile Tabs */}
        <Tabs defaultValue="uploads" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#1a2332] border-[#2a3441]">
            <TabsTrigger
              value="uploads"
              className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#2a3441]"
            >
              Uploads
            </TabsTrigger>
            <TabsTrigger
              value="bulk"
              className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#2a3441]"
            >
              Bulk
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-[#2a3441]"
            >
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uploads" className="mt-6">
            <div className="bg-[#1a2332] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white text-sm font-medium">
                  Your Uploads
                </span>
              </div>

              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <UploadedFileCard key={file.id} file={file} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="mt-6">
            <BulkUploader onFileUpload={handleBulkUpload} />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <div className="space-y-4">
              {templates.map((template) => (
                <LocationTemplateCard
                  key={template.id}
                  template={template}
                  onFileUpload={handleTemplateUpload}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
