import CommonDashboardButton from "@/common/CommonDashBoardButton";
import DashboardDeleteButton from "@/common/DashboardDeleteButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Plus, Trash, Upload } from "lucide-react";
import { useState } from "react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import logo from "../../../../assets/logo.png";
import { slidesData } from "../../UserDashboard/Home/DashboardBanner";

const AdminDashboardBanner = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState<number | null>(
    null
  );

  const [newImage, setNewImage] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false); // To track delete confirmation

  const handleModalOpen = (index: number) => {
    setSelectedSlideIndex(index);
    setCurrentImage(slidesData[index]?.img);
    setOpenModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageURL = URL.createObjectURL(file);
      setNewImage(imageURL);
      console.log("Uploaded Image:", imageURL);
    }
  };

  const handleImageDelete = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteConfirmation = () => {
    setNewImage(null);
    console.log("Image Deleted");
    setConfirmDeleteOpen(false);
    setOpenModal(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false); // Close delete confirmation without deleting
  };

  return (
    <div className="mt-20 w-full">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        initialSlide={1}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        coverflowEffect={{
          rotate: 50,
          stretch: 50,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        breakpoints={{
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 1,
          },
        }}
        className="mySwiper w-full  h-[250px] mx-0 p-0"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="p-0 m-0">
            <div className="relative w-full h-full">
              <img
                src={slide.img}
                alt={slide.alt}
                className="object-cover w-full h-full"
              />
              {activeSlide === index && (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/50 to-black/80 flex flex-col justify-center items-center">
                  <img
                    src={logo}
                    alt="Logo"
                    className="w-24 h-24 mb-4 object-contain"
                  />
                  <button onClick={() => handleModalOpen(index)}>
                    <CommonDashboardButton title="Manage Banner" Icon={Plus} />
                  </button>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          {/* This can be triggered from anywhere */}
        </DialogTrigger>

        <DialogContent className="bg-[#081028] rounded-lg p-10 mx-auto overflow-y-auto border-none max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl mb-4">
              Manage Banner Image
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg">Current Image</h3>
            <img
              src={newImage || currentImage!}
              alt="Banner"
              className="w-full max-h-[200px] object-fill rounded-md"
            />
            {!newImage && (
              <div className="mt-4 flex w-full mb-12 justify-center items-center gap-4">
                <DashboardDeleteButton
                  title="Delete Current Image"
                  Icon={Trash}
                  onClick={handleImageDelete}
                />
              </div>
            )}
            <div className="  w-full ">
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
                  className="cursor-pointer w-full h-full p-6 border-dashed border-2 rounded-md  flex justify-center items-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Upload
                      className="group-hover:scale-110 transition-all duration-300"
                      size={40}
                    />
                    Upload New Image{" "}
                  </div>
                </label>
              </div>
              <div className="w-full mt-4 flex flex-col md:flex-row justify-between gap-4">
                <CommonDashboardButton
                  title={newImage ? "Upload this Image" : "Upload New Image"}
                  Icon={Plus}
                />
                <button
                  onClick={() => {
                    setOpenModal(false);
                    setNewImage(null);
                  }}
                  className=" p-2 md:p-4 cursor-pointer bg-gray-400 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
        <DialogContent className="bg-[#081028] rounded-lg border-none p-6 mx-auto text-center">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Are you sure you want to delete this image?
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col md:flex-row  justify-between gap-4 mt-4">
            <DashboardDeleteButton
              title="Delete"
              onClick={handleDeleteConfirmation}
            />
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleCancelDelete}
              className="px-8 w-full md:w-fit py-4 cursor-pointer bg-gray-500 text-white rounded-md"
            >
              Cancel
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboardBanner;
