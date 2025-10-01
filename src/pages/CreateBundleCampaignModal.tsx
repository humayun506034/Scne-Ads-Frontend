import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { HiX, HiOutlineCloudUpload } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMakeBundlePaymentMutation } from "@/store/api/Payment/paymentApi";
import { toast } from "sonner";

interface Screen {
  id: string;
  screen_name: string;
  img_url: string;
  location: string;
  screen_size: string;
  resolution: string;
  price: number;
  availability: string;
  status: string;
  description: string;
}

interface Bundle {
  id: string;
  bundle_name: string;
  img_url: string;
  price: number;
  duration: string;
  status: string;
  location: string;
  screens: Screen[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bundle: Bundle | null;
}

interface FormData {
  name: string;
  industry: string;
  startDate: string;
  type: string; // fixed as "bundle"
  bundleId: string;
  media: {
    [screenId: string]: FileList | null;
  };
}

const industries = [
  "Industry",
  "Arts & Entertainment",
  "Automotive",
  "Business",
  "Careers",
  "Education",
  "Family & Parenting",
  "Health & fitness",
  "Food & drink",
  "Hobbies & interests",
  "Home & garden",
  "Law, govt & policies",
  "News",
  "Personal finance",
  "Society",
  "Science",
  "Pets",
  "Sports",
  "Style & fashion",
  "Technology & Computing",
  "Travel",
  "Real estate",
  "Shopping",
  "Religion & spirituality",
  "Other",
];

const CreateBundleCampaignModal: React.FC<Props> = ({
  isOpen,
  onClose,
  bundle,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: "bundle",
      bundleId: bundle?.id || "",
      media: {},
    },
  });

  React.useEffect(() => {
    reset({
      type: "bundle",
      bundleId: bundle?.id || "",
      media: {},
      name: "",
      industry: "",
      startDate: "",
    });
  }, [bundle, reset]);

  // For live preview of files per screen (optional)
  const mediaFiles = watch("media");
  // const onSubmit = (data: FormData) => {
  //   const campaignData = {
  //     name: data.name,
  //     industry: data.industry,
  //     startDate: data.startDate,
  //     type: data.type,
  //     bundleId: data.bundleId,
  //     media: {} as Record<string, File | null>,
  //   };

  //   let fileCounter = 1;

  //   Object.values(data.media).forEach((fileList) => {
  //     const key = `file${fileCounter}`;
  //     campaignData.media[key] = fileList && fileList.length > 0 ? fileList[0] : null;
  //     fileCounter++;
  //   });

  //   console.log("Submitting Campaign Data:", campaignData);
  // //   alert("Campaign Created! Check console for submitted data.");
  // //   onClose();
  // };

  const [makeBundlePayment] = useMakeBundlePaymentMutation();

  const onSubmit = async (formData: FormData) => {
    const { name, industry, startDate, type, bundleId, media } = formData;

    const data = {
      name,
      industry,
      startDate: new Date(startDate).toISOString(),
      type,
      bundleId,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(data));

    let fileIndex = 1;
    Object.values(media).forEach((fileList) => {
      if (fileList && fileList.length > 0) {
        form.append(`file${fileIndex}`, fileList[0]);
        fileIndex++;
      }
    });

    const loadingToastId = toast.loading("Creating payment session...");

    try {
      const res = await makeBundlePayment(form).unwrap();
      console.log("🚀 ~ onSubmit ~ res:", res);
      toast.dismiss(loadingToastId);

      console.log("Response data:", res.data);
      console.log("Session URL:", res.data?.session?.url);

      if (res.success && res.data?.session?.url) {
        toast.success("Redirecting to payment...");
        // Direct redirect without timeout:
        window.location.href = res.data.session.url;
      } else {
        toast.error("Payment URL not found.");
      }
    } catch (err) {
      toast.dismiss(loadingToastId);
      console.error("Failed:", err);
      toast.error("Payment setup failed!");
    }
  };

  if (!bundle) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />
        <Dialog.Content className="fixed z-50 inset-0 flex items-center justify-center px-6 py-10 overflow-auto">
          <div className="w-full max-w-3xl bg-[#1f2937] border border-gray-700 rounded-lg p-8 relative text-white shadow-lg">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-white transition"
              aria-label="Close"
            >
              <HiX className="w-7 h-7" />
            </button>

            <Dialog.Title className="text-3xl font-extrabold mb-8 text-center">
              Create Campaign for{" "}
              <span className="text-blue-400">"{bundle.bundle_name}"</span>
            </Dialog.Title>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Campaign Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Campaign Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "Campaign Name is required",
                  })}
                  className={`w-full rounded-md border px-4 py-3 text-white placeholder-gray-500 bg-gray-900 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="Grand Sale"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Industry (select) */}
              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-semibold mb-2"
                >
                  Industry
                </label>
                <select
                  id="industry"
                  {...register("industry", {
                    required: "Industry is required",
                  })}
                  className={`w-full rounded-md border bg-gray-900 px-4 py-3 text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.industry ? "border-red-500" : ""
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select an industry
                  </option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                {errors.industry && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.industry.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-semibold mb-2"
                >
                  Start Date
                </label>
                <input
                  id="startDate"
                  type="date"
                  {...register("startDate", {
                    required: "Start Date is required",
                  })}
                  className={`w-full rounded-md border px-4 py-3 text-white placeholder-gray-500 bg-gray-900 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.startDate ? "border-red-500" : ""
                  }`}
                />
                {errors.startDate && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              {/* Hidden Fields */}
              <input type="hidden" {...register("type")} />
              <input type="hidden" {...register("bundleId")} />

              {/* Media Uploads */}
              <div>
                <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">
                  Upload Media for Screens
                </h3>
                {bundle.screens.length === 0 && (
                  <p className="text-gray-400">
                    No screens available in this bundle.
                  </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
                  {bundle.screens.map((screen) => {
                    const fileList = mediaFiles?.[screen.id];
                    const fileName =
                      fileList && fileList.length > 0 ? fileList[0].name : null;

                    return (
                      <label
                        key={screen.id}
                        htmlFor={`media-${screen.id}`}
                        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer p-6 hover:border-blue-500 transition relative bg-gray-800"
                      >
                        <HiOutlineCloudUpload className="text-gray-400 w-12 h-12 mb-3" />
                        <span className="text-sm text-gray-400 mb-1 text-center">
                          {screen.screen_name}
                        </span>
                        <span className="text-xs text-gray-500 mb-2 text-center">
                          (Image or Video)
                        </span>

                        {fileName && (
                          <div className="mt-2 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold truncate max-w-full text-center">
                            {fileName}
                          </div>
                        )}

                        <input
                          id={`media-${screen.id}`}
                          type="file"
                          accept="image/*,video/*"
                          {...register(`media.${screen.id}` as const)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-lg transition"
              >
                Create Campaign
              </button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateBundleCampaignModal;
