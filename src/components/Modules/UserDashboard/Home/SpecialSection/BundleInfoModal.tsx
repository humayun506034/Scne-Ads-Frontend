import CommonDashboardButton from "@/common/CommonDashBoardButton";
import DashboardTransparentButton from "@/common/DashboardTransparentButton";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  HiClock,
  HiCollection,
  HiLink,
  HiRefresh,
  HiTag,
  HiTrendingUp,
  HiX,
} from "react-icons/hi";
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
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <Dialog.Content className="fixed z-50 inset-0 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-lg bg-bg-dashboard/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative text-white shadow-[0_10px_40px_rgba(0,0,0,0.45)] overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <motion.button
                whileTap={{
                  scale: 0.8,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                onClick={onClose}
                className="absolute cursor-pointer top-4 right-4 text-title-color hover:text-white transition rounded-full p-2 hover:bg-white/5 ring-1 ring-white/10"
              >
                <HiX className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <div className="mb-5">
                <div className="flex items-start justify-between gap-3">
                  <Dialog.Title className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {bundle.bundle_name}
                  </Dialog.Title>
                </div>
              </div>

              {/* Image and Info */}
              <div className="flex flex-col gap-6">
                {/* Image */}
                <div className="w-full relative rounded-xl overflow-hidden ring-1 ring-white/10">
                  <img
                    src={bundle.img_url}
                    alt={bundle.bundle_name}
                    className="w-full h-64 md:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <span
                    className={`absolute bottom-3 right-3 inline-flex items-center gap-2 px-3 py-3 capitalize   text-white rounded-full text-xs md:text-sm font-medium border ${
                      bundle.status === "ongoing"
                        ? "bg-black/30 border-green-400/20"
                        : "bg-black/30 border-gray-400/20"
                    }`}
                  >
                    <HiTrendingUp className="h-4 w-4" /> {bundle.status}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex text-lg items-center gap-2 px-3 py-1.5 rounded-lg bg-black/30 backdrop-blur-md ring-1 ring-white/15 text-green-400 font-semibold">
                      <HiTag className="h-4 w-4" /> ${bundle.price}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="w-full text-title-color">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 ring-1 ring-white/10">
                      <HiClock className="h-5 w-5 text-blue-300" />
                      <div className="text-sm">
                        <span className="text-white font-medium">
                          Duration:
                        </span>{" "}
                        {bundle.duration}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 ring-1 ring-white/10">
                      <HiCollection className="h-5 w-5 text-purple-300" />
                      <div className="text-sm">
                        <span className="text-white font-medium">
                          Total Screens:
                        </span>{" "}
                        {bundle.screens?.length || 0}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 ring-1 ring-white/10">
                      <HiTrendingUp className="h-5 w-5 text-amber-300" />
                      <div className="text-sm">
                        <span className="text-white font-medium">
                          Total Bought:
                        </span>{" "}
                        {bundle.totalNumberOfBuy || 0}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 ring-1 ring-white/10">
                      <HiLink className="h-5 w-5 text-teal-300" />
                      <div className="text-sm">
                        <span className="text-white font-medium">Slug:</span>{" "}
                        {bundle.slug || "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3 ring-1 ring-white/10 sm:col-span-2">
                      <HiRefresh className="h-5 w-5 text-cyan-300" />
                      <div className="text-sm">
                        <span className="text-white font-medium">Updated:</span>{" "}
                        {bundle.updatedAt
                          ? new Date(bundle.updatedAt).toLocaleString()
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full pt-2 bg-gradient-to-t from-bg-dashboard/90 to-transparent">
                  <div className="flex flex-col-reverse md:flex-row  gap-4 justify-between">
                    <DashboardTransparentButton
                      title="Cancel"
                      onClick={onClose}
                    />
                    <CommonDashboardButton
                      className="w-full md:w-auto"
                      title="Buy This Bundle"
                      onClick={() => {
                        setOpenPurchaseModal(true);
                       
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Purchase Bundle Modal with bundle ID passed */}
      <PurchaseBundleDialog
      bundleId={bundle.id}
        open={openPurchaseModal}
        setOpen={setOpenPurchaseModal}
        // bundleId={bundle.id}
      />
    </>
  );
};

export default BundleInfoModal;
