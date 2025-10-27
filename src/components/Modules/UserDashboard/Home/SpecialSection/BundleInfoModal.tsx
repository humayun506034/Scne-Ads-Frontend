import CommonDashboardButton from "@/common/CommonDashBoardButton";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { HiX } from "react-icons/hi";
import PurchaseBundleDialog from "./PurchaseModal";

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

export interface Bundle {
  id: string;
  bundle_name: string;
  img_url: string;
  price: number;
  duration: string;
  status: string;
  location?: string;
  screens: Screen[];
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  totalNumberOfBuy?: number;
  isDeleted?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  bundle: Bundle | null;
}

const BundleInfoModal: React.FC<Props> = ({ isOpen, onClose, bundle }) => {
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);

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
                  <CommonDashboardButton
                    className="mt-6"
                    title="Buy This Bundle"
                    onClick={() => setOpenPurchaseModal(true)}
                  />
                </div>

                {/* Info */}
                <div className="w-full md:w-1/2 space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="font-medium text-white">Price:</span>{" "}
                    <span className="text-green-400">${bundle.price}</span>
                  </p>
                  <p>
                    <span className="font-medium text-white">Duration:</span>{" "}
                    {bundle.duration}
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
                    <span className="font-medium text-white">Total Screens:</span>{" "}
                    {bundle.screens?.length || 0}
                  </p>
                  <p>
                    <span className="font-medium text-white">Total Bought:</span>{" "}
                    {bundle.totalNumberOfBuy || 0}
                  </p>
                  <p>
                    <span className="font-medium text-white">Slug:</span>{" "}
                    {bundle.slug || "N/A"}
                  </p>

                  <p>
                    <span className="font-medium text-white">Created At:</span>{" "}
                    {bundle.createdAt
                      ? new Date(bundle.createdAt).toLocaleString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium text-white">Updated At:</span>{" "}
                    {bundle.updatedAt
                      ? new Date(bundle.updatedAt).toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Purchase Bundle Modal with bundle ID passed */}
      <PurchaseBundleDialog
        open={openPurchaseModal}
        setOpen={setOpenPurchaseModal}
        // bundleId={bundle.id} 
      />
    </>
  );
};

export default BundleInfoModal;
