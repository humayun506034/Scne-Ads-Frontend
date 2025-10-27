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

  // ✅ Date Filter States
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // ✅ Build query params
  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
    searchTerm,
  };

  if (startDate) queryParams.startDate = `${startDate}T00:00:00.000Z`;
  if (endDate) queryParams.endDate = `${endDate}T00:00:00.000Z`;
  if (dateFilter) queryParams.dateFilter = dateFilter;

  const { data: customData, isLoading: isCustomLoading } =
    useGetMyselfAllCustomCampaignQuery(queryParams);
  console.log(customData);

  const customCampaignData = customData?.data?.data || [];
  const meta = customData?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  // Modal States
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

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

  // ✅ Handlers for date filters
  const handleDateFilterClick = (filter: string) => {
    setDateFilter(filter);
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setDateFilter(null);
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

  if (isCustomLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white my-6 border-b  border-[#11214D] pb-2">
        Screen Campaigns
      </h1>

      <div className="flex flex-wrap items-center gap-16 my-8">
        {/* Dates Button */}
        <div className="flex items-center gap-2 px-5 py-4 bg-[#11214D] text-white rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#38B6FF] cursor-pointer"
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
          <span className="  font-medium">Dates</span>
        </div>

        {/* Start Date Input */}
       <div className="flex gap-6">

       <div className="flex items-center gap-2 bg-[#11214D] px-5 py-4 rounded-md text-white">
          <span className=" font-medium whitespace-nowrap">
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
          <span className=" font-medium whitespace-nowrap">
            Optional - Set End Date
          </span>
          <input
            type="date"
            value={endDate || ""}
            onChange={handleEndDateChange}
            className="bg-transparent outline-none text-white placeholder:text-slate-400 "
          />
        </div>




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
              className={`px-6 py-3 rounded-full cursor-pointer font-medium transition ${
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
            className="px-4 py-2 rounded-full text-sm font-medium bg-red-600 text-white cursor-pointer"
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
                <th className="py-3 px-4">Screen Name</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Resolution</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Availability</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customCampaignData.map((campaign: any) =>
                campaign.screens?.map((screen: any) => (
                  <tr
                    key={screen.id}
                    className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                  >
                    <td className="py-3 px-4">{screen.screen_name}</td>
                    <td className="py-3 px-4">{screen.location}</td>
                    <td className="py-3 px-4">{screen.screen_size}</td>
                    <td className="py-3 px-4">{screen.resolution}</td>
                    <td className="py-3 px-4">${screen.price}</td>
                    <td className="py-3 px-4">{screen.availability}</td>
                    <td className="py-3 px-4">
                      <CommonStatus status={campaign.status} />
                    </td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <Eye
                        className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:scale-125"
                        onClick={() => openApproveModal(campaign)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {customCampaignData.map((campaign: any) =>
          campaign.screens?.map((screen: any) => (
            <Card key={screen.id} className="bg-bg-dashboard border-[#11214D]">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[#AEB9E1] font-medium text-sm">
                        {screen.screen_name}
                      </h3>
                      <p className="text-[#AEB9E1]/70 text-xs mt-1">
                        {screen.location}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-[#38B6FF]">
                      {campaign.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[#AEB9E1]/50">Size:</span>
                      <span className="text-[#AEB9E1] ml-1">{screen.screen_size}</span>
                    </div>
                    <div>
                      <span className="text-[#AEB9E1]/50">Resolution:</span>
                      <span className="text-[#AEB9E1] ml-1">{screen.resolution}</span>
                    </div>
                    <div>
                      <span className="text-[#AEB9E1]/50">Price:</span>
                      <span className="text-[#AEB9E1] ml-1">${screen.price}</span>
                    </div>
                    <div>
                      <span className="text-[#AEB9E1]/50">Availability:</span>
                      <span className="text-[#AEB9E1] ml-1">{screen.availability}</span>
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
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={TotalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modals */}
      <ScreenCampaignDetailsModal
        isOpen={isApproveModalOpen}
        onClose={closeApproveModal}
        campaign={selectedCampaign}
      />

      <DeleteCampaignModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        campaign={selectedCampaign}
      />
    </div>
  );
}
