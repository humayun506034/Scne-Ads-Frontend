/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CommonSelect from "@/common/CommonSelect";
import DashboardDeleteButton from "@/common/DashboardDeleteButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteBundleMutation, useUpdateBundleMutation } from "@/store/api/Bundle/bundleApi";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Screen } from "./AdminSpecialSection";

export type Bundle = {
  id: string;
  slug: string;
  bundle_name: string;
  price: number;
  duration: "7 Days" | "15 Days" | "30 Days" | string;
  status: "ongoing" | "expired";
  img_url?: string;
  screens?: Screen[];
  totalNumberOfBuy?: number;
};

type FormValues = {
  bundle_name: string;
  price: number | string;
  duration: "7 Days" | "15 Days" | "30 Days" | string;
  status: "ongoing" | "expired";
};

interface Props {
  bundle: Bundle;
  onUpdated?: () => void;
}

function usePreview(file: File | null, fallback?: string) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      const u = URL.createObjectURL(file);
      setUrl(u);
      return () => URL.revokeObjectURL(u);
    }
    setUrl(null);
  }, [file]);
  return url || fallback || "";
}

const AdminSpecialCard = ({ bundle, onUpdated }: Props) => {


  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const preview = usePreview(file, bundle.img_url);

  const [updateBundle, { isLoading }] = useUpdateBundleMutation();
  const [deleteBundle, { isLoading: isDeleting }] = useDeleteBundleMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      bundle_name: bundle.bundle_name ?? "",
      price: bundle.price ?? 0,
      duration: (bundle.duration as any) ?? "7 Days",
      status: bundle.status ?? "ongoing",
    },
  });

  useEffect(() => {
    reset({
      bundle_name: bundle.bundle_name ?? "",
      price: bundle.price ?? 0,
      duration: (bundle.duration as any) ?? "7 Days",
      status: bundle.status ?? "ongoing",
    });
    setFile(null);
  }, [bundle, reset]);
const handleDelete = async () => {
if(isDeleting) return;
  if (!confirm("Are you sure you want to delete this bundle? This action cannot be undone.")) {
    return;
  }
 
  try {
    const res =await deleteBundle(bundle.id).unwrap();
 toast.promise(res , {
    loading: "Deleting bundle...",
    success: "Bundle deleted successfully.",
    error: "Failed to delete bundle.",
  });
  
    onUpdated?.();
  } catch (e: any) {
    const msg = e?.data?.message || e?.message || "Delete failed.";
    toast.error(msg);
  }}

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const payload = {
        bundle_name: data.bundle_name,
        price: Number(data.price ?? 0),
        duration: data.duration,
        status: data.status,
      };

      const fd = new FormData();
      fd.append("data", JSON.stringify(payload));
      if (file) fd.append("file", file); 

      await updateBundle({ id: bundle.id, body: fd } as any).unwrap();

      toast.success("Bundle updated!");
      setOpen(false);
      onUpdated?.();
    } catch (e: any) {
      const msg = e?.data?.message || e?.message || "Update failed.";
      toast.error(msg);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] ?? null);

  const hero = useMemo(
    () => (
      <img
        src={preview || "/placeholder.png"}
        alt={bundle.bundle_name}
        className="w-full h-full object-cover rounded-2xl"
        onError={(ev) => ((ev.currentTarget.src = "/placeholder.png"))}
      />
    ),
    [preview, bundle.bundle_name]
  );

  return (
    <div className="w-full">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.div
            className="rounded-lg my-6 cursor-pointer h-[300px] xl:h-[280px] w-full overflow-hidden flex flex-col"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-full">
              {hero}
              <div className="absolute left-0 right-0 top-0 px-4 pt-4 pb-1 bg-gradient-to-b from-[#101A33]/80 via-[#101A33]/60 to-transparent rounded-md">
                <h3 className="text-white text-base font-semibold leading-6 drop-shadow-lg">
                  {bundle.slug}
                </h3>

                <div className="bg-[#132046]/60 rounded-md mt-10 px-6 py-5 flex flex-col gap-2">
                   <h3 className="text-white text-2xl font-semibold leading-6 drop-shadow-lg">
                  {bundle.bundle_name}
                </h3>
                 

                  <div className=" ">
                      <h3 className="text-white mt-4  font-semibold  drop-shadow-lg flex gap-2">
                 <p className="text-title-color ">Duration :  </p>  {bundle.duration}
                </h3>
                   {bundle.status === "ongoing" ? "Ongoing" : "Completed"}
                    {Array.isArray(bundle.screens) ? ` • ${bundle.screens.length} screens` : ""}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-base font-semibold">
                      ৳ {bundle.price}
                    </p>
                    {typeof bundle.totalNumberOfBuy === "number" && (
                      <p className="text-white/70 text-xs ml-2">
                        • Bought {bundle.totalNumberOfBuy}x
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </DialogTrigger>

        
        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="md:text-2xl">Edit Bundle</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label>Bundle Name</label>
                <CustomInput
                  register={register("bundle_name", { required: true })}
                  placeholder="Bundle name"
                  isError={!!errors.bundle_name}
                />
              </div>

              <div>
                <label>Price</label>
                <CustomInput
                  type="number"
                  register={register("price", { required: true })}
                  placeholder="e.g. 1500"
                  isError={!!errors.price}
                />
              </div>

              <div>
                <label>Status</label>
                <CommonSelect
                  className="w-full mt-2"
                  Value={bundle.status}
                  setValue={(v: string) =>
                    setValue("status", (v === "expired" ? "expired" : "ongoing"), { shouldValidate: true })
                  }
                  options={[
                    { value: "ongoing", label: "Ongoing" },
                    { value: "expired", label: "Completed" },
                  ]}
                />
              </div>

              <div>
                <label>Duration</label>
                <CommonSelect
                  className="w-full mt-2"
                  Value={bundle.duration}
                  setValue={(v: string) => {
                    // accept only supported values, keep previous otherwise
                    const safe = (["7 Days", "15 Days", "30 Days"].includes(v) ? v : bundle.duration) as FormValues["duration"];
                    setValue("duration", safe, { shouldValidate: true });
                  }}
                  options={[
                    { value: "7 Days", label: "7 Days" },
                    { value: "15 Days", label: "15 Days" },
                    { value: "30 Days", label: "30 Days" },
                  ]}
                />
              </div>
            </div>

            {/* Image */}
            <div className="mt-6">
              <label>Thumbnail</label>
              <div className="flex items-start gap-4 mt-2">
                <div className="w-1/2">
                  <img
                    src={preview || "/placeholder.png"}
                    alt="preview"
                    className="w-full max-h-40 object-cover rounded-md"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />
                </div>

                <div
                  className="border-dashed bg-[#132C51] p-6 rounded-md flex items-center justify-center cursor-pointer w-1/2 h-32"
                  onClick={() => document.getElementById("bundle-file")?.click()}
                >
                  <input
                    id="bundle-file"
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="hidden"
                  />
                  <span className="text-sm md:text-base">
                    {file ? "Replace Image" : "Upload Image"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-10 md:flex-row justify-end gap-4">
              <CommonDashboardButton
                disabled={isLoading}
                title={isLoading ? "Saving..." : "Save Changes"}
                Icon={Plus}
              />
              <DashboardDeleteButton
                onClick={handleDelete}
                disabled={isLoading}
                title={isLoading ? "Deleting..." : "Delete"}
                Icon={Plus}
              />
              <CommonCancelButton
                onClick={() => {
                  reset();
                  setFile(null);
                  setOpen(false);
                }}
                title="Cancel"
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSpecialCard;
