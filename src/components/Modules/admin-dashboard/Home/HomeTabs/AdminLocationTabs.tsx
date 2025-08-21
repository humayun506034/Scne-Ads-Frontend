import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CustomTextarea from "@/common/CommonDashboardTextArea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { locationData } from "@/lib/Data";
import { MapPin, Plus } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import AdminLocationCard from "./AdminLocationCard";

export default function AdminLocationTabs() {
  const [tab, setTab] = useState("new");

  const TabName = [
    { tab: "new", label: "NEW ARRIVALS" },
    { tab: "top", label: "TOP SELLERS" },
    { tab: "fav", label: "FAVOURITES" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [files, setFiles] = useState<File[]>([]);

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
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
      <TabsList className="bg-transparent mb-8">
        {TabName.map((item) => (
          <TabsTrigger
            key={item.tab}
            value={item.tab}
            className={`text-white cursor-pointer text-sm font-semibold ${
              tab === item.tab ? "font-semibold" : "font-normal"
            }`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={tab}>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          {locationData
            .filter((location) => location.category === tab)
            .map((location, index) => (
              <>
                {" "}
                {index === 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full  h-full rounded-lg shadow-lg flex items-center justify-center ">
                        <div className="bg-secondary-color w-20 h-20 rounded-full flex items-center justify-center cursor-pointer">
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
                    <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
                      <DialogHeader>
                        {" "}
                        <DialogTitle className="flex justify-between items-center">
                          <p className=" md:text-2xl mb-4">Add Screen</p>
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
                            placeholder={"Enter screen name"}
                            isError={!!errors.screenName}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="">Screen Location location</label>
                          <CustomInput
                            register={register("location")}
                            placeholder={"Enter screen location"}
                            isError={!!errors.location}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="">Description</label>
                          <CustomTextarea
                            register={register("description")}
                            placeholder={"Enter screen description"}
                            isError={!!errors.description}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="">Screen Resolution</label>
                          <CustomInput
                            register={register("location")}
                            placeholder={"Enter screen size"}
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
                            placeholder={"Enter cost per play"}
                          />
                        </div>

                        <div className="flex  mt-12 justify-end">
                          <CommonDashboardButton
                            title="Add Screen"
                            Icon={Plus}
                          />
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                )}
                <AdminLocationCard edit={true} location={location} />
              </>
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
