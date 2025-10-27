"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useState } from "react";

import CommonStatus from "@/common/CommonStatus";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { useGetAllBundleCampaignQuery } from "@/store/api/Campaign/campaignApi";
import BundleCampaignDetailsModal from "../../common/BundleCampaignDetailsModal";

export default function AdminBundleCampaignManagement() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };

  if (startDate) {
    queryParams.startDate = `${startDate}T00:00:00.000Z`;
  }

  if (endDate) {
    queryParams.endDate = `${endDate}T00:00:00.000Z`;
  }

  if (dateFilter) {
    queryParams.dateFilter = dateFilter;
  }

  const { data, isLoading } = useGetAllBundleCampaignQuery(queryParams);

  const campaigns = data?.data?.data || [];
  const meta = data?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  const currentData = campaigns;

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

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setDateFilter(null);
    setCurrentPage(1);
  };

  const handleDateFilterClick = (filter: string) => {
    setDateFilter(filter);
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setDateFilter(null);
    setCurrentPage(1);
  };

  
  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setDateFilter(null);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-6 space-y-6 md:mt-10">
         <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium m text-[#AEB9E1] mb-6 lg:mb-8 relative">
    All Bundle Campaigns 
  </h2>


        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Dates Button */}
          <div className="flex items-center gap-2 px-5 py-2 bg-[#11214D] text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#38B6FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm font-medium">Dates</span>
          </div>

          {/* Start Date Input */}
          <div className="flex items-center gap-2 bg-[#11214D] px-4 py-2 rounded-md text-white">
            <span className="text-sm font-medium whitespace-nowrap">
              Select Start Date
            </span>
            <input
              type="date"
              value={startDate || ""}
              onChange={handleStartDateChange}
              className="bg-transparent outline-none text-white placeholder:text-slate-400"
            />
          </div>

          {/* End Date Input */}
          <div className="flex items-center gap-2 bg-[#11214D] px-4 py-2 rounded-md text-white">
            <span className="text-sm font-medium whitespace-nowrap">
              Optional - Set End Date
            </span>
            <input
              type="date"
              value={endDate || ""}
              onChange={handleEndDateChange}
              className="bg-transparent outline-none text-white placeholder:text-slate-400"
            />
          </div>

          {/* Predefined Date Filters */}
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Today", value: "today" },
              { label: "1D", value: "1d" },
              { label: "7D", value: "7d" },
              { label: "15D", value: "15d" },
              { label: "1Mo", value: "30d" },
            ].map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  dateFilter === value
                    ? "bg-[#38B6FF] text-black"
                    : "bg-[#11214D] text-white"
                }`}
                onClick={() => handleDateFilterClick(value)}
              >
                {label}
              </button>
            ))}

            {/* Clear Button */}
            <button
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-600 text-white"
              onClick={handleClearFilters}
            >
              Clear
            </button>
          </div>
        </div>

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
                    <td className="py-3 px-4">
                      {campaign?.bundle?.bundle_name}
                    </td>
                    <td className="py-3 px-4">
                      {campaign.customer?.first_name}{" "}
                      {campaign.customer?.last_name}
                    </td>
                    <td className="py-3 px-4">
                      <CommonStatus status={campaign.status} />
                    </td>
                    <td className="py-3 px-4">System Auto</td>
                    <td className="py-3 px-4">${campaign?.payment?.amount}</td>
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
          {currentData.map((campaign: any) => (
            <Card
              key={campaign.id}
              className="bg-bg-dashboard p-4 shadow-lg border border-[#11214D]"
            >
              <CardContent className="space-y-3">
                <h2 className="text-lg font-bold text-white">
                  {campaign?.bundle?.bundle_name}
                </h2>
                <p className="text-sm text-[#AEB9E1]">
                  Customer: {campaign.customer?.first_name}{" "}
                  {campaign.customer?.last_name}
                </p>
                <p className="text-sm text-[#AEB9E1]">
                  Status: <CommonStatus status={campaign.status} />
                </p>
                <p className="text-sm text-[#AEB9E1]">
                  Start Date:{" "}
                  {new Date(campaign.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-[#AEB9E1]">
                  End Date: {new Date(campaign.endDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => openApproveModal(campaign)}
                  className="px-4 py-2 text-sm bg-[#38B6FF] text-white rounded-md"
                >
                  View Details
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
     <div className="flex justify-center md:justify-end">
         <Pagination
          currentPage={currentPage}
          totalPages={TotalPages}
          onPageChange={setCurrentPage}
        />
     </div>
      </div>

      {/* Modal for Campaign Details */}
      {isApproveModalOpen && (
        <BundleCampaignDetailsModal
          isOpen={isApproveModalOpen}
          onClose={closeApproveModal}
          campaign={selectedCampaign}
        />
      )}
    </div>
  );
}
