import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import DashboardTransparentButton from "@/common/DashboardTransparentButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALLOWED_MIME } from "@/lib/Data";
import { useMakeBundlePaymentMutation } from "@/store/api/Payment/paymentApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiCalendar, HiPhotograph, HiTrash, HiUpload, HiVideoCamera } from "react-icons/hi";
import { toast } from "sonner";
import { z } from "zod";
import { options } from "../../NewCampaign/CampaignNameSection";


const bundleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  industry: z.string().min(1, "Industry is required"),
  startDate: z.date().refine((date) => !isNaN(date.getTime()), "Invalid date"),
  files: z.array(z.instanceof(File)).optional(),
});

type BundleForm = z.infer<typeof bundleSchema>;

export default function PurchaseBundleDialog({ open, setOpen ,bundleId}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<BundleForm>({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      industry: "",
      startDate: new Date(),
    },
  });
  const [valueOption, setOptionValue] = useState("Arts and Entertainment");
const  [ createBundlePayment , { isLoading }]=useMakeBundlePaymentMutation()

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0); 
      setDate(start);

      // Set the value in React Hook Form and trigger validation
      setValue("startDate", start, { shouldValidate: true });
    }
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const errorMessages: string[] = [];
      newFiles.forEach((file) => {
        if (!ALLOWED_MIME.includes(file.type)) {
          errorMessages.push(`${file.name} is not a valid file type.`);
        }
      });

      if (errorMessages.length > 0) {
        setFileErrors(errorMessages);
      } else {
        setSelectedFiles([...selectedFiles, ...newFiles]);
        setFileErrors([]); 
      }
    }
  };


  const handleRemoveFile = (fileToRemove: File) => {
    setSelectedFiles(selectedFiles.filter((file) => file !== fileToRemove));
  };

  const onSubmit = async (data: BundleForm) => {
    const id = toast.loading("Creating bundle payment...");
   
    const formData = new FormData();
    const  payload ={
      name: data.name,
      industry: data.industry,
      startDate: data.startDate.toISOString(),
      bundleId: bundleId,
      type: "bundle",
   
    }
    formData.append("data", JSON.stringify(payload));
 
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const res = await createBundlePayment(formData).unwrap();
      console.log("✅ Bundle payment created:", res);
      // If backend returns a redirect URL, navigate
      if (res?.success) {
        toast.success("Redirecting to payment...",{id});
       
        window.location.href =res?.data.session?.url;
      }
    } catch (e) {
      toast.error("Failed to create bundle payment",{id})
      console.error("❌ Bundle payment failed:", e);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger is unused in controlled mode, but kept if needed elsewhere */}
        <DialogTrigger asChild>
          <Button className="w-full  bg-blue-500 hover:bg-blue-700">
            Purchase this bundle
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-bg-dashboard backdrop-blur-xl rounded-2xl lg:p-8 mx-auto overflow-y-auto border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)] max-h-[85vh] w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-white">
              Purchase Bundle
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
            {/* Name Field */}
            <div className="bg-dashboard-card-bg ring-1 ring-white/10 rounded-xl p-4">
              <label className="text-white flex items-center gap-2 mb-2">
                <HiPhotograph className="h-5 w-5 text-teal-300" /> Name
              </label>
              <CustomInput
                {...register("name")}
                placeholder="Enter Bundle Name"
                isError={!!errors.name}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div className="bg-dashboard-card-bg ring-1 ring-white/10 rounded-xl p-4">
              <label className="text-white flex items-center gap-2 mb-2">
                <HiPhotograph className="h-5 w-5 text-purple-300" /> Industry
              </label>
        
              <Select onValueChange={(value) => {
                setOptionValue(value);
                setValue("industry", value, { shouldValidate: true, shouldDirty: true });
              }}>
                <SelectTrigger className="cursor-pointer text-base text-white border border-dashboard-border w-full rounded-md focus:ring-0 px-4 py-6">
                  <SelectValue placeholder={valueOption} />
                </SelectTrigger>
                <SelectContent className="bg-[#0B1739] text-white border-none">
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* register hidden input so RHF tracks the select value */}
              <input type="hidden" {...register("industry")} />
              {errors.industry && (
                <p className="text-red-400 text-xs mt-1">{errors.industry.message}</p>
              )}
            </div>
   {/* Start Date Picker - Native HTML Date Picker */}
   <div className="bg-dashboard-card-bg ring-1 ring-white/10 rounded-xl p-4">
              <label className="text-white flex items-center gap-2 mb-2">
                <HiCalendar className="h-5 w-5 text-blue-300" /> Select Start Date
              </label>
              {/* <input
                type="date"
                {...register("startDate")}
                value={date ? date.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  setDate(selectedDate);
                  setValue("startDate", selectedDate, { shouldValidate: true, shouldDirty: true });
                }}
                className="w-full bg-dashboard-card-bg border-white/10 text-white border rounded-md p-2 focus:outline-none"
              /> */}
                <Dialog >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer mt-1 bg-dashboard-card-bg border-white/10 text-white hover:bg-white/10"
                  >
                    {date
                      ? date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Select Date"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#081028] flex justify-center items-center w-fit border-white/10 text-white p-2">
                <Calendar
                mode="single"
             
                selected={date}
              
                onSelect={handleStartDateChange}
                classNames={{
                  selected:
                    "hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white rounded-full",
                  day: "text-white cursor-pointer",
                  head_cell: "text-black p-4 m-2",
                  nav_button_previous: "text-white",
                  nav_button_next: "text-white",
                  month: "text-white cursor-pointer",
                  dropdown_year:
                    "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
                  dropdown_month:
                    "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
                }}
              />
                </DialogContent>
              </Dialog>
              {/* ensure RHF tracks date */}
              <input type="hidden" {...register("startDate")} />
              {errors.startDate && (
                <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>
              )}
            </div>

            {/* File Upload Section */}
            <div className="bg-dashboard-card-bg ring-1 ring-white/10 rounded-xl p-4">
              <label className="text-white flex items-center gap-2 mb-2">
                <HiUpload className="h-5 w-5 text-emerald-300" /> Upload Your Media Contents (Images/Videos)
              </label>
              <label className="flex items-center justify-center gap-2 w-full mt-1 px-4 py-10 rounded-xl border border-dashed border-white/20 bg-bg-dashboard transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <HiUpload className="h-5 w-5 text-white" />
                <span className="text-white/80">Click to upload or drag and drop</span>
              </label>
              {fileErrors.length > 0 && (
                <div className="text-red-400 text-xs mt-2 space-y-1">
                  {fileErrors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              )}

              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedFiles.map((file, index) => {
                    const isVideo = file.type.startsWith("video");
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="relative group rounded-lg overflow-hidden ring-1 ring-white/10 bg-black/30"
                      >
                        {isVideo ? (
                          <div className="aspect-video w-full">
                            <video
                              src={previewUrl}
                              controls
                              muted
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className="w-full h-28 object-cover"
                          />
                        )}
                        <div className="absolute top-2 left-2 inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium bg-bg-dashboard text-white/90 ring-1 ring-white/10">
                          {isVideo ? (
                            <HiVideoCamera className="h-3.5 w-3.5" />
                          ) : (
                            <HiPhotograph className="h-3.5 w-3.5" />
                          )}{" "}
                          {Math.round(file.size / 1024)} KB
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file)}
                          className="absolute top-2 right-2 inline-flex items-center cursor-pointer justify-center p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white shadow"
                          aria-label="Remove file"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2 mx-auto w-full flex gap-4 flex-col-reverse md:flex-row justify-center md:justify-between items-center">
              <DashboardTransparentButton title="Cancel" onClick={() => setOpen(false)} />
              <CommonDashboardButton title="Confirm Purchase" disabled={isLoading} />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
