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

export function UploadGraphicsSection() {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(mockUploadedFiles);
  const [templates] = useState<LocationTemplate[]>(locationTemplates);

  const handleBulkUpload = (files: FileList) => {
    console.log("Bulk uploading files:", files);
    // Handle bulk file upload logic here
  };

  const handleTemplateUpload = (templateId: string, files: FileList) => {
    console.log(`Uploading files for template ${templateId}:`, files);
    // Handle template-specific file upload logic here
  };

  return (
    <div className=" ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
          Upload Graphics
        </h1>
        <p className="text-sm mt-4 md:text-base">
          This can be done later. However, if your images are ready, you can
          upload them here right away.
        </p>
      </div>

      <div className="grid grid-cols-1 mt-12 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <div className="bg-dashboard-card-bg rounded-xl p-4 mb-6">
            <div className="flex bg-[#16294E] p-4 rounded-xl items-center gap-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <mask
                  id="mask0_556_1085"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="22"
                  height="22"
                >
                  <rect width="22" height="22" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_556_1085)">
                  <path
                    d="M22.0784 7.33008C21.7598 7.33008 21.4926 7.24223 21.2771 7.06654C21.0615 6.89084 20.9537 6.67313 20.9537 6.41341C20.9537 6.15369 21.0615 5.93598 21.2771 5.76029C21.4926 5.58459 21.7598 5.49675 22.0784 5.49675C22.3971 5.49675 22.6643 5.58459 22.8798 5.76029C23.0954 5.93598 23.2032 6.15369 23.2032 6.41341C23.2032 6.67313 23.0954 6.89084 22.8798 7.06654C22.6643 7.24223 22.3971 7.33008 22.0784 7.33008ZM13.0804 12.8301L16.1172 9.62175L17.8606 11.4551L20.4475 8.70508L24.328 12.8301H13.0804ZM7.45655 20.1634C6.83793 20.1634 6.30836 19.9839 5.86783 19.6249C5.4273 19.2658 5.20703 18.8342 5.20703 18.3301V5.49675H7.45655V18.3301H23.2032V20.1634H7.45655ZM9.70607 8.5905V3.66341C9.70607 3.15925 9.92634 2.72765 10.3669 2.36862C10.8074 2.00959 11.337 1.83008 11.9556 1.83008H17.5794V3.66341H11.9556V8.5905H9.70607ZM11.9556 16.4967C11.337 16.4967 10.8074 16.3172 10.3669 15.9582C9.92634 15.5992 9.70607 15.1676 9.70607 14.6634V10.4238H11.9556V14.6634H17.5794V16.4967H11.9556ZM19.8289 16.4967V14.6634H25.4527V10.4238H27.7022V14.6634C27.7022 15.1676 27.482 15.5992 27.0415 15.9582C26.6009 16.3172 26.0713 16.4967 25.4527 16.4967H19.8289ZM25.4527 8.5905V3.66341H19.8289V1.83008H25.4527C26.0713 1.83008 26.6009 2.00959 27.0415 2.36862C27.482 2.72765 27.7022 3.15925 27.7022 3.66341V8.5905H25.4527Z"
                    fill="#14CA74"
                  />
                </g>
              </svg>
              <span className="text-white text-base font-medium">
                Your Uploads
              </span>
            </div>

            <div className="space-y-4 mt-12">
              {uploadedFiles.map((file) => (
                <UploadedFileCard key={file.id} file={file} />
              ))}
            </div>
          </div>

          {/* Location Templates */}
        </div>

        {/* Right Column - Bulk Uploader */}
        <div className="lg:col-span-2">
          <BulkUploader onFileUpload={handleBulkUpload} />
        </div>
      </div>
      <div className="space-y-4">
        {templates.map((template) => (
          <LocationTemplateCard
            key={template.id}
            template={template}
            onFileUpload={handleTemplateUpload}
          />
        ))}
      </div>
    </div>
  );
}
