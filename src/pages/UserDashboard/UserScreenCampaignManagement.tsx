
import { useState } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { useGetMyselfAllCustomCampaignQuery } from "@/store/api/Campaign/campaignApi";
import CommonStatus from "@/common/CommonStatus";
import Loading from "@/common/MapLoading";
import ScreenCampaignDetailsModal from "../../common/ScreenCampaignDetailsModal";
import DeleteCampaignModal from "../AdminDashboard/DeleteCampaignModal";
import Pagination from "@/components/Pagination";

export default function UserScreenCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: customData, isLoading: isCustomLoading } =
    useGetMyselfAllCustomCampaignQuery({
      page: currentPage.toString(),
      searchTerm: searchTerm,
    });

  const customCampaignData = customData?.data?.data || [];

  // Modal States
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const meta = customData?.data?.meta;
const TotalPages = meta?.totalPages  || 1;
  const openApproveModal = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedCampaign(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCampaign(null);
  };

  if (isCustomLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl md:text-2xl font-semibold text-white my-3">
        Screen Campaigns
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-[#11214D] bg-bg-dashboard">
          <table className="min-w-full divide-y divide-slate-800/40">
            <thead>
              <tr className="text-left text-[#38B6FF]">
                <th className="py-3 px-4">Total Screens</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">End Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customCampaignData.map((campaign: any) => (
                <tr
                  key={campaign.id}
                  className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                >
                  <td className="py-3 px-4">{campaign.screens?.length ?? 0}</td>
                  <td className="py-3 px-4">
                    {campaign.customer?.first_name}{" "}
                    {campaign.customer?.last_name}
                  </td>
                  <td className="py-3 px-4">
                    <CommonStatus status={campaign.status} />
                  </td>
                  <td className="py-3 px-4">
                    {campaign.CustomPayment?.[0]?.status === "success"
                      ? "Paid"
                      : "Unpaid"}
                  </td>
                  <td className="py-3 px-4">
                    ${campaign.CustomPayment?.[0]?.amount ?? 0}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(campaign.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(campaign.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <Eye
                      className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:scale-125"
                      onClick={() => openApproveModal(campaign)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {customCampaignData.map((campaign: any) => (
          <Card key={campaign.id} className="bg-bg-dashboard border-[#11214D]">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#AEB9E1] font-medium text-sm">
                      {campaign.customer?.first_name}{" "}
                      {campaign.customer?.last_name}
                    </h3>
                    <p className="text-[#AEB9E1]/70 text-xs mt-1">
                      {campaign.customer?.email}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-[#38B6FF]">
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#AEB9E1]/50">Budget:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      ${campaign.CustomPayment?.[0]?.amount ?? 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">Payment:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {campaign.CustomPayment?.[0]?.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">Start:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {new Date(campaign.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">End:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openApproveModal(campaign)}
                  className="text-[#38B6FF] text-sm mt-2"
                >
                  View Details
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={TotalPages}
            onPageChange={setCurrentPage}
          />
        </div>

      {/* Approve Modal */}
      <ScreenCampaignDetailsModal
        isOpen={isApproveModalOpen}
        onClose={closeApproveModal}
        campaign={selectedCampaign}
      />

      {/* Delete Modal */}
      <DeleteCampaignModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        campaign={selectedCampaign}
      />
    </div>
  );
}
