/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const UserScreenPaymentDetailsModal= ({
  selectedPayment,
  closeModal,
}: {
  selectedPayment: any;
  closeModal: () => void;
}) => {
  if (!selectedPayment) return null;

  const isVideo = (url: string) =>
    url?.endsWith(".mp4") || url?.includes("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={closeModal}
        role="presentation"
      />

      {/* Modal */}
      <div
        className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6"
        role="dialog"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
          <h2 className="text-2xl font-semibold">Screen Payment Details</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={closeModal}
            aria-label="Close modal"
            className="text-gray-400 hover:text-red-400"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="space-y-8">
          {/* Info Sections */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            {/* Customer Info */}
            <section>
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
                Customer Information
              </h3>
              <p>
                <strong>Name:</strong>{" "}
                {selectedPayment.user.first_name} {selectedPayment.user.last_name}
              </p>
              <p>
                <strong>Email:</strong> {selectedPayment.user.email}
              </p>
              <p>
                <strong>User ID:</strong> {selectedPayment.user.id}
              </p>
            </section>

            {/* Payment Info */}
            <section>
              <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
                Payment Information
              </h3>
              <p>
                <strong>ID:</strong> {selectedPayment.id}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedPayment.transactionId}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedPayment.amount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedPayment.status === "success"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-yellow-600/20 text-yellow-400"
                  }`}
                >
                  {selectedPayment.status}
                </span>
              </p>
              <p>
                <strong>Purchased:</strong>{" "}
                {new Date(selectedPayment.createdAt).toLocaleString()}
              </p>
            </section>
          </div>

          {/* Screens */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Screens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(selectedPayment.screens || []).map((screen: any) => (
                <div
                  key={screen.id}
                  className="p-4 border border-slate-700 rounded-lg space-y-3"
                >
                  <h4 className="text-sm font-semibold">{screen.screen_name}</h4>

                  {/* Carousel for images */}
                  <Carousel className="w-full relative">
                    <CarouselContent className="p-0">
                      {screen.imageUrls?.length > 0 ? (
                        screen.imageUrls.map(
                          (imgUrl: any, index: number) => (
                            <CarouselItem key={index}>
                              <div className="p-1">
                                <img
                                  src={imgUrl.url}
                                  alt={`${screen.screen_name}-${index}`}
                                  className="w-full h-40 object-cover rounded-lg"
                                />
                              </div>
                            </CarouselItem>
                          )
                        )
                      ) : (
                        <CarouselItem>
                          <div className="flex items-center justify-center h-40 bg-slate-800 rounded-lg">
                            <span className="text-slate-400">No images</span>
                          </div>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    {screen.imageUrls?.length > 1 && (
                      <>
                        <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 z-10" />
                        <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 z-10" />
                      </>
                    )}
                  </Carousel>

                  <p className="text-sm text-gray-300">{screen.location}</p>
                  <p className="text-sm text-gray-400">
                    Size: {screen.screen_size}
                  </p>
                  <p className="text-sm text-gray-400">
                    Price: ${screen.price} / day
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Uploaded Contents */}
          <section>
            <h3 className="text-xl font-semibold text-[#38B6FF] mb-4">
              Uploaded Contents
            </h3>
            {selectedPayment.contentUrls?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPayment.contentUrls.map(
                  (url: string, index: number) => (
                    <div
                      key={index}
                      className="border border-slate-700 rounded-lg p-4 bg-slate-800/50"
                    >
                      {isVideo(url) ? (
                        <video
                          controls
                          className="w-full h-48 object-cover rounded-lg"
                        >
                          <source src={url} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={url}
                          alt={`Content ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-gray-400">No content uploaded</p>
            )}
          </section>

          {/* Close Button */}
          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={closeModal}
              className="border border-blue-500 px-4 py-2 rounded-lg hover:text-red-400"
            >
              Close
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  UserScreenPaymentDetailsModal;
