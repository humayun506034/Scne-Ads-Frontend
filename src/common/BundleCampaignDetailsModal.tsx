/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Download,
  Hash,
  ImageIcon,
  Info,
  Layers,
  Mail,
  MapPin,
  Monitor,
  PlaySquare,
  Tv2,
  User2,
  X,
} from "lucide-react";

type BundleCampaignDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
};

export default function BundleCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: BundleCampaignDetailsModalProps) {
  const user = useAppSelector(selectCurrentUser);

  if (!isOpen || !campaign) return null;

  const {
    customer,
    payment,
    bundle,
    contentUrls,
    status,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  } = campaign;

  const isVideo = (url: string) =>
    url?.endsWith(".mp4") || url?.includes("video");

  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const filename =
        url.split("/").pop() ||
        (url.endsWith(".mp4") ? "video.mp4" : "image.jpg");
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
        role="presentation"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
          <h2
            id="modal-title"
            className="text-2xl font-semibold flex items-center gap-2"
          >
            <Layers className="w-5 h-5 text-[#38B6FF]" />
            Bundle Campaign Details
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={onClose}
            aria-label="Close modal"
            className="text-title-color cursor-pointer hover:text-red-400"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="space-y-8">
          {/* Top: Customer + Payment */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            {/* Customer Info */}
            <section className="w-full md:w-1/2 rounded-lg border border-slate-700 p-4">
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4 flex items-center gap-2">
                <User2 className="w-5 h-5" /> Customer Information
              </h3>
              <div className="space-y-3 text-base">
                <p className="flex items-center gap-2">
                  <User2 className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Name:</span>{" "}
                  {customer?.first_name} {customer?.last_name}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Email:</span>{" "}
                  {customer?.email}
                </p>
                <p className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Status:</span> {status}
                </p>
              </div>
            </section>

            {/* Payment Info */}
            <section className="w-full md:w-1/2 rounded-lg border border-slate-700 p-4">
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Payment Information
              </h3>
              <div className="space-y-3 text-base">
                <p className="flex flex-col md:flex-row flex-wrap md:items-center gap-2">
                  <p className="text-title-color flex  gap-2 md:justify-center items-center">
                    {" "}
                    <Hash className="w-4 h-4 text-title-color" /> Transaction
                    ID:
                  </p>{" "}
                  {payment?.transactionId}
                </p>
                <p className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Amount:</span> $
                  {payment?.amount}
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Payment Status:</span>{" "}
                  {payment?.status}
                </p>
                <p className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-title-color" />
                  <span className="text-title-color">Payment Date:</span>{" "}
                  {new Date(payment?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </section>
          </div>

          {/* Bundle Info */}
          <section className="rounded-lg border border-slate-700 p-4">
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4 flex items-center gap-2">
              <Info className="w-5 h-5" />
              Bundle Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-base">
              <p className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Bundle Name:</span>{" "}
                {bundle?.bundle_name}
              </p>
              <p className="flex items-center gap-2">
                <Tv2 className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Duration:</span>{" "}
                {bundle?.duration}
              </p>
              <p className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Price:</span> $
                {bundle?.price}
              </p>
              <p className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Bundle Status:</span>{" "}
                {bundle?.status}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Start Date:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-title-color" />
                <span className="text-title-color">End Date:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Created At:</span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-title-color" />
                <span className="text-title-color">Updated At:</span>{" "}
                {new Date(updatedAt).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Content Information */}
          <section className="rounded-lg border border-slate-700 p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
              <h3 className="text-xl font-semibold text-[#38B6FF] flex items-center gap-2">
                {campaign?.isUploaded ? (
                  <PlaySquare className="w-5 h-5" />
                ) : (
                  <ImageIcon className="w-5 h-5" />
                )}
                Contents Information
              </h3>

              <button
                className={`px-4 py-2 rounded-md font-medium ${
                  campaign?.isUploaded
                    ? "bg-title-color text-black"
                    : "bg-red-600 text-white"
                }`}
              >
                {campaign?.isUploaded
                  ? "Your Content has been Uploaded by Admin"
                  : "Your Content has Not Uploaded by Admin"}
              </button>
            </div>

            {/* Responsive content grid: 1 col on mobile, 2 cols on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contentUrls?.map((url: string, index: number) => (
                <div
                  key={index}
                  className="bg-[#11214D] p-4 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium md:text-xl">
                      Content {index + 1} ({isVideo(url) ? "Video" : "Image"})
                    </h4>
                    {user?.role === "admin" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(url)}
                        className="flex items-center gap-1 px-4 py-2 bg-title-color cursor-pointer text-black rounded-md transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
                    )}
                  </div>

                  {isVideo(url) ? (
                    <video
                      controls
                      className="w-full h-40 rounded-md"
                      src={url}
                    />
                  ) : (
                    <div className="relative">
                      <Carousel className="w-full">
                        <CarouselContent>
                          <CarouselItem>
                            <img
                              src={url}
                              alt={`Content ${index + 1}`}
                              className="w-full h-40 rounded-md object-contain object-center"
                            />
                          </CarouselItem>
                        </CarouselContent>
                      </Carousel>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Screens Information */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Screens Information
            </h3>
            {bundle?.screens && bundle.screens.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bundle.screens.map((screen: any) => (
                  <div
                    key={screen.id}
                    className="p-4 border border-slate-700 rounded-lg space-y-3"
                  >
                    <h4 className="text-sm font-semibold">
                      {screen.screen_name}
                    </h4>
                    <div className="mb-4">
                      <Carousel className="w-full relative">
                        <CarouselContent className="p-0">
                          {screen.imageUrls.length > 0 ? (
                            screen.imageUrls.map(
                              (imgUrl: any, index: number) => (
                                <CarouselItem key={index}>
                                  <div className="p-1">
                                    <img
                                      src={imgUrl.url}
                                      alt={`Screen ${
                                        screen.screen_name
                                      } image ${index + 1}`}
                                      className="w-full h-40 object-fill rounded-lg"
                                      aria-label={`Screen ${
                                        screen.screen_name
                                      } image ${index + 1}`}
                                    />
                                  </div>
                                </CarouselItem>
                              )
                            )
                          ) : (
                            <CarouselItem>
                              <div className="p-1 flex items-center justify-center h-40 bg-slate-800 rounded-lg">
                                <span className="text-lg font-medium text-slate-400">
                                  No images
                                </span>
                              </div>
                            </CarouselItem>
                          )}
                        </CarouselContent>

                        {screen.imageUrls.length > 1 && (
                          <>
                            <CarouselPrevious
                              className="absolute top-1/2 left-2 -translate-y-1/2 z-10
                                h-8 w-8 rounded-full
                                bg-white/15 text-white cursor-pointer border border-white/20
                                backdrop-blur shadow-lg
                                hover:bg-white/25 hover:scale-105 transition"
                            />
                            <CarouselNext
                              className="absolute top-1/2 right-2 -translate-y-1/2 z-10
                                h-8 w-8 rounded-full
                                bg-white/15 text-white cursor-pointer border border-white/20
                                backdrop-blur shadow-lg
                                hover:bg-white/25 hover:scale-105 transition"
                            />
                          </>
                        )}
                      </Carousel>
                    </div>

                    {/* Screen Details */}
                    <div className="text-sm space-y-1">
                      <p className="flex items-center gap-2">
                        <Tv2 className="w-4 h-4 text-title-color" />
                        <span className="text-title-color">Size:</span>{" "}
                        {screen.screen_size}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-title-color" />
                        <span className="text-title-color">Location:</span>{" "}
                        {screen.location}
                      </p>
                      <p className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-title-color" />
                        <span className="text-title-color">Price:</span> $
                        {screen.price}
                      </p>
                      <p className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-title-color" />
                        <span className="text-title-color">
                          Resolution:
                        </span>{" "}
                        {screen.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-title-color text-base">
                No screens available for this bundle.
              </p>
            )}
          </section>

          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={onClose}
              aria-label="Close modal"
              className="text-title-color border px-4 py-2 rounded-lg border-secondary-color cursor-pointer hover:text-red-400"
            >
              Close
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
