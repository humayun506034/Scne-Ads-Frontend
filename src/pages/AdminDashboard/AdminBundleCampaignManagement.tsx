/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CalendarDays, CheckCircle, Eye } from "lucide-react";
import { useMemo, useState } from "react";

import CommonSelect from "@/common/CommonSelect";
import CommonStatus from "@/common/CommonStatus";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { Duration } from "@/lib/Data";
import { useGetAllBundleCampaignQuery } from "@/store/api/Campaign/campaignApi";
import { useMarkCustomCampaignUploadedMutation } from "@/store/api/User/isUploaded";
import BundleCampaignDetailsModal from "../../common/BundleCampaignDetailsModal";

export default function AdminBundleCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // same year options as user page
  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    const start = now - 2;
    const end = now + 2;

    const arr: { label: string; value: string }[] = [];
    for (let y = end; y >= start; y--)
      arr.push({ label: String(y), value: String(y) });
    return arr;
  }, []);

  const newDuration = useMemo(() => {
    const d = [...Duration];
    if (!d.find((x) => x.value === "all"))
      d.push({ label: "All", value: "all" });
    return d;
  }, []);

  const formatYearForApi = (year: string, kind: "start" | "end") => {
    if (!year) return null;
    if (kind === "start") return `${year}-01-01T00:00:00.000Z`;
    return `${year}-12-31T23:59:59.999Z`;
  };

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };
  const startDateIso = formatYearForApi(startYear, "start");
  const endDateIso = formatYearForApi(endYear, "end");
  if (startDateIso) queryParams.startDate = startDateIso;
  if (endDateIso) queryParams.endDate = endDateIso;
  if (dateFilter) queryParams.dateFilter = dateFilter;

  const { data, isLoading } = useGetAllBundleCampaignQuery(queryParams);
  const campaigns = data?.data?.data || [];
  const meta = data?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [markUploaded] = useMarkCustomCampaignUploadedMutation();
  const [uploadedIds, setUploadedIds] = useState<string[]>([]);

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedCampaign(null);
  };

  const handleDateFilterClick = (filter: string) => {
    setDateFilter(filter);
    setStartYear("");
    setEndYear("");
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setStartYear("");
    setEndYear("");
    setDateFilter(null);
    setCurrentPage(1);
  };

  const handleMarkUploaded = async (campaignId: string) => {
    try {
      await markUploaded(campaignId).unwrap();
      setUploadedIds((prev) => [...prev, campaignId]);
    } catch (err) {
      console.error(err);
      alert("Failed to mark as uploaded.");
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div>
      <div className="p-6 space-y-6 md:mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium text-[#AEB9E1] mb-6 lg:mb-8 relative">
          All Bundle Campaigns
        </h2>

        {/* --- Filter Section copied from UserBundleCampaignManagement --- */}
        <div className="rounded-2xl border border-[#11214D] bg-[#0C1328]/40 p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
            {/* Start & End Year Selectors */}
            <div className="md:col-span-4 md:space-y-0 space-y-2 md:flex flex-col md:flex-row w-full md:w-fit justify-start gap-4 items-center">
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Select Start Year
                </label>
                <CommonSelect
                  Value={startYear || "Select Year"}
                  options={yearOptions}
                  setValue={(val) => {
                    setStartYear(String(val));
                    setDateFilter(null);
                    setCurrentPage(1);
                  }}
                  Icon={CalendarDays}
                  className="bg-[#0F1A39] border border-[#11214D]"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">
                  Optional - Set End Year
                </label>
                <CommonSelect
                  Value={endYear || "Select Year"}
                  options={yearOptions}
                  setValue={(val) => {
                    setEndYear(String(val));
                    setDateFilter(null);
                    setCurrentPage(1);
                  }}
                  Icon={CalendarDays}
                  className="bg-[#0F1A39] border border-[#11214D]"
                />
              </div>
            </div>

            {/* Duration Buttons + Clear */}
            <div className="md:col-span-4">
              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                {newDuration.map(({ label, value }) => (
                  <button
                    key={value}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition
                    ${
                      dateFilter === value
                        ? "bg-[#38B6FF] text-black shadow-[0_0_18px_rgba(56,182,255,0.35)]"
                        : "bg-[#0F1A39] text-white/90 border border-[#11214D] hover:bg-white/10"
                    }`}
                    onClick={() => handleDateFilterClick(value)}
                  >
                    {label}
                  </button>
                ))}
                <button
                  className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-rose-600/90 text-white hover:bg-rose-600 transition"
                  onClick={handleClearFilters}
                >
                  Clear
                </button>
              </div>

              <div className="flex justify-end">
                {(startYear || endYear || dateFilter) && (
                  <div className="mt-4 flex justify-center items-center gap-2 text-xs text-title-color">
                    <p className="opacity-70">Active filter :</p>
                    <p className="inline-block px-2 py-1 rounded-md bg-white/5 border border-white/10">
                      {dateFilter
                        ? `Preset – ${dateFilter}`
                        : `${startYear || "—"} → ${endYear || "—"}`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* --- End Filter Section --- */}

        {/* Desktop Table (unchanged) */}
        <div className="hidden md:block">
          <div className="rounded-lg border border-[#11214D] bg-bg-dashboard">
            <table className="min-w-full divide-y divide-slate-800/40">
              <thead>
                <tr className="text-left text-[#38B6FF]">
                  <th className="py-3 px-4">Bundle Name</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Is Uploaded</th>
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
                    <td className="py-3 px-4">
                      {campaign.isUploaded ? "True" : "False"}
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
                        className="w-6 h-6 text-[#38B6FF] cursor-pointer hover:scale-125"
                        onClick={() => {
                          setSelectedCampaign(campaign);
                          setIsApproveModalOpen(true);
                        }}
                      />
                      <CheckCircle
                        className={`w-6 h-6 cursor-pointer ${
                          uploadedIds.includes(campaign.id) ||
                          campaign.isUploaded
                            ? "text-gray-500 cursor-not-allowed"
                            : "text-green-500 hover:scale-125"
                        }`}
                        onClick={() => {
                          if (
                            !campaign.isUploaded &&
                            !uploadedIds.includes(campaign.id)
                          ) {
                            handleMarkUploaded(campaign.id);
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center md:justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={TotalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modal */}
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
