/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CustomTextarea from "@/common/CommonDashboardTextArea";
import CommonSelect from "@/common/CommonSelect";
import ExtractErrorMessage from "@/common/ExtractErrorMessage";
import Loading from "@/common/MapLoading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useCreateScreenMutation,
  useGetAllScreenQuery,
  useGetMySelfFavouriteScreensQuery,
  useGetTopSalesScreenQuery,
} from "@/store/api/Screen/screenApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import AdminLocationCard from "./AdminLocationCard";
import LocationMapModal from "./LocationMap";

/** ---------- Zod schema ---------- */
const ScreenFormSchema = z.object({
  screen_name: z.string().min(1, "Screen name is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  resolution: z.string().min(1, "Resolution is required"),
  screen_size: z.string(),
  isFeatured: z.boolean(),
  costPerPlay: z.coerce
    .number()
    .positive("Cost per play must be greater than 0"),
});

type ScreenFormInputs = z.infer<typeof ScreenFormSchema>;

export default function AdminLocationTabs() {
  const [tab, setTab] = useState("new");
  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const featured = [
    { value: "true", label: "true" },
    { value: "false", label: "false" },
  ];
  const [value, setValue] = useState(featured[0].value);
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const TabName = [
    { tab: "new", label: "NEW ARRIVALS" },
    { tab: "top", label: "TOP SALES" },
  ];

  const {
    data: topSalesData,
    isLoading: topSalesLoading,
    refetch: topSalesRefetch,
  } = useGetTopSalesScreenQuery(undefined, { skip: tab !== "top" });

  const { data, isLoading, refetch } = useGetAllScreenQuery({
    limit: 100000,
    page: "1",
  });

  const {
    data: favData,
    isLoading: favLoading,
    refetch: favRefetch,
  } = useGetMySelfFavouriteScreensQuery(undefined, { skip: tab !== "fav" });

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm<ScreenFormInputs>({
    resolver: zodResolver(ScreenFormSchema),
    defaultValues: {
      screen_name: "",
      location: "",
      description: "",
      resolution: "",
      screen_size: "",
      isFeatured: false,
      costPerPlay: 0,
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...uploadedFiles]);
    }
  };
  const [createScreen, { isLoading: createLoading }] =
    useCreateScreenMutation();
  const handleClick = () => {
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    fileInput?.click();
  };

  const onSubmit = async (formData: FieldValues) => {
    if (!selectedCoords) {
      toast.error("Please select a location on the map and confirm it.");
      return;
    }
    if (!files.length) {
      toast.error("Please upload at least one image.");
      return;
    }
    const id = toast.loading("Creating screen...");

    try {
      const payload = {
        screen_name: (formData as ScreenFormInputs).screen_name,
        screen_size: (formData as ScreenFormInputs).screen_size || "",
        description: (formData as ScreenFormInputs).description,
        resolution: (formData as ScreenFormInputs).resolution,
        price: (formData as ScreenFormInputs).costPerPlay,
        isFeatured: Boolean(value) || false,
        lat: String(selectedCoords.lat),
        lng: String(selectedCoords.lng),
        location: (formData as ScreenFormInputs).location,
      };

      const multipart = new FormData();
      multipart.append("data", JSON.stringify(payload));
      files.forEach((file) => multipart.append("files", file));

      const res = await createScreen(multipart).unwrap();

      if (res.success) {
        toast.success("Screen created successfully", { id });
        reset();
        refetch();
        if (tab === "top") topSalesRefetch();
        if (tab === "fav") favRefetch();
        setOpen(false);
        setSelectedCoords(null);
        setFiles([]);
      }
    } catch (err: any) {
      console.error("Error creating screen:", err);
      const msg = ExtractErrorMessage(err);
      toast.error(msg, { id });
    }
  };

  const locationData =
    tab === "new"
      ? data?.data?.data
      : tab === "top"
      ? topSalesData?.data
      : favData?.data;

  return (
    <div className="w-full flex justify-between ">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full mt-20"
      >
        <h1 className="text-center text-xl md:text-3xl font-semibold text-nowrap">
          Total Screens : {locationData?.length}
        </h1>
        <TabsList className="bg-transparent mb-8">
          {TabName.map((item) => (
            <TabsTrigger
              key={item.tab}
              value={item.tab}
              className={`text-white cursor-pointer text-sm font-semibold ${
                tab === item.tab ? "font-semibold" : "font-normal"
              }`}
            >
              <div className="flex items-center gap-2">{item.label}</div>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab}>
          {isLoading || topSalesLoading || favLoading ? (
            <div className="h-full w-full min-h-[10dvh] flex items-center justify-center">
              <Loading />
            </div>
          ) : locationData?.length === 0 ? (
            <p className="text-white text-center">No screens found</p>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {tab === "new" && (
                <Dialog
                  open={open}
                  onOpenChange={setOpen}
                >
                  <DialogTrigger asChild>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-full  h-full  flex items-center justify-center rounded-lg shadow-lg"
                    >
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
                    </motion.div>
                  </DialogTrigger>

                  <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
                    <DialogHeader>
                      <DialogTitle className="flex justify-between items-center">
                        <p className=" md:text-2xl mb-4">Add Screen</p>
                        <div>
                          <LocationMapModal
                            open={openMap}
                            setOpenMap={setOpenMap}
                            lat={selectedCoords?.lat}
                            lng={selectedCoords?.lng}
                            onConfirm={(lat, lng) =>
                              setSelectedCoords({ lat, lng })
                            }
                          />
                        </div>
                      </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <label className=" ">Screen Name</label>
                        <CustomInput
                          register={register("screen_name")}
                          placeholder={"Enter screen name"}
                          isError={!!errors.screen_name}
                        />
                        {errors.screen_name && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.screen_name.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="">Screen Location</label>
                        <CustomInput
                          register={register("location")}
                          placeholder={"Enter screen location"}
                          isError={!!errors.location}
                        />
                        {errors.location && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.location.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-4">
                        <label className="">Will Show as Featured ?</label>
                        <CommonSelect
                          Value={featured[0].value}
                          setValue={setValue}
                          options={featured}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="">Description</label>
                        <CustomTextarea
                          register={register("description")}
                          placeholder={"Enter screen description"}
                          isError={!!errors.description}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                          </p>
                        )}
                      </div>

                      {/* NEW: Screen Size input with example */}
                      <div className="mb-4">
                        <label className="">
                          Screen Size{" "}
                          <span className="text-title-color">
                            (e.g., "10x10 ft")
                          </span>
                        </label>
                        <CustomInput
                          register={register("screen_size")}
                          placeholder={"e.g., 10x10 ft"}
                          isError={!!errors.screen_size}
                        />
                        {errors.screen_size && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.screen_size.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="">
                          Screen Resolution
                          <span className="text-title-color">
                            {" "}
                            (e.g., "1920X1080")
                          </span>
                        </label>
                        <CustomInput
                          register={register("resolution")}
                          placeholder={'e.g., "1600X900"'}
                          isError={!!errors.resolution}
                        />
                        {errors.resolution && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.resolution.message}
                          </p>
                        )}
                      </div>

                      <div className="mb-4">
                        <label className="">Screen Thumbnail</label>
                        <div className="flex items-start  gap-4">
                          {files && (
                            <div className="flex my-2 flex-wrap gap-2 w-1/2">
                              {files.map((file, index) => (
                                <div
                                  key={index}
                                  className=" relative"
                                >
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

                      <div className="mb-4">
                        <label className="">Cost Per Play</label>
                        <CustomInput
                          type="number"
                          {...register("costPerPlay")}
                          placeholder={"Enter cost per play"}
                          isError={!!errors.costPerPlay}
                        />
                        {errors.costPerPlay && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.costPerPlay.message}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4  mt-12 justify-end">
                        <CommonDashboardButton
                          disabled={createLoading}
                          title="Add Screen"
                          Icon={Plus}
                        />
                        <CommonCancelButton
                          onClick={() => {
                            reset();
                            setOpen(false);
                            setSelectedCoords(null);
                          }}
                          title="Cancel"
                          type="submit"
                        />
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}

              {locationData?.map((location: any, index: number) => (
                <AdminLocationCard
                  key={index}
                  location={location}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
