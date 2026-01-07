/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CustomTextarea from "@/common/CommonDashboardTextArea";
import CommonSelect from "@/common/CommonSelect";
import ExtractErrorMessage from "@/common/ExtractErrorMessage";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useDeleteScreenImageMutation,
  useUpdateScreenMutation,
  useUploadScreenImagesMutation,
} from "@/store/api/Screen/screenApi";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import LocationMapModal from "./LocationMap";


export interface IImageUrl {
  url: string;
  index?: number;
}


export interface IScreen {
  id?: string;
  slug?: string;
  screen_name: string;
  screen_size?: string;
  description?: string;
  resolution?: string;
  price?: number;
  isFeatured?: boolean;
  isDeleted?: boolean;
  availability?: string;
  status?: string;
  lat?: string;
  lng?: string;
  location?: string;

  imageUrls?: IImageUrl[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LocationCardProps {
  location: IScreen;
  edit?: boolean;
}



const AdminLocationCard = ({ location }: LocationCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      screen_name: "",
      location: "",
      description: "",
      screen_size: "",
      resolution: "",
      price:
        typeof location.price === "number" ? String(location.price) : undefined,
    },
  });

  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [updateScreenImage] =
    useUploadScreenImagesMutation();
  const [updateScreen, { isLoading }] = useUpdateScreenMutation();
  const [deleteScreen, { isLoading: deleteLoading }] =
    useDeleteScreenImageMutation();
  const featured = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];

  const [value, setValue] = useState(featured[0].value);

  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Normalize images shown on the card
  const cardImages: { url: string }[] = (
    location.imageUrls && location.imageUrls.length > 0
      ? location.imageUrls
      : location.imageUrls ?? []
  ).map((img: any) => (typeof img === "string" ? { url: img } : img));

  const [existingImages, setExistingImages] = useState<{ url: string }[]>([]);

  const [files, setFiles] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setExistingImages(cardImages);

      setFiles([]);
      setNewPreviews([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Maintain preview URLs for new files & clean up blobs on change/unmount
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setNewPreviews(urls);
    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [files]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleExistingDelete = async (screenId: string, index: number) => {
    const id = toast.loading("Deleting Image ...");
    try {
      const payload = { index };

      const res = await deleteScreen({ payload, id: screenId }).unwrap();

      if (res.success) {
        toast.success("Screen updated successfully", { id });

        setExistingImages((prev) => prev.filter((_, i) => i !== index));

      }
    } catch (err: any) {
      console.error("Error updating screen:", err);
      const msg = ExtractErrorMessage(err);
      toast.error(msg, { id });
    }
  };

  const handleNewDelete = async (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
    // preview URL cleanup is handled by the useEffect cleanup on next render
  };

  const onSubmit = async (data: FieldValues) => {
    const payload = {
      screen_name: data.screen_name ?? location.screen_name,
      screen_size: data.screen_size ?? location.screen_size,
      availability: location.availability ?? "available",
      description: data.description ?? location.description,
      status: location.status ?? "active",
      resolution: data.resolution ?? location.resolution,
      price: Number(data.price) || location.price,
      isFeatured: value === "true",
      isDeleted: location.isDeleted ?? false,
      lat: selectedCoords?.lat || location.lat,
      lng: selectedCoords?.lng || location.lng,
      location: data.location || location.location,
    };

    const toastId = toast.loading("Updating screen...");
    try {
      const resUpdate = await updateScreen({
        id: location.id!,
        payload,
      }).unwrap();

      if (resUpdate.success) {
        toast.success("Screen updated", { id: toastId });
      }
    } catch (err) {
      console.error("Update screen error:", err);
      toast.error(ExtractErrorMessage(err), { id: toastId });
      return;
    }

    //  UPLOAD NEW IMAGES (FORM-DATA) — only if there are files
    if (files.length > 0) {
      const fd = new FormData();
      files.forEach((file) => fd.append("files", file));

      const imgToast = toast.loading("Uploading images...");
      try {
        const resImg = await updateScreenImage({
          id: location.id!,
          payload: fd,
        }).unwrap();
      
        if (resImg.success) {
          toast.success("Images uploaded", { id: imgToast });
        }
      } catch (err) {
        console.error("Upload images error:", err);
        toast.error(ExtractErrorMessage(err), { id: imgToast });
        // don’t return; we still want to close/reset the modal even if upload fails
      }
    }

    reset(undefined, { keepValues: true });
    setOpen(false);
  };

  const displayTitle =
    location.screen_name ||
    (location as unknown as { title?: string })?.title ||
    "Untitled Screen";

  const displayDescription =
    location.description || "No description available.";

  return (
    <div className="w-full ">
      <Card className="lg:w-full relative  border-none h-[440px]  card mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)]  bg-transparent ">
        <CardContent className="flex flex-col overflow-hidden items-center  p-0">
          <Carousel className="w-full relative">
            <CarouselContent className="p-0 ">
              {cardImages.length > 0 ? (
                cardImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-4 ">
                      <div className="flex items-center border-none justify-center ">
                        <img
                          src={image.url}
                          alt={`${displayTitle} image ${index + 1}`}
                          className="object-fill rounded-[15px] w-full h-[220px]"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="absolute  top-1/2 left-0">
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">
                          No images
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            <CarouselPrevious
              type="button"
              className="
                absolute top-1/2 left-2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-white/15 text-black font-bold cursor-pointer border border-white/20
                backdrop-blur shadow-lg
                hover:bg-white/25 hover:scale-105 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <ChevronLeft className="h-10 w-10" />
            </CarouselPrevious>
            <CarouselNext
              type="button"
              className="
                absolute top-1/2 right-2 -translate-y-1/2 z-10
                h-10 w-10 rounded-full
                bg-white/15 text-black font-bold cursor-pointer border border-white/20
                backdrop-blur shadow-lg
                hover:bg-white/25 hover:scale-105 transition
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              "
            >
              <ChevronRight className="h-10 w-10" />
            </CarouselNext>
          </Carousel>

          <h3 className="text-xl text-center  lg:font-semibold px-6">
            {displayTitle}
          </h3>
          <p className="text-base  text-center mt-2 px-6">
            {displayDescription}
          </p>

          <div className="text-sm absolute bottom-4 space-y-2 px-6">
            <p className="my-4 text-lg">Price: {location.price} $</p>
          </div>

          {/* EDIT MODAL TRIGGER */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="w-10 h-10 bg-[#033579] absolute -right-4 shadow-lg -top-3 flex items-center justify-center rounded-full">
                <button
                  className="cursor-pointer flex items-center justify-center rounded-full"
                  aria-label="Edit"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M9.16675 1.66602H7.50008C3.33341 1.66602 1.66675 3.33268 1.66675 7.49935V12.4993C1.66675 16.666 3.33341 18.3327 7.50008 18.3327H12.5001C16.6667 18.3327 18.3334 16.666 18.3334 12.4993V10.8327"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.3666 2.51639L6.7999 9.08305C6.5499 9.33305 6.2999 9.82472 6.2499 10.1831L5.89157 12.6914C5.75823 13.5997 6.3999 14.2331 7.30823 14.1081L9.81656 13.7497C10.1666 13.6997 10.6582 13.4497 10.9166 13.1997L17.4832 6.63306C18.6166 5.49972 19.1499 4.18306 17.4832 2.51639C15.8166 0.849722 14.4999 1.38306 13.3666 2.51639Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.425 3.45898C12.9834 5.45065 14.5417 7.00898 16.5417 7.57565"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </DialogTrigger>

            {/* Edit Modal */}
            <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
              <DialogHeader>
                <DialogTitle className="flex justify-between w-full items-center">
                  <p className="md:text-2xl mb-4">Edit Screen</p>
                  <div>
                    <LocationMapModal
                      lat={
                        selectedCoords?.lat ??
                        (location.lat ? Number(location.lat) : undefined)
                      }
                      lng={
                        selectedCoords?.lng ??
                        (location.lng ? Number(location.lng) : undefined)
                      }
                      open={openMap}
                      setOpenMap={setOpenMap}
                      onConfirm={(lat, lng) => setSelectedCoords({ lat, lng })}
                    />
                  </div>
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label>Screen Name</label>
                  <CustomInput
                    register={register("screen_name")}
                    placeholder={location.screen_name || "Enter screen name"}
                    isError={!!errors.screen_name}
                  />
                </div>

                <div className="mb-4">
                  <label>Screen Location</label>
                  <CustomInput
                    register={register("location")}
                    placeholder={location.location || "Enter screen location"}
                    isError={!!errors.location}
                  />
                </div>

                <div className="mb-4">
                  <label>Description</label>
                  <CustomTextarea
                    register={register("description")}
                    placeholder={
                      location.description || "Enter screen description"
                    }
                    isError={!!errors.description}
                  />
                </div>

                <div className="mb-4">
                  <label>Screen Size</label>
                  <CustomInput
                    register={register("screen_size")}
                    placeholder={location.screen_size || "e.g., 10x10 ft"}
                    isError={!!errors.screen_size}
                  />
                </div>

                <div className="mb-4">
                  <label>Screen Resolution</label>
                  <CustomInput
                    register={register("resolution")}
                    placeholder={location.resolution || "e.g., 720*1080"}
                    isError={!!errors.resolution}
                  />
                </div>

                <div className="mb-4">
                  <label className="">Will Show as Featured ?</label>
                  <CommonSelect
                    Value={featured[0].value}
                    setValue={setValue}
                    options={featured}
                  />
                </div>

                {/* ======= EXISTING + NEW IMAGES WITH DELETE ======= */}
                <div className="mb-4">
                  <label>Screen Thumbnail</label>
                  <div className="flex items-start gap-4">
                    {/* Left: existing + new previews */}
                    <div className="flex my-2 flex-wrap gap-2 w-1/2">
                      {/* Existing from server */}
                      {existingImages.length > 0 ? (
                        existingImages.map((img: IImageUrl, index) => (
                          <div key={`existing-${index}`} className="relative">
                            <img
                              src={img.url}
                              alt={`existing-${index}`}
                              className="w-40 h-28 object-cover rounded-md"
                            />
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                              disabled={deleteLoading}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExistingDelete(location.id!, img.index!);
                              }}
                              className="absolute z-20 -top-2 -right-2 rounded-full p-2 cursor-pointer bg-red-500  text-white shadow"
                              title="Remove existing image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ))
                      ) : (
                        <span className="text-xs opacity-70">
                          No existing images
                        </span>
                      )}

                      {/* New uploads previews */}
                      {newPreviews.map((src, index) => (
                        <div key={`new-${index}`} className="relative">
                          <img
                            src={src}
                            alt={`new-${index}`}
                            className="w-40 h-28 object-cover rounded-md"
                          />
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            type="button"
                            onClick={() => handleNewDelete(index)}
                            className="absolute z-20 -top-2 -right-2 rounded-full p-2 cursor-pointer bg-red-500  text-white shadow"
                            title="Remove new image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      ))}
                    </div>

                    {/* Right: uploader */}
                    <div
                      className="border-dashed bg-[#132C51] p-6 rounded-md flex items-center justify-center cursor-pointer w-1/2 h-32"
                      onClick={handleClick}
                    >
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <span className="text-sm md:text-base">
                        {files.length > 0
                          ? "Upload More Images"
                          : "Upload Images"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label>Cost Per Day (in $) </label>
                  <CustomInput
                    type="number"
                    {...register("price")}
                    placeholder={
                      typeof location.price === "number"
                        ? String(location.price)
                        : "Enter cost per play"
                    }
                  />
                </div>

                <div className="flex flex-col mt-12 md:flex-row justify-end gap-4">
                  <CommonDashboardButton
                    disabled={isLoading}
                    title="Edit Screen"
                    Icon={Plus}
                  />
                  <CommonCancelButton
                    onClick={() => {
                      reset();
                      setOpen(false);
                    }}
                    title="Cancel"
                  />
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLocationCard;
