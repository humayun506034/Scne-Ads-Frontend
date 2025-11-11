/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CustomInput from "@/common/CommonDashboardInput";
import CommonSelect from "@/common/CommonSelect";
import Loading from "@/common/MapLoading";
import { z } from "zod";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  useCreateBundleMutation,
  useGetAllBundleQuery,
} from "@/store/api/Bundle/bundleApi";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import AdminSpecialCard, { Bundle } from "./AdminSpecialCard";

const BundleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.preprocess(
    (v) => Number(v),
    z
      .number({ invalid_type_error: "Price is required" })
      .positive("Price must be greater than 0")
  ),
  status: z.enum(["ongoing", "expired"], {
    required_error: "Status is required",
  }),
  duration: z.enum(["7 Days", "15 Days", "30 Days"], {
    required_error: "Duration is required",
  }),
});

type BundleForm = z.infer<typeof BundleSchema>;

export type Screen = {
  id: string;
  screen_name: string;
  screen_size?: string;
  location?: string;
  price?: number;
  availability?: "available" | "unavailable";
  imageUrls?: string[];
};

const AdminSpecialSection = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const [duration, setDuration] = useState<BundleForm["duration"]>("7 Days");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BundleForm>({
    resolver: zodResolver(BundleSchema),
    defaultValues: {
      title: "",
      price: 0,
      status: "ongoing",
      duration: "7 Days",
    },
  });
  const [createBundle, { isLoading: isCreating }] = useCreateBundleMutation();
  const { data } = useGetAllScreenQuery({
    page: "1",
    searchTerm: "",
    limit: 1000,
  });
  const {
    data: bundle,
    isLoading: isLoadingBundle,
    refetch: refetchBundles,
  } = useGetAllBundleQuery({
    page: "1",
    searchTerm: "",
    limit: 10000,
  });

  const allScreens: Screen[] = useMemo(() => {
    return data?.data?.data ?? [];
  }, [data]);

  const filteredScreens = useMemo(() => {
    if (!query.trim()) return allScreens;
    const q = query.toLowerCase();
    return allScreens.filter(
      (s) =>
        s.screen_name?.toLowerCase().includes(q) ||
        s.location?.toLowerCase().includes(q)
    );
  }, [allScreens, query]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
  };

  const handleClickUpload = () => {
    document.getElementById("file-upload")?.click();
  };

  const clearAll = () => setSelected([]);

  const selectAllVisible = () =>
    setSelected((prev) => {
      const ids = new Set(prev);
      filteredScreens.forEach((s) => ids.add(s.id));
      return Array.from(ids);
    });
  const onSubmit: SubmitHandler<BundleForm> = async (form) => {
    if (!file) {
      toast.error("Please upload a bundle thumbnail.");
      return;
    }
    if (selected.length < 2) {
      toast.error("Please select at least two screens for this bundle.");
      return;
    }
    const id = toast.loading("Adding bundle...");
    try {
      const dataJson = {
        bundle_name: String(form.title),
        price: Number(form.price),
        duration: form.duration,
        status: "ongoing",
        screens: selected.map((id: string) => ({ screen_id: id })),
      };

      const fd = new FormData();
      fd.append("data", JSON.stringify(dataJson));

      fd.append("file", file);

      const res = await createBundle(fd).unwrap();

      if (res?.success) {
        toast.success("Bundle added successfully!", { id });
        reset();
        setFile(null);
        setSelected([]);
        setQuery("");
        setDuration("7 Days");
        setOpen(false);
      } else {
        toast.error(res?.message || "Failed to add bundle.");
      }
    } catch (error: any) {
      const message =
        error?.data?.message || error?.message || "Failed to add bundle.";
      toast.error(message, { id });
    }
  };

  return (
    <div className="mt-12 md:mt-20 relative">
      <h1 className="text-3xl md:mb-6 font-semibold text-center">
        Bundle Campaigns
      </h1>

      {isLoadingBundle && (
        <div className="w-full h-[250px] flex justify-center items-center">
          <Loading />
        </div>
      )}

      <Carousel className="w-full p-0 m-0">
        <CarouselContent className="p-0 m-0 gap-8">
          <CarouselItem className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4">
            <Dialog
              open={open}
              onOpenChange={setOpen}
            >
              <DialogTrigger asChild>
                <div className="w-full min-h-[30dvh]  h-full rounded-lg shadow-lg flex items-center justify-center cursor-pointer">
                  <motion.div
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    className="bg-secondary-color w-20 h-20 rounded-full flex items-center justify-center"
                  >
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
                  </motion.div>
                </div>
              </DialogTrigger>

              <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh]">
                {/* <DialogHeader>
                      <DialogTitle className="text-2xl font-semibold text-white">
                        Add bundle
                      </DialogTitle>
                    </DialogHeader> */}

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Title */}
                  <div className="mb-4">
                    <label>Title</label>
                    <CustomInput
                      register={register("title")}
                      placeholder="Enter Title"
                      isError={!!errors.title}
                    />
                    {errors.title && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>Price</label>
                    <CustomInput
                      type="number"
                      register={register("price")}
                      placeholder="Enter Price"
                      isError={!!errors.price}
                    />
                    {errors.price && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4 w-full">
                    <label className="">Duration</label>
                    <CommonSelect
                      className="w-full mt-2"
                      Value={duration}
                      setValue={(v) => {
                        setDuration(v as BundleForm["duration"]);
                        setValue("duration", v as BundleForm["duration"], {
                          shouldValidate: true,
                        });
                      }}
                      options={[
                        { value: "7 Days", label: "7 Days" },
                        { value: "15 Days", label: "15 Days" },
                        { value: "30 Days", label: "30 Days" },
                      ]}
                    />
                    {errors.duration && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                  {/* Screen picker */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between gap-3">
                      <label className="block">
                        Select Screens (Available)
                      </label>
                      <div className="text-xs text-white/60">
                        {selected.length} selected
                      </div>
                    </div>
                    {isLoadingBundle && (
                      <div className="w-full h-[50px] flex justify-center items-center">
                        <Loading />
                      </div>
                    )}

                    {/* Search + actions */}
                    <div className="mt-2 flex flex-col gap-2 md:flex-row md:items-center">
                      <div className="flex items-center gap-2 bg-[#132C51] rounded-md px-3 py-2 w-full">
                        <Search size={22} />
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Search by name or location"
                          className="bg-transparent outline-none py-2 flex-1 w-full "
                        />
                        {query && (
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            whileHover={{ scale: 1.1 }}
                            type="button"
                            onClick={() => setQuery("")}
                            className="opacity-70 hover:opacity-100 cursor-pointer"
                          >
                            <X size={18} />
                          </motion.button>
                        )}
                      </div>

                      <div className="flex text-nowrap gap-2">
                        <CommonCancelButton
                          type="button"
                          title="Select All Visible"
                          onClick={selectAllVisible}
                        ></CommonCancelButton>
                        <CommonCancelButton
                          title="Clear"
                          type="button"
                          onClick={clearAll}
                        ></CommonCancelButton>
                      </div>
                    </div>

                    {/* List */}
                    <div className="mt-3 max-h-64 overflow-auto rounded-md  border-secondary-color border-dashed border p-2">
                      {filteredScreens.length === 0 ? (
                        <div className="text-center py-8 text-white/50">
                          No screens found.
                        </div>
                      ) : (
                        <ul className="divide-y gap-2 divide-white/5">
                          {filteredScreens.map((s) => {
                            const checked = selected.includes(s.id);
                            return (
                              <li
                                key={s.id}
                                className="flex items-center gap-4 px-3  py-3  hover:bg-[#132C51] hover:text-white cursor-pointer"
                                onClick={() => toggleSelect(s.id)}
                              >
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 cursor-pointer 
                                      "
                                  checked={checked}
                                  onChange={() => toggleSelect(s.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">
                                    {s.screen_name}
                                  </div>
                                  <div className="text-xs text-white/60">
                                    {s.location || "Unknown"} •{" "}
                                    {s.screen_size || "N/A"}
                                    {typeof s.price === "number"
                                      ? ` • ৳${s.price}`
                                      : ""}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    {/* Selected chips */}
                    {selected.length > 0 && (
                      <div className="mt-4  flex flex-wrap gap-2">
                        {selected
                          .map((id) => allScreens.find((s) => s.id === id))
                          .filter(Boolean)
                          .map((s) => (
                            <span
                              key={s!.id}
                              onClick={() => toggleSelect(s!.id)}
                              className="text-xs cursor-pointer bg-white/10 rounded-full px-4 py-2 flex items-center gap-1"
                            >
                              {s!.screen_name}
                              <button
                                type="button"
                                className="hover:opacity-80"
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label>Bundle Thumbnail</label>
                    <div className="flex flex-col lg:flex-row items-start gap-4">
                      <div className="w-full">
                        {file ? (
                          <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full h-40 object-fill rounded-md mt-2"
                          />
                        ) : (
                          <div className="w-full h-40 rounded-md mt-2 border border-white/10 grid place-content-center text-white/40">
                            No image selected
                          </div>
                        )}
                      </div>

                      <div
                        className="border-dashed bg-[#132C51] p-6 mt-2 rounded-md flex items-center justify-center cursor-pointer w-full h-40"
                        onClick={handleClickUpload}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden w-full h-40"
                        />
                        <span className="text-sm md:text-base">
                          {file ? (
                            "Replace Image"
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

                  <div className="flex flex-col md:flex-row gap-4 mt-12 justify-end">
                    <CommonDashboardButton
                      disabled={isCreating}
                      title={isCreating ? "Adding..." : "Add Bundle"}
                      Icon={Plus}
                      type="submit"
                    />
                    <CommonCancelButton
                      onClick={() => {
                        reset();
                        setFile(null);
                        setSelected([]);
                        setQuery("");
                        setOpen(false);
                      }}
                      title="Cancel"
                    />
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CarouselItem>

          {isLoadingBundle ? (
            <CarouselItem className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4 flex items-center justify-center">
              <Loading />
            </CarouselItem>
          ) : bundle?.data?.data.length === 0 ? (
            <CarouselItem className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4 flex items-center justify-center text-white/60">
              No bundles yet.
            </CarouselItem>
          ) : (
            bundle?.data?.data.map((b: Bundle) => (
              <CarouselItem
                key={b.id}
                className="md:basis-1/2 lg:basis-1/2 xl:basis-1/4"
              >
                <AdminSpecialCard
                  bundle={b}
                  onUpdated={refetchBundles}
                />
              </CarouselItem>
            ))
          )}
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
