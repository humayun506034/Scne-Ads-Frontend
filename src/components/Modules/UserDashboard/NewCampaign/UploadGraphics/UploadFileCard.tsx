import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { UploadedFile } from ".";

interface UploadedFileCardProps {
  file: UploadedFile;
}

export function UploadedFileCard({ file }: UploadedFileCardProps) {
  return (
    <Card className="border-[#203265] px-8 rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <img
            src={file.url}
            alt={file.name}
            className="h-[200px] w-full object-cover rounded-lg"
          />

          {!file.compatible && (
            <div className="absolute -top-2 -left-2 bg-yellow-500 rounded-full p-1">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1">
          {!file.compatible && (
            <div className="flex items-center mt-4 gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#E5D978]" />
              <span className="text-[#E5D978] text-sm ">Not Compatible</span>
            </div>
          )}

          <h3 className="text-white font-medium text-sm mb-1">
            {file.dimensions}
          </h3>
          <p className=" text-gray-500 text-xs">{file.name}</p>
          {/* <p className="text-gray-500 text-xs mt-4">{file.fileType}</p> */}
        </div>
      </div>
    </Card>
  );
}
