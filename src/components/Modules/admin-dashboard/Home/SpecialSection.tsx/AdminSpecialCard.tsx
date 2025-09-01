import { CardProps } from "@/components/Modules/UserDashboard/Home/SpecialSection/SpecialCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import { Plus, X } from "lucide-react";

interface AdminSpecialCardProps {
  card: CardProps;
  edit?: boolean;
}

const AdminSpecialCard = ({ card }: AdminSpecialCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<string[]>(card.description || []);

  // file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const handleClickUpload = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const handleAddFeature = () => {
    setFeatures((prev) => [...prev, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const onSubmit = (data: FieldValues) => {
    const finalData = {
      ...data,
      description: features,
      image: files[0] || card.image,
    };
    console.log("Edited Card Data:", finalData);
    reset();
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            className="rounded-lg my-6 cursor-pointer h-[300px] xl:h-[280px] w-full overflow-hidden flex flex-col"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative w-full h-full">
              <img
                src={
                  typeof card.image === "string"
                    ? card.image
                    : URL.createObjectURL(card.image)
                }
                alt={card.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute left-0 right-0 top-0 px-4 pt-4 pb-1 bg-gradient-to-b from-[#101A33]/80 via-[#101A33]/60 to-transparent rounded-md">
                <h3 className="text-white text-base font-semibold leading-6 drop-shadow-lg">
                  {card.title}
                </h3>

                <div className="bg-[#132046] rounded-md mt-10 px-6 py-5 flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="text-3xl">{card.bundleIcon}</span>
                    <span className="text-white font-semibold text-lg">
                      {card.bundleTitle}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80 text-xs ml-4">
                    {card.description?.map((desc, index) => (
                      <span key={index}>✔ {desc}</span>
                    ))}
                  </div>
                  <div className="mt-2 ml-4">
                    <span className=" text-base font-semibold">
                      $ {card.price} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </DialogTrigger>

        {/* MODAL CONTENT */}
        <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <p className=" md:text-2xl mb-4">Edit Special Card</p>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label>Title</label>
              <CustomInput
                register={register("title")}
                placeholder={card.title}
                isError={!!errors.title}
              />
            </div>

            <div className="mb-4">
              <label>Bundle Title</label>
              <CustomInput
                register={register("bundleTitle")}
                placeholder={card.bundleTitle}
                isError={!!errors.bundleTitle}
              />
            </div>

            <div className="mb-4">
              <label>Bundle Icon</label>
              <CustomInput
                register={register("bundleIcon")}
                placeholder={card.bundleIcon}
                isError={!!errors.bundleIcon}
              />
            </div>

            <div className="mb-4">
              <label>Price</label>
              <CustomInput
                register={register("price")}
                placeholder={card.price}
                isError={!!errors.price}
              />
            </div>

            {/* Dynamic features */}
            <div className="mb-4">
              <label>Feature(s)</label>
              {features.map((feature, index) => {
                const isLast = index === features.length - 1;

                return (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    {isLast ? (
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1 border rounded-lg px-3 py-2 text-sm bg-transparent text-white"
                      />
                    ) : (
                      <span className="flex-1 text-white/80 px-3 py-2">
                        {feature}
                      </span>
                    )}

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
              <label>Card Image</label>
              <div className="flex items-start gap-4">
                {files.length > 0 && (
                  <div className="flex my-2 flex-wrap gap-2 w-1/2">
                    {files.map((file, index) => (
                      <div key={index} className="relative">
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
                    {files.length > 0
                      ? "Upload More Images"
                      : "Click to Upload"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-12 md:flex-row justify-end gap-4">
              <CommonDashboardButton title="Edit Card" Icon={Plus} />
              <button
                type="button"
                onClick={() => reset()}
                className="px-4 py-2 cursor-pointer rounded-md border-secondary-color border text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSpecialCard;
