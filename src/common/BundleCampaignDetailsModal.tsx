/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { Download, X } from "lucide-react";
import { toast } from "sonner";

type BundleCampaignDetailsModalProps = {
  isOpen :  boolean;
  onClose :  () => void;
  campaign :  any;
};

export default function BundleCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
} :  BundleCampaignDetailsModalProps) {
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
    console.log("🚀 ~ BundleCampaignDetailsModal ~ bundle:", bundle)
   

  console.log('campaign', campaign);

  const isVideo = (url :  string) => url?.endsWith(".mp4") || url?.includes("video");

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
          <h2 id="modal-title" className="text-2xl font-semibold ">
            Bundle Campaign Details
          </h2>
          <motion.button
            whileHover={{ scale :  1.1 }}
            whileTap={{ scale :  0.8 }}
            onClick={onClose}
            aria-label="Close modal"
            className="text-title-color cursor-pointer hover :text-red-400"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="space-y-8">
       <div className='flex flex-col md:flex-row justify-between items-start gap-4 '>
           {/* Customer Info */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Customer Information
            </h3>
            <div className="space-y-2 text-base">
              <p>
                <span className="text-title-color text-base ">Name : </span>{" "}
                {customer?.first_name} {customer?.last_name}
              </p>
              <p>
                <span className="text-title-color text-base ">Email : </span> {customer?.email}
              </p>
              <p>
                <span className="text-title-color text-base ">Status : </span> {status}
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
                <span className="text-title-color text-base ">`Tra`nsaction ID : </span> {payment?.transactionId}
              </p>
              <p>
                <span className="text-title-color text-base ">Amount : </span> ${payment?.amount}
              </p>
              <p>
                <span className="text-title-color text-base ">Payment Status : </span> {payment?.status}
              </p>
              <p>
                <span className="text-title-color text-base ">Payment Date : </span> {new Date(payment?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </section>
       </div>

          {/* Bundle Info */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Bundle Information
            </h3>
            <div className="space-y-2 gap-4 text-base">
              <p>
                <span className="text-title-color text-base ">Bundle Name : </span>{" "}
                {bundle?.bundle_name}
              </p>
             
              <p>
                <span className="text-title-color text-base ">Duration : </span> {bundle?.duration}
              </p>
              <p>
                <span className="text-title-color text-base ">Price : </span> ${bundle?.price}
              </p>
              <p>
                <span className="text-title-color text-base ">Bundle Status : </span> {bundle?.status}
              </p>
              <p>
                <span className="text-title-color text-base ">Start Date : </span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-title-color text-base ">End Date : </span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-title-color text-base ">Created At : </span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="text-title-color text-base ">Updated At : </span>{" "}
                {new Date(updatedAt).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Content Information */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Contents Information
            </h3>
            <div className="grid gap-6">
              {contentUrls?.map((url :  string, index :  number) => (
                <div
                  key={index}
                  className="p-4 border border-slate-700 rounded-lg space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg text-title-color font-semibold">Content {index + 1}</h4>
                    <motion.button 
                      whileHover={{ scale :  1.1 }}
                      whileTap={{ scale :  0.8 }}
                      onClick={async () => {
                        try {
                          // Fetch the file as a blob
                          const response = await fetch(url);
                          const blob = await response.blob();
                          
                          // Create a blob URL
                          const blobUrl = window.URL.createObjectURL(blob);
                          
                          // Create a temporary anchor element
                          const a = document.createElement('a');
                          a.href = blobUrl;
                          a.download = `content-${index + 1}.${isVideo(url) ? 'mp4' : 'jpg'}`;
                          a.style.display = 'none';
                          
                          // Add to DOM, click, and clean up
                          document.body.appendChild(a);
                          a.click();
                          
                          // Clean up
                          window.URL.revokeObjectURL(blobUrl);
                          document.body.removeChild(a);
                        } catch (error) {
                          console.error('Download failed:', error);
                          toast.error('Failed to download the file. Please try again.');
                        }
                      }}
                      className="flex items-center gap-1 px-4 py-2 bg-title-color cursor-pointer text-black rounded-md transition-colors"
                      aria-label={`Download content ${index + 1}`}
                    >
                      <Download size={16} />
                      <span>Download</span>
                    </motion.button>
                  </div>

                  {/* Media */}
                  <div className="mb-4">
                    {isVideo(url) ? (
                      <video
                        src={url}
                        controls
                        className="w-full max-h-64 rounded-lg"
                        aria-label={`Video content ${index + 1}`}
                      />
                    )  :  (
                      <img
                        src={url}
                        alt={`Content ${index + 1}`}
                        className="w-full max-h-80 object-fill rounded-lg"
                        aria-label={`Image content ${index + 1}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screens Information */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Screens Information
            </h3>
            {bundle?.screens && bundle.screens.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bundle.screens.map((screen :  any) => (
                  <div
                    key={screen.id}
                    className="p-4 border border-slate-700 rounded-lg space-y-3"
                  >
                    <h4 className="text-sm font-semibold">{screen.screen_name}</h4>
                    <div className="mb-4">
                      <Carousel className="w-full relative">
                        <CarouselContent className="p-0">
                          {screen.imageUrls.length > 0 ? (
                            screen.imageUrls.map((imgUrl: any, index: number) => (
                              <CarouselItem key={index}>
                                <div className="p-1">
                                  <img
                                    src={imgUrl.url}
                                    alt={`Screen ${screen.screen_name} image ${index + 1}`}
                                    className="w-full h-40 object-fill rounded-lg"
                                    aria-label={`Screen ${screen.screen_name} image ${index + 1}`}
                                  />
                                </div>
                              </CarouselItem>
                            ))
                          ) : (
                            <CarouselItem>
                              <div className="p-1 flex items-center justify-center h-40 bg-slate-800 rounded-lg">
                                <span className="text-lg font-medium text-slate-400">No images</span>
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
                    <div className="text-sm">
                      <p>
                        <span className="text-title-color text-base ">Size : </span>{" "}
                        {screen.screen_size}
                      </p>
                      <p>
                        <span className="text-title-color text-base ">Location : </span>{" "}
                        {screen.location}
                      </p>
                      <p>
                        <span className="text-title-color text-base ">Price : </span> $
                        {screen.price}
                      </p>
                      <p>
                        <span className="text-title-color text-base ">Resolution : </span>{" "}
                        {screen.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )  :  (
              <p className="text-title-color text-base ">No screens available for this bundle.</p>
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
