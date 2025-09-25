"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import {
  useGetAllBundleCampaignQuery,
} from "@/store/api/Campaign/campaignApi";
import CommonStatus from "@/common/CommonStatus";
import Pagination from "@/components/Pagination";
import Loading from "@/common/MapLoading";
import BundleCampaignDetailsModal from "./BundleCampaignDetailsModal";

export default function AdminBundleCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllBundleCampaignQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  });
 


  const campaigns = data?.data?.data || [];
  console.log({campaigns})
  const meta = data?.data?.meta;
const TotalPages = meta?.totalPages - 1 || 1;
  // const totalPages = Math.ceil(campaigns.length / ITEMS_PER_PAGE);
 
  const currentData = campaigns;
  console.log("🚀 ~ AdminCampaignManagement ~ currentData:", currentData);

  // const hasNextPage = page < totalPages;
  // const hasPrevPage = page > 1;

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);


  const openApproveModal = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsApproveModalOpen(true);
  };

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedCampaign(null);
  };



  if (isLoading) {
    return <Loading />;
  }




  return (
    <div>
       <div className="p-6 space-y-6">
        <h1 className="text-xl md:text-2xl font-semibold text-white my-3">
          Bundle Campaigns
        </h1>

        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="rounded-lg border border-[#11214D] bg-bg-dashboard">
            <table className="min-w-full divide-y divide-slate-800/40">
              <thead>
                <tr className="text-left text-[#38B6FF]">
                  <th className="py-3 px-4">Bundle Name</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Approved By</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Start Date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign: any) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                  >
                    <td className="py-3 px-4">{campaign?.bundle?.bundle_name}</td>
                    <td className="py-3 px-4">
                      {campaign.customer?.first_name}{" "}
                      {campaign.customer?.last_name}
                    </td>
                    <td className="py-3 px-4">
                      <CommonStatus status={campaign.status} />
                    </td>
                    <td className="py-3 px-4">System Auto</td>
                    <td className="py-3 px-4">
                      ${campaign?.payment?.amount}
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
                      {/* <p>|</p> */}
                      {/* <Trash2
                        className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:text-red-500"
                        onClick={() => openDeleteModal(campaign)}
                      /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {currentData.map((campaign: any) => (
            <Card
              key={campaign.id}
              className="bg-bg-dashboard border-[#11214D]"
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[#AEB9E1] font-medium text-sm">
                        {campaign.bundle?.bundle_name}
                      </h3>
                      <p className="text-[#AEB9E1]/70 text-xs mt-1">
                        {campaign.payment?.user?.first_name}{" "}
                        {campaign.payment?.user?.last_name}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium">
                      {campaign.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#AEB9E1]/50">Budget:</span>
                      <span className="text-[#AEB9E1] ml-1">
                        ${campaign.payment?.amount}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#AEB9E1]/50">Spent:</span>
                      <span className="text-[#AEB9E1] ml-1">N/A</span>
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
        <BundleCampaignDetailsModal
          isOpen={isApproveModalOpen}
          onClose={closeApproveModal}
          campaign={selectedCampaign}
        />

        {/* Delete Modal */}
        {/* <DeleteCampaignModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          campaign={selectedCampaign}
        /> */}
              </div>
      
         </div>
         
  );
}
