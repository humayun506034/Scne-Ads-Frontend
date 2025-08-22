import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CustomTextarea from "@/common/CommonDashboardTextArea";
import { ILocation } from "@/components/Modules/UserDashboard/Home/HomeTabs/LocationCard";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus } from "lucide-react";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export interface LocationCardProps {
  location: ILocation;
  edit?: boolean;
}

const AdminLocationCard = ({ location, edit }: LocationCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
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
  const onSubmit = (data: FieldValues) => {
    console.log("Form Data:", data);
    reset();
  };

  return (
    <div className="w-full">
      <Card className="lg:w-full relative border-none h-[380px] xl:h-[350px] card mx-0 p-0 rounded-[30px] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(47,171,249,0.90)] bg-transparent ">
        <CardContent className="flex flex-col items-center gap-4 text-center p-0">
          <div className="w-full rounded-[15px] overflow-hidden p-6">
            <img
              src={location.image}
              alt={location.title}
              className="object-cover rounded-xl w-full h-40"
            />
          </div>
          <h3 className=" text-xl lg:font-semibold px-4">{location.title}</h3>
          <p className="/80 text-base lg:text-[14px] px-4">
            {location.description}
          </p>

          {edit && (
            <div>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="w-10 h-10 bg-[#033579] absolute -right-4 shadow-lg -top-3 flex items-center justify-center rounded-full">
                    <button className=" cursor-pointer flex items-center justify-center rounded-full">
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.3666 2.51639L6.7999 9.08305C6.5499 9.33305 6.2999 9.82472 6.2499 10.1831L5.89157 12.6914C5.75823 13.5997 6.3999 14.2331 7.30823 14.1081L9.81656 13.7497C10.1666 13.6997 10.6582 13.4497 10.9166 13.1997L17.4832 6.63306C18.6166 5.49972 19.1499 4.18306 17.4832 2.51639C15.8166 0.849722 14.4999 1.38306 13.3666 2.51639Z"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.425 3.45898C12.9834 5.45065 14.5417 7.00898 16.5417 7.57565"
                          stroke="white"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
                  <DialogHeader>
                    {" "}
                    <DialogTitle className="flex justify-between items-center">
                      <p className=" md:text-2xl mb-4">Edit Screen</p>
                      <div>
                        <CommonDashboardButton
                          title="Place on Map"
                          Icon={MapPin}
                        />
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className=" ">Screen Name</label>
                      <CustomInput
                        register={register("title")}
                        placeholder={location.title || "Enter screen name"}
                        isError={!!errors.screenName}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="">Screen Location location</label>
                      <CustomInput
                        register={register("location")}
                        placeholder={
                          location.location || "Enter screen location"
                        }
                        isError={!!errors.location}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="">Description</label>
                      <CustomTextarea
                        register={register("description")}
                        placeholder={
                          location.description || "Enter screen description"
                        }
                        isError={!!errors.description}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="">Screen Resolution</label>
                      <CustomInput
                        register={register("location")}
                        placeholder={location.screenSize || "Enter screen size"}
                      />
                    </div>

                    <div className="mb-4">
                      <label className=" mb-2">Tier Level</label>
                      <div className="flex flex-row flex-wrap gap-4 my-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="Basic"
                            {...register("tierLevel", { required: true })}
                            className="accent-secondary-color cursor-pointer"
                          />
                          <span>Basic</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="Standard"
                            {...register("tierLevel", { required: true })}
                            className="accent-secondary-color cursor-pointer"
                          />
                          <span>Standard</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            value="Premium"
                            {...register("tierLevel", { required: true })}
                            className="accent-secondary-color cursor-pointer"
                          />
                          <span>Premium</span>
                        </label>
                      </div>

                      {errors.tierLevel && (
                        <p className="text-red-500 text-sm">
                          Please select a tier
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="">Screen Thumbnail</label>
                      <div className="flex items-start  gap-4">
                        {files && (
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
                          className="border-dashed  bg-[#132C51] p-6 rounded-md flex items-center justify-center cursor-pointer w-1/2 h-32"
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
                            {files.length > 0 ? (
                              "Upload More Images"
                            ) : (
                              <div className="flex flex-col items-center justify-center">
                                {" "}
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
                                    stroke-width="2.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="">Cost Per Play</label>
                      <CustomInput
                        type="number"
                        {...register("costPerPlay")}
                        placeholder={
                          location.costPerPlay?.toString() ||
                          "Enter cost per play"
                        }
                      />
                    </div>

                    <div className="flex flex-col mt-12 md:flex-row justify-end gap-4">
                      <CommonDashboardButton title="Edit Screen" Icon={Plus} />
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLocationCard;
