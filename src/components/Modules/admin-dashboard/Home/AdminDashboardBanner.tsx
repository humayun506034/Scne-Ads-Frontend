/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import DashboardDeleteButton from "@/common/DashboardDeleteButton";
import Loading from "@/common/MapLoading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetAllBannerQuery,
} from "@/store/api/adminDashboard/adminApi";
import { Plus, Trash, Upload } from "lucide-react";
import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type BannerItem = {
  img_url: string;
  _id?: string;
  id?: string;
  bannerId?: string;
  banner_id?: string;
};

const AdminDashboardBanner = () => {
 const { data, isLoading, refetch } = useGetAllBannerQuery(undefined);
 const [activeSlide, setActiveSlide] = useState(0);


  const [openModal, setOpenModal] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<string | null>(null);

  const [newImage, setNewImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const swiperRef = useRef<any>(null);
  
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();
  const [createBanner, { isLoading: isUploading }] = useCreateBannerMutation();

  const banners = Array.isArray(data?.data) ? (data?.data as BannerItem[]) : [];
  const hasBanners = banners.length > 0;

  useEffect(() => {
    return () => {
      if (newImage) URL.revokeObjectURL(newImage);
    };
  }, [newImage]);



  const resolveBannerId = (banner: BannerItem | undefined): string | null => {
    if (!banner) return null;
    return banner._id ?? banner.id ?? banner.bannerId ?? banner.banner_id ?? null;
  };


  const openEmptyModal = () => {
    setSelectedSlideIndex(null);
    setCurrentImage(null);
    setNewImage(null);
    setNewImageFile(null);
    setConfirmDeleteOpen(false);
    setOpenModal(true);
  };


  const handleModalOpen = (banner: BannerItem) => {
    const bannerId = resolveBannerId(banner);
    setSelectedSlideIndex(bannerId ?? null);
    setCurrentImage(banner?.img_url || null);
    setNewImage(null);
    setNewImageFile(null);
    setConfirmDeleteOpen(false);
    setOpenModal(true);

    if (!bannerId) {
      toast.message("No banner ID on this slide", {
        description: "You can pick a new image, but upload may require a valid banner ID on the server.",
      });
    }
  };

  const handleModalChange = (isOpen: boolean) => {
    setOpenModal(isOpen);
    if (!isOpen) {
      setNewImage(null);
      setNewImageFile(null);
      setCurrentImage(null);
      setSelectedSlideIndex(null);
      setConfirmDeleteOpen(false);
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageURL = URL.createObjectURL(file);
    setNewImage(imageURL);
    setNewImageFile(file);
    e.target.value = "";
  };

  const handleUploadNewImage = async () => {
    if (isUploading) {
      toast.info("Upload in progress. Please wait.");
      return;
    }

    if (!newImageFile) {
      toast.error("Please upload an image first.");
      return;
    }


    const formData = new FormData();
    formData.append("file", newImageFile);

    try {
      const res = await createBanner(formData).unwrap();
     
      if (res?.success) {
        toast.success("Banner image uploaded.");
        setNewImage(null);
        setNewImageFile(null);
        setCurrentImage(null);
        setSelectedSlideIndex(null);
        handleModalChange(false);
        await refetch();
      } else {
        toast.error(res?.message || "Failed to upload banner image.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload banner image.");
    }
  };

  const handleDeleteConfirmation = async () => {
    if (isDeleting) {
      toast.info("Delete in progress. Please wait.");
      return};

    if (!selectedSlideIndex) {
      toast.error("Select a valid banner before deleting.");
      return;
    }

    try {
      const res = await deleteBanner(selectedSlideIndex).unwrap();
      console.log("🚀 ~ handleDeleteConfirmation ~ res:", res);
        if (res?.success) {
      toast.success("Banner image deleted.");
      setNewImage(null);
      setNewImageFile(null);
      setCurrentImage(null);
      setSelectedSlideIndex(null);
      setConfirmDeleteOpen(false);
      handleModalChange(false);
      await refetch();}
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete banner image.");
    }
  };

const wantIndex = banners.length > 1 ? 1 : 0;
  const PlaceholderCard = ({ onManage }: { onManage: () => void }) => (
    <div className="relative w-full h-full">
      <div className="w-full h-full bg-[#0a1024] border border-white/10 rounded-md grid place-content-center">
        <div className="text-center space-y-3 px-4">
          <p className="text-sm text-white/70">No banner image available</p>
          <p className="text-xs text-white/40">Add or update a banner image anytime.</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/70 flex items-center justify-center">
        <CommonDashboardButton onClick={onManage} title="Add Banner" Icon={Plus} />
      </div>
    </div>
  );

  return (
    <div className="mt-10 w-full">
      

      {isLoading ? (
        <div className="w-full h-[250px] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <Swiper
         key={`banners-${banners.length}-${wantIndex}`}
          effect={"coverflow"}
          grabCursor
          centeredSlides
          slidesPerView={1}
        initialSlide={wantIndex} 
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;      
            setActiveSlide(swiper?.realIndex ?? 0);
          }}
          pagination
          modules={[EffectCoverflow, Pagination]}
          breakpoints={{
            1280: { slidesPerView: 3, spaceBetween: 20 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
          className="mySwiper w-full h-[250px] mx-0 p-0"
        >
          {hasBanners ? (
            banners.map((slide, index) => {
              const id = resolveBannerId(slide);
              const hasImage = Boolean(slide?.img_url);

              return (
                <SwiperSlide key={id ?? `slide-${index}`} className="p-0 m-0">
                  {hasImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={slide.img_url}
                        alt={slide.img_url || "banner"}
                        className="object-cover w-full h-full rounded-md"
                      />
                      {(activeSlide === index || banners.length === 1) && (
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/80 flex flex-col justify-center items-center">
                          <div className="w-fit">
                            <CommonDashboardButton
                            onClick={() => handleModalOpen(slide)}
                            title="Manage Banner"
                            Icon={Plus}
                          />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <PlaceholderCard onManage={() => handleModalOpen(slide)} />
                  )}
                </SwiperSlide>
              );
            })
          ) : (
            // No banners at all → show a single placeholder slide
            <SwiperSlide className="p-0 m-0">
              <PlaceholderCard onManage={openEmptyModal} />
            </SwiperSlide>
          )}
        </Swiper>
      )}

      {/* Manage Modal */}
      <Dialog open={openModal} onOpenChange={handleModalChange}>
        <DialogContent className="bg-[#081028] rounded-lg p-10 mx-auto overflow-y-auto border-none max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl mb-4">
              Manage Banner Image
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg">Preview</h3>

            {newImage || currentImage ? (
              <img
                src={newImage || currentImage || ""}
                alt="Banner preview"
                className="w-full max-h-[200px] object-fill rounded-md"
              />
            ) : (
              <div className="w-full max-h-[200px] h-[180px] bg-[#0a1024] border border-white/10 rounded-md grid place-content-center">
                <p className="text-sm text-white/60">No image selected</p>
              </div>
            )}

            {/* Delete only when an image + valid banner is present and no new upload in progress */}
            {selectedSlideIndex && currentImage && !newImage && (
              <div className="mt-4 flex w-full mb-12 justify-center items-center gap-4">
                <DashboardDeleteButton
                  title={isDeleting ? "Deleting..." : "Delete Current Image"}
                  Icon={Trash}
                  onClick={() => setConfirmDeleteOpen(true)}
                />
              </div>
            )}

            <div className="w-full">
              <div className="w-full group h-40 flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="upload-banner"
                />
                <label
                  htmlFor="upload-banner"
                  className="cursor-pointer w-full h-full p-6 border-dashed border-2 rounded-md border-title-color text-title-color flex justify-center items-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="group-hover:scale-110 transition-all duration-300" size={40} />
                    Upload New Image
                  </div>
                </label>
              </div>

              <div className="w-full mt-8 flex flex-col md:flex-row justify-between gap-4">
                <CommonDashboardButton
                  title={isUploading ? "Uploading..." : "Upload this Image"}
                  Icon={Plus}
                  onClick={handleUploadNewImage}
                />
                <CommonCancelButton onClick={() => handleModalChange(false)} title="Cancel" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-[#081028] rounded-lg border-none p-6 mx-auto text-center">
          <DialogHeader>
            <DialogTitle className="text-xl">Are you sure you want to delete this image?</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
            <DashboardDeleteButton
              title={isDeleting ? "Deleting..." : "Delete"}
              onClick={handleDeleteConfirmation}
            />
            <CommonCancelButton onClick={() => setConfirmDeleteOpen(false)} title="Cancel" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardBanner;
