import CustomInput from "@/common/CommonDashboardInput"; // Assuming Custom Input
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar"; // Use ShadCN Calendar
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod validation schema
const bundleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  industry: z.string().min(1, "Industry is required"),
  startDate: z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  files: z.array(z.instanceof(File)).optional(),
});

type BundleForm = z.infer<typeof bundleSchema>;

export default function PurchaseBundleDialog({ open, setOpen }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // To handle file uploads
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // For date picker
  const [fileErrors, setFileErrors] = useState<string[]>([]); // For file errors
  
  // React hook form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BundleForm>({
    resolver: zodResolver(bundleSchema),
  });

  // Handle file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const errorMessages: string[] = [];
      newFiles.forEach((file) => {
        // Validate file type and size (e.g., 5MB max)
        if (file.size > 5 * 1024 * 1024) {
          errorMessages.push(`${file.name} exceeds the size limit of 5MB.`);
        }
        if (!["image/png", "image/jpeg", "video/mp4"].includes(file.type)) {
          errorMessages.push(`${file.name} is not a valid file type.`);
        }
      });

      if (errorMessages.length > 0) {
        setFileErrors(errorMessages);
      } else {
        setSelectedFiles([...selectedFiles, ...newFiles]);
        setFileErrors([]); // Clear errors if valid
      }
    }
  };

  // Handle file removal
  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove));
  };

  // Handle form submission
  const onSubmit = async (data: BundleForm) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("industry", data.industry);
    formData.append("startDate", data.startDate.toISOString());
    formData.append("type", JSON.stringify("bundle"));
    
    selectedFiles.forEach((file) => formData.append("files", file));

    console.log("Form Data: ", formData);

    // Optionally, send formData to your server if needed
    // e.g. await fetch("/your-api-endpoint", { method: "POST", body: formData });

    reset();
    setSelectedFiles([]); // Clear files after submitting
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full bg-blue-500 hover:bg-blue-700">Purchase this bundle</Button>
        </DialogTrigger>

        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Purchase Bundle
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>

{/* Name Field */}
            <div className="mb-4">
              <label className="text-white">Name</label>
              <CustomInput
                {...register("name")}
                placeholder="Enter Bundle Name"
                isError={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Industry Field */}
            <div className="mb-4">
              <label className="text-white">Industry</label>
              <CustomInput
                {...register("industry")}
                placeholder="Enter Industry"
                isError={!!errors.industry}
              />
              {errors.industry && (
                <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>
              )}
            </div>

            {/* Date Picker with ShadCN Calendar */}
            <div className="mb-4">
              <label className="text-white">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full mt-2">
                    {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    mode="single"
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>
              )}
            </div>

            {/* File Upload Section */}
            <div className="mb-4">
              <label className="text-white">Upload Files (Images/Videos)</label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="w-full mt-2"
              />
              {fileErrors.length > 0 && (
                <div className="text-red-500 text-xs mt-2">
                  {fileErrors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}
              <div className="mt-4">
                {selectedFiles.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file)}
                          className="text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700"
              >
                Purchase
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}