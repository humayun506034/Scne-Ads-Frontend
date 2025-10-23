import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import CreateBundleCampaignModal from "./CreateBundleCampaignModal";

interface Screen {
  id: string;
  screen_name: string;
  img_url: string;
  location: string;
  screen_size: string;
  resolution: string;
  price: number;
  availability: string;
  status: string;
  description: string;
}

interface Bundle {
  id: string;
  bundle_name: string;
  img_url: string;
  price: number;
  duration: string;
  status: string;
  location: string;
  screens: Screen[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bundle: Bundle | null;
}


const BundleDetailsModal: React.FC<Props> = ({ isOpen, onClose, bundle }) => {
  const [createCampaignOpen, setCreateCampaignOpen] = useState(false);

  if (!bundle) return null;

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
          {/* Backdrop */}
          <Dialog.Overlay className="fixed inset-0 bg-black/60 z-40" />

          {/* Modal Content */}
          <Dialog.Content className="fixed z-50 inset-0 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-3xl bg-[#111827] border border-gray-700 rounded-lg p-6 relative text-white shadow-2xl overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <HiX className="w-6 h-6" />
              </button>

              {/* Header */}
              <Dialog.Title className="text-2xl font-bold mb-4">
                {bundle.bundle_name}
              </Dialog.Title>

              {/* Image and Info */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={bundle.img_url || "/placeholder.svg"}
                    alt={bundle.bundle_name}
                    className="rounded-lg w-full h-48 object-cover border border-gray-700"
                  />
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2 space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="font-medium text-white">Price:</span> <span className="text-green-400">${bundle.price}</span> Just One Time Only For This Bundle
                  </p>
                  <p>
                    <span className="font-medium text-white">Duration:</span> {bundle.duration}
                  </p>
                  <p>
                    <span className="font-medium text-white">Status:</span>{" "}
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        bundle.status === "ongoing"
                          ? "bg-green-600/20 text-green-300"
                          : "bg-gray-600/20 text-gray-300"
                      }`}
                    >
                      {bundle.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-white">Location:</span> {bundle.location}
                  </p>
                  <p>
                    <span className="font-medium text-white">Total Screens:</span>{" "}
                    {bundle.screens?.length || 0}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-6 border-gray-700" />

              {/* Screens Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Included Screens</h3>
                {bundle.screens?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bundle.screens.map((screen) => (
                      <div
                        key={screen.id}
                        className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-2"
                      >
                        {/* Image + Name */}
                        <div className="flex items-center gap-4">
                          <img
                            src={screen.img_url}
                            alt={screen.screen_name}
                            className="w-16 h-16 object-cover rounded-md border border-gray-600"
                          />
                          <div>
                            <p className="text-white font-medium text-sm">{screen.screen_name}</p>
                            <p className="text-gray-400 text-xs">📍 {screen.location}</p>
                          </div>
                        </div>

                        {/* More Info */}
                        <div className="text-xs text-gray-300 space-y-1">
                          <p>
                            <span className="font-medium text-white">Size:</span> {screen.screen_size}
                          </p>
                          <p>
                            <span className="font-medium text-white">Resolution:</span> {screen.resolution}
                          </p>
                          <p>
                            <span className="font-medium text-white">Price:</span> ${screen.price} Per Day
                          </p>
                          <p>
                            <span className="font-medium text-white">Availability:</span>{" "}
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                                screen.availability === "available"
                                  ? "bg-green-500/20 text-green-300 border border-green-400/30"
                                  : "bg-red-500/20 text-red-300 border border-red-400/30"
                              }`}
                            >
                              {screen.availability}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-white">Status:</span>{" "}
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                                screen.status === "active"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                                  : "bg-gray-600/20 text-gray-400 border border-gray-500/30"
                              }`}
                            >
                              {screen.status}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-white">Description:</span> {screen.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No screens associated with this bundle.</p>
                )}
              </div>

              {/* Create Campaign Button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setCreateCampaignOpen(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Create Campaign
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Create Campaign Modal */}
      {bundle && (
        <CreateBundleCampaignModal
          isOpen={createCampaignOpen}
          onClose={() => setCreateCampaignOpen(false)}
          bundle={bundle}
        />
      )}
    </>
  );
};

export default BundleDetailsModal;
