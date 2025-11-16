import type React from "react";

import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { LocationTemplate } from ".";

interface LocationTemplateCardProps {
  template: LocationTemplate;
  onFileUpload?: (templateId: string, files: FileList) => void;
}

export function LocationTemplateCard({
  template,
  onFileUpload,
}: LocationTemplateCardProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0 && onFileUpload) {
      onFileUpload(template.id, files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && onFileUpload) {
      onFileUpload(template.id, files);
    }
  };



  return (
    <Card className=" border-[#203265] p-8 rounded-xl flex justify-between flex-col md:flex-row">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center md:text-left">
          <h3 className="text-white md:font-medium text-lg md:text-xl mb-2">
            {template.selectionNumber}/3 Selected: {template.name}
          </h3>
          <p className="text-title-color text-sm md:text-base">
            Screen Size {template.screenSize}
          </p>
          
        </div>
      </div>

      <div
        className=" bg-dashboard-card-bg rounded-lg p-6 text-center  transition-colors cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*,.mp4"
          onChange={handleFileSelect}
          className="hidden"
          id={`upload-${template.id}`}
        />
        <label htmlFor={`upload-${template.id}`} className="cursor-pointer">
          <Upload className="w-6 h-6 text-title-color mx-auto mb-4" />
          <p className="text-title-color text-base mb-2">
            Drag and drop your media here
          </p>
          <p className="text-title-color 0 text-xs flex justify-center items-center gap-2">
            Supports .JPG {template.supportedFormats.join(" & ")}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M6.33301 10.334H7.66634V6.33398H6.33301V10.334ZM6.99967 5.00065C7.18856 5.00065 7.3469 4.93676 7.47467 4.80898C7.60245 4.68121 7.66634 4.52287 7.66634 4.33398C7.66634 4.1451 7.60245 3.98676 7.47467 3.85898C7.3469 3.73121 7.18856 3.66732 6.99967 3.66732C6.81079 3.66732 6.65245 3.73121 6.52467 3.85898C6.3969 3.98676 6.33301 4.1451 6.33301 4.33398C6.33301 4.52287 6.3969 4.68121 6.52467 4.80898C6.65245 4.93676 6.81079 5.00065 6.99967 5.00065ZM6.99967 13.6673C6.07745 13.6673 5.21079 13.4923 4.39967 13.1423C3.58856 12.7923 2.88301 12.3173 2.28301 11.7173C1.68301 11.1173 1.20801 10.4118 0.858008 9.60065C0.508008 8.78954 0.333008 7.92287 0.333008 7.00065C0.333008 6.07843 0.508008 5.21176 0.858008 4.40065C1.20801 3.58954 1.68301 2.88398 2.28301 2.28398C2.88301 1.68398 3.58856 1.20898 4.39967 0.858984C5.21079 0.508984 6.07745 0.333984 6.99967 0.333984C7.9219 0.333984 8.78856 0.508984 9.59967 0.858984C10.4108 1.20898 11.1163 1.68398 11.7163 2.28398C12.3163 2.88398 12.7913 3.58954 13.1413 4.40065C13.4913 5.21176 13.6663 6.07843 13.6663 7.00065C13.6663 7.92287 13.4913 8.78954 13.1413 9.60065C12.7913 10.4118 12.3163 11.1173 11.7163 11.7173C11.1163 12.3173 10.4108 12.7923 9.59967 13.1423C8.78856 13.4923 7.9219 13.6673 6.99967 13.6673ZM6.99967 12.334C8.48856 12.334 9.74967 11.8173 10.783 10.784C11.8163 9.75065 12.333 8.48954 12.333 7.00065C12.333 5.51176 11.8163 4.25065 10.783 3.21732C9.74967 2.18398 8.48856 1.66732 6.99967 1.66732C5.51079 1.66732 4.24967 2.18398 3.21634 3.21732C2.18301 4.25065 1.66634 5.51176 1.66634 7.00065C1.66634 8.48954 2.18301 9.75065 3.21634 10.784C4.24967 11.8173 5.51079 12.334 6.99967 12.334Z"
                fill="#C3CEE9"
              />
            </svg>
          </p>
        </label>
      </div>
    </Card>
  );
}
