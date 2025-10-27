import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFiles } from "@/store/Slices/campaign/campaignSlice";
import { BulkUploader } from "./BulkUploader";
import { UploadedFileCard } from "./UploadFileCard";

export function UploadGraphicsSection() {
  const dispatch = useAppDispatch();
  const uploadedFiles = useAppSelector((state) => state.campaign.files);

  const handleBulkUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    console.log("Files stored in Redux:", fileArray);
    dispatch(setFiles(fileArray));
  };

  return (
    <div className="">
      <div className="mb-8">
        <h1 className="text-white text-2xl md:text-4xl font-semibold mb-2">
          Upload Graphics
        </h1>
        <p className="text-sm mt-4 md:text-base">
          This can be done later. However, if your images are ready, you can
          upload them here right away.
        </p>
      </div>

      {/* Uploaded Files Section Above Upload */}
      <div className="mb-6">
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
              d="M22.0784 7.33008C21.7598 7.33008 21.4926 7.24223 21.2771 7.06654C21.0615 6.89084 20.9537 6.67313 20.9537 6.41341C20.9537 6.15369 21.0615 5.93598 21.2771 5.76029C21.4926 5.58459 21.7598 5.49675 22.0784 5.49675C22.3971 5.49675 22.6643 5.58459 22.8798 5.76029C23.0954 5.93598 23.2032 6.15369 23.2032 6.41341C23.2032 6.67313 23.0954 6.89084 22.8798 7.06654C22.6643 7.24223 22.3971 7.33008 22.0784 7.33008ZM13.0804 12.8301L16.1172 9.62175L17.8606 11.4551L20.4475 8.70508L24.328 12.8301H13.0804ZM7.45655 20.1634C6.83793 20.1634 6.30836 19.9839 5.86783 19.6249C5.4273 19.2658 5.20703 18.8342 5.20703 18.3301V5.49675H7.45655V18.3301H23.2032V20.1634H7.45655Z"
              fill="#14CA74"
            />
          </svg>
          <span className="text-white text-base font-medium">Your Uploads</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map((file, i) => (
              <UploadedFileCard
                key={i}
                file={{
                  id: String(i),
                  name: file.name,
                  url: URL.createObjectURL(file),
                  dimensions: "1920x1080",
                  fileType: file.type,
                  compatible: true,
                }}
              />
            ))
          ) : (
            <p className="text-gray-400">No files uploaded yet.</p>
          )}
        </div>
      </div>

      {/* Right Column: Bulk Uploader */}
      <div>
        <BulkUploader onFileUpload={handleBulkUpload} />
      </div>
    </div>
  );
}