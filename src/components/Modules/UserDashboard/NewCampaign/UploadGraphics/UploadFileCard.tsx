import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { UploadedFile } from ".";

interface UploadedFileCardProps {
  file: UploadedFile;
  onDelete?: () => void;
}

export function UploadedFileCard({ file, onDelete }: UploadedFileCardProps) {
  return (
    <Card className="border-[#203265] px-8 rounded-xl relative group">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <img
            src={file.url}
            alt={file.name}
            className="h-[200px] w-full object-cover rounded-lg"
          />
          {onDelete && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.85 }}
              onClick={onDelete}
              className="absolute top-2 right-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5  opacity-100 transition-opacity duration-200 shadow-lg"
              aria-label="Delete file"
            >
              <Trash className="w-4 h-4" />
            </motion.button>
          )}
        </div>
        <p className="text-white text-sm truncate" title={file.name}>
          {file.name}
        </p>
      </div>
    </Card>
  );
}
