

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { Download, X } from "lucide-react";

type ScreenCampaignDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
};

export default function ScreenCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: ScreenCampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  const {
    customer,
    CustomPayment,
    screens,
    contentUrls,
    status,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  } = campaign;

  const isVideo = (url: string) => url?.endsWith(".mp4") || url?.includes("video");

  const handleDownload = async (url: string) => {
    try {
      // Fetch the file as a blob
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Create a blob URL
      const blobUrl = URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = blobUrl;
      
      // Set the download filename based on the URL
      const filename = url.split('/').pop() || 
                      (isVideo(url) ? 'video.mp4' : 'image.jpg');
      link.download = filename;
      
      // Append to body, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Release the blob URL
      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Download failed:', error);
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
          <h2 id="modal-title" className="text-2xl font-semibold">
            Screen Campaign Details
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
          <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
            {/* Customer Info */}
            <section>
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
                Customer Information
              </h3>
              <div className="space-y-2 text-base">
                <p>
                  <span className="text-title-color text-base">Name: </span>{" "}
                  {customer?.first_name} {customer?.last_name}
                </p>
                <p>
                  <span className="text-title-color text-base">Email: </span> {customer?.email}
                </p>
                <p>
                  <span className="text-title-color text-base">Status: </span> {status}
                </p>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
                Payment Information
              </h3>
              <div className="space-y-2 text-base">
                <p>
                  <span className="text-title-color text-base">Amount: </span> $
                  {CustomPayment?.[0]?.amount || 0}
                </p>
                <p>
                  <span className="text-title-color text-base">Status: </span>{" "}
                  {CustomPayment?.[0]?.status || "Unpaid"}
                </p>
              </div>
            </section>

            {/* Campaign Info */}
            <section>
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
                Campaign Information
              </h3>
              <div className="space-y-2 text-base">
                <p>
                  <span className="text-title-color text-base">Start Date: </span>{" "}
                  {new Date(startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-title-color text-base">End Date: </span>{" "}
                  {new Date(endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-title-color text-base">Created: </span>{" "}
                  {new Date(createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="text-title-color text-base">Updated: </span>{" "}
                  {new Date(updatedAt).toLocaleDateString()}
                </p>
              </div>
            </section>
          </div>

          {/* Screens Section */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Screens ({screens?.length || 0})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {screens?.map((screen: any) => (
                <div
                  key={screen.id}
                  className="p-4 border border-slate-700 rounded-lg space-y-3"
                >
                  <h4 className="text-sm font-semibold">{screen.name || screen.screen_name}</h4>
                  <div className="mb-4">
                    <Carousel className="w-full relative">
                      <CarouselContent className="p-0">
                        {screen.imageUrls && screen.imageUrls.length > 0 ? (
                          screen.imageUrls.map((imgUrl: any, index: number) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <img
                                  src={imgUrl.url || imgUrl}
                                  alt={`Screen ${screen.name || screen.screen_name} image ${index + 1}`}
                                  className="w-full h-40 object-fill rounded-lg"
                                  aria-label={`Screen ${screen.name || screen.screen_name} image ${index + 1}`}
                                />
                              </div>
                            </CarouselItem>
                          ))
                        ) : screen.img_url ? (
                          <CarouselItem>
                            <div className="p-1">
                              <img
                                src={screen.img_url}
                                alt={`Screen ${screen.name || screen.screen_name}`}
                                className="w-full h-40 object-fill rounded-lg"
                                aria-label={`Screen ${screen.name || screen.screen_name}`}
                              />
                            </div>
                          </CarouselItem>
                        ) : (
                          <CarouselItem>
                            <div className="p-1 flex items-center justify-center h-40 bg-slate-800 rounded-lg">
                              <span className="text-lg font-medium text-slate-400">No images</span>
                            </div>
                          </CarouselItem>
                        )}
                      </CarouselContent>
                      
                      {screen.imageUrls && screen.imageUrls.length > 1 && (
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
                  <div className="text-sm">
                    <p>
                      <span className="text-title-color text-base">Size: </span>{" "}
                      {screen.screen_size || "N/A"}
                    </p>
                    <p>
                      <span className="text-title-color text-base">Location: </span>{" "}
                      {screen.location}
                    </p>
                    <p>
                      <span className="text-title-color text-base">Price: </span> $
                      {screen.price || "N/A"}
                    </p>
                    <p>
                      <span className="text-title-color text-base">Status: </span>{" "}
                      {screen.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Content Section */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Content ({contentUrls?.length || 0}) 
            </h3>
            {contentUrls?.length > 0 ? (
              <div className="space-y-6">
                {contentUrls.map((url: string, index: number) => (
                  <div key={index} className="bg-[#11214D] p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium md:text-xl">
                        Content {index + 1} ({isVideo(url) ? "Video" : "Image"})
                      </h4>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(url)}
                      className="flex items-center gap-1 px-4 py-2 bg-title-color cursor-pointer text-black rounded-md transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </motion.button>
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
                                className="w-full h-40 rounded-md object-cover"
                              />
                            </CarouselItem>
                          </CarouselContent>
                        </Carousel>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No content available</p>
            )}
          </section>
           <div className='flex justify-center md:justify-end '>
             <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
           onClick={onClose}
            aria-label="Close modal"
            className="text-title-color border px-4 py-2 rounded-lg border-secondary-color cursor-pointer hover:text-red-400 " 
          >
            Close
          </motion.button>
        </div>
        </div>
      </div>
    </div>
  );
}
