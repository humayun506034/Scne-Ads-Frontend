import { cardData } from "@/components/Modules/UserDashboard/Home/SpecialSection/SpecialSection";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SpecialCard from "./AdminSpecialCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomInput from "@/common/CommonDashboardInput";
import { Plus, X } from "lucide-react";

const AdminSpecialSection = () => {
  const [open, setOpen] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);
  const [files, setFiles] = useState<File[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Submit handler
  const onSubmit = (data: any) => {
    console.log({
      ...data,
      features,
      files,
    });
    reset();
    setFeatures([""]);
    setFiles([]);
    setOpen(false);
  };

  // Dynamic feature handling
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  };

  // File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleClickUpload = () => {
    document.getElementById("file-upload")?.click();
  };

  return (
    <div className="mt-20 relative">
      <h1 className="text-3xl font-semibold text-center">Special</h1>
      <Carousel className="w-full p-0 m-0">
        <CarouselContent className="p-0 m-0 gap-8">
          {cardData.map((card, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4"
            >
              {index === 0 && (
                <Dialog key={index} open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <div className="w-full h-full rounded-lg shadow-lg flex items-center justify-center cursor-pointer">
                      <div className="bg-secondary-color w-20 h-20 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="45"
                          height="45"
                          viewBox="0 0 45 45"
                          fill="none"
                        >
                          <path
                            d="M18.4665 26.4165H0V18.4665H18.4665V0H26.4165V18.4665H44.883V26.4165H26.4165V44.883H18.4665V26.4165Z"
                            fill="#033579"
                          />
                        </svg>
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold text-white">
                        Add special card
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      {/* Title */}
                      <div className="mb-4">
                        <label>Title</label>
                        <CustomInput
                          register={register("title", { required: true })}
                          placeholder="Enter Title"
                          isError={!!errors.title}
                        />
                      </div>

                      {/* Bundle Title */}
                      <div className="mb-4">
                        <label>Bundle Title</label>
                        <CustomInput
                          register={register("bundleTitle", { required: true })}
                          placeholder="Enter Bundle Title"
                          isError={!!errors.bundleTitle}
                        />
                      </div>

                      {/* Bundle Icon */}
                      <div className="mb-4">
                        <label>Bundle Icon</label>
                        <CustomInput
                          register={register("bundleIcon")}
                          placeholder="Enter Bundle Icon URL"
                          isError={!!errors.bundleIcon}
                        />
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <label>Price</label>
                        <CustomInput
                          register={register("price", { required: true })}
                          placeholder="Enter Price"
                          isError={!!errors.price}
                        />
                      </div>

                      {/* Dynamic features */}
                      <div className="mb-4">
                        <label>Feature(s)</label>
                        {features.map((feature, index) => {
                          const isLast = index === features.length - 1;

                          return (
                            <div
                              key={index}
                              className="flex items-center gap-2 mb-2"
                            >
                              <input
                                type="text"
                                value={feature}
                                onChange={(e) =>
                                  handleFeatureChange(index, e.target.value)
                                }
                                placeholder={`Feature ${index + 1}`}
                                className="flex-1 border rounded-lg px-3 py-2 text-sm bg-transparent text-white"
                              />

                              {isLast ? (
                                <button
                                  type="button"
                                  onClick={handleAddFeature}
                                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                                >
                                  <Plus size={16} />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFeature(index)}
                                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                  <X size={16} />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Image Upload */}
                      <div className="mb-4">
                        <label className="">Screen Thumbnail</label>
                        <div className="flex items-start gap-4">
                          {files && files.length > 0 && (
                            <div className="flex my-2 flex-wrap gap-2 w-1/2">
                              {files.map((file, index) => (
                                <div key={index} className=" relative">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt="preview"
                                    className="w-full max-h-40 h-full object-fill rounded-md"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <div
                            className="border-dashed bg-[#132C51] p-6 rounded-md flex items-center justify-center cursor-pointer w-1/2 h-32"
                            onClick={handleClickUpload}
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
                              {files.length > 0 ? (
                                "Upload More Images"
                              ) : (
                                <div className="flex flex-col items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="54"
                                    height="54"
                                    viewBox="0 0 54 54"
                                    fill="none"
                                  >
                                    <path
                                      d="M47.25 33.75V42.75C47.25 43.9435 46.7759 45.0881 45.932 45.932C45.0881 46.7759 43.9435 47.25 42.75 47.25H11.25C10.0565 47.25 8.91193 46.7759 8.06802 45.932C7.22411 45.0881 6.75 43.9435 6.75 42.75V33.75M38.25 18L27 6.75M27 6.75L15.75 18M27 6.75V33.75"
                                      stroke="white"
                                      strokeWidth="2.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Footer buttons */}

                      <div className="flex gap-4  mt-12 justify-end">
                        <CommonDashboardButton title="Add Screen" Icon={Plus} />
                        <button
                          onClick={() => {
                            reset();
                            setOpen(false);
                          }}
                          className="px-4 py-2 cursor-pointer rounded-md border-secondary-color border  text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              <SpecialCard card={card} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10">
          <CarouselPrevious className="bg-white shadow-lg border-none w-8 h-8 flex items-center text-black justify-center cursor-pointer" />
        </div>
        <div className="absolute top-1/2 right-16 -translate-y-1/2 z-10">
          <CarouselNext className="bg-white shadow-lg border-none text-black w-8 h-8 flex items-center justify-center cursor-pointer" />
        </div>
      </Carousel>
    </div>
  );
};

export default AdminSpecialSection;
