/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from 'framer-motion';
import { X } from "lucide-react";

const ScreenPaymentDetailsModal = ({ selectedPayment, closeModal }: any) => {
  if (!selectedPayment) return null;



  const isVideo = (url: string) => url?.endsWith(".mp4") || url?.includes("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={closeModal}
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
            Screen Payment Details
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={closeModal}
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
                  {selectedPayment?.user.first_name} {selectedPayment?.user.last_name}
                </p>
                <p>
                  <span className="text-title-color text-base">Email: </span> {selectedPayment?.user.email}
                </p>
                <p>
                  <span className="text-title-color text-base">User ID: </span> {selectedPayment?.user.id}
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
                  <span className="text-title-color text-base">ID: </span> {selectedPayment?.id}
                </p>
                <p>
                  <span className="text-title-color text-base">Transaction ID: </span> {selectedPayment?.transactionId}
                </p>
                <p>
                  <span className="text-title-color text-base">Amount: </span> ${selectedPayment?.amount}
                </p>
                <p>
                  <span className="text-title-color text-base">Status: </span> 
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedPayment?.status === "success"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}>
                    {selectedPayment?.status}
                  </span>
                </p>
                <p>
                  <span className="text-title-color text-base">Purchased: </span> {new Date(selectedPayment?.createdAt).toLocaleString()}
                </p>
              </div>
            </section>
          </div>

          {/* Screens */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Screens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedPayment?.screens || []).map((screen: any) => (
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
                  <p className="text-base font-medium">{screen.screen_name}</p>
                  <p className="text-sm text-gray-300">{screen.location}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 text-xs bg-slate-700 rounded-full">
                      Size: {screen.screen_size}
                    </span>
                    <span className="px-2 py-1 text-xs bg-slate-700 rounded-full">
                      Price: ${screen.price} Per Day
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Uploaded Contents
            </h3>
            {selectedPayment?.contentUrls && selectedPayment.contentUrls.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPayment.contentUrls.map((contentUrl: string, index: number) => (
                  <div key={index} className="border border-slate-700 rounded-lg p-4 bg-slate-800/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-medium">Content {index + 1}</h4>
            
                    </div>
                    {isVideo(contentUrl) ? (
                      <video controls className="w-full h-48 object-cover rounded-lg">
                        <source src={contentUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={contentUrl}
                        alt={`Uploaded Content ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No content uploaded</p>
            )}
          </section>
           <div className='flex justify-center md:justify-end '>
             <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
           onClick={closeModal}
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
};

export default ScreenPaymentDetailsModal;