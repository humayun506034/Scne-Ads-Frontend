import React from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";


interface CampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    name: string;
    advertiser: string;
    status: string;
    actionedBy: string;
    budget: string;
    spent: string;
    startDate: string;
    endDate: string;
  } | null;
}

const DeleteCampaignModal: React.FC<CampaignDetailsModalProps> = ({
  isOpen,
  onClose,
  campaign,
}) => {
  if (!isOpen || !campaign) return null;

  // reject button
  const RejectButton = ({
    title,
    Icon,
    onClick,
    className = "",
  }: {
    title: string;
    Icon?: any;
    className?: string;
    onClick?: () => void;
  }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        onClick={onClick}
        className={`bg-[#16294E] text-white font-medium text-sm xl:text-base xl:w-fit w-full px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex justify-center items-center gap-2 ${className}`}
      >
        {title}
        {Icon && <Icon className="w-4 h-4 text-white" />}
      </motion.button>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-[#0B162E] rounded-2xl w-full max-w-3xl shadow-2xl border border-[#1c2c55] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-12 py-8 border-b border-[#1c2c55]">
          <h1 className="font-normal text-3xl">Campaign Details</h1>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#AEB9E1] hover:text-red-400 cursor-pointer transition" />
          </button>
        </div>

        {/* Body */}
        <Card className="bg-transparent border-0 shadow-none p-12">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 p-0">
            {/* Left Section */}
            <div>
              <div className="pb-4">
                <h3 className="text-lg font-medium text-[#ffffff]">
                  Campaign Name
                </h3>
                <p className="text-base text-[#AEB9E1]">{campaign.name}</p>
              </div>
              <div className="pb-4">
                <p className="text-lg text-[#ffffff]">Advertiser:</p>
                <p className="text-[#AEB9E1] text-base">
                  {campaign.advertiser}
                </p>
              </div>
              <div className="pb-4">
                <p className="text-lg text-[#ffffff]">Status:</p>
                <p className="text-[#AEB9E1] text-base">{campaign.status}</p>
              </div>
              <div className="pb-4">
                <span className="text-[#ffffff] text-lg">Budget:</span>
                <p className="text-[#AEB9E1] text-base">{campaign.budget}</p>
              </div>
              <div className="pb-4">
                <span className="text-[#ffffff] text-lg">Spent:</span>
                <p className="text-[#AEB9E1] text-base">{campaign.spent}</p>
              </div>
            </div>
            {/* Right Section */}
            <div>
              <div className="pb-4">
                <p className="text-[#ffffff] text-lg">Start Date:</p>
                <p className="text-[#AEB9E1] text-base">{campaign.startDate}</p>
              </div>
              <div className="pb-4">
                <p className="text-[#ffffff] text-lg">End Date:</p>
                <p className="text-[#AEB9E1] text-base">{campaign.endDate}</p>
              </div>
              <div className="w-full my-2 flex justify-center items-center bg-[#11214D] rounded-xl overflow-hidden">
                <img
                  src="/src/assets/AdminPanel/campaign-details-card-details-image.png"
                  alt={campaign.name}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </CardContent>
          <div className="flex justify-end gap-5">
            <RejectButton title="Delete" />
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default DeleteCampaignModal;
