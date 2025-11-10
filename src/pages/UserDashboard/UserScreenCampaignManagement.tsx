/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Eye } from "lucide-react";
import { useMemo, useState } from "react";

import CommonSelect from "@/common/CommonSelect";
import CommonStatus from "@/common/CommonStatus";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { Duration } from "@/lib/Data";
import { useGetMyselfAllCustomCampaignQuery } from "@/store/api/Campaign/campaignApi";

import { motion } from "framer-motion";
import ScreenCampaignDetailsModal from "../../common/ScreenCampaignDetailsModal";
import DeleteCampaignModal from "../AdminDashboard/DeleteCampaignModal";

export default function UserScreenCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  // year-only selection (same pattern you finalized for Bundle Campaigns)
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // current year ±2 options
  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    const start = now - 2;
    const end = now + 2;
    const arr: { label: string; value: string }[] = [];
    for (let y = end; y >= start; y--) arr.push({ label: String(y), value: String(y) });
    return arr;
  }, []);

  // ensure "All" exists (object compare safe)
  const newDuration = useMemo(() => {
    const d = [...Duration];
    if (!d.find((x) => x.value === "all")) d.push({ label: "All", value: "all" });
    return d;
  }, []);

  // Format helper (same behavior as bundle)
  const formatYearForApi = (year: string, kind: "start" | "end") => {
    if (!year) return null;
    return kind === "start" ? `${year}-01-01T00:00:00.000Z` : `${year}-12-31T23:59:59.999Z`;
  };

  // Build query params
  const queryParams: Record<string, string> = { page: currentPage.toString() };
  const startDateIso = formatYearForApi(startYear, "start");
  const endDateIso = formatYearForApi(endYear, "end");
  if (startDateIso) queryParams.startDate = startDateIso;
  if (endDateIso) queryParams.endDate = endDateIso;
  if (dateFilter) queryParams.dateFilter = dateFilter;

  const { data: customData, isLoading: isCustomLoading } = useGetMyselfAllCustomCampaignQuery(queryParams);

  const customCampaignData = customData?.data?.data || [];
  const meta = customData?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  // Modals
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

  // Presets + clear (same UX as bundle)
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

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-white mb-3 border-b border-[#11214D] pb-3">
        Screen Campaigns
      </h1>

      {/* Filters (mirrors Bundle Campaign UI) */}
      <div className="rounded-2xl border border-[#11214D] bg-[#0C1328]/40 p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          {/* Start/End Year selects */}
          <div className="md:col-span-4 md:space-y-0 space-y-2 md:flex flex-col md:flex-row w-full md:w-fit justify-start gap-4 items-center">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Select Start Year</label>
              <CommonSelect
                Value={startYear || "Select Year"}
                options={yearOptions}
                setValue={(val) => {
                  setStartYear(val);
                  setDateFilter(null);
                  setCurrentPage(1);
                }}
                Icon={CalendarDays}
                className="bg-[#0F1A39] border border-[#11214D]"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Optional – Set End Year</label>
              <CommonSelect
                Value={endYear || "Select Year"}
                options={yearOptions}
                setValue={(val) => {
                  setEndYear(val);
                  setDateFilter(null);
                  setCurrentPage(1);
                }}
                Icon={CalendarDays}
                className="bg-[#0F1A39] border border-[#11214D]"
              />
            </div>
          </div>

          {/* Presets + Clear */}
          <div className="md:col-span-4">
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              {newDuration.map(({ label, value }) => (
                <button
                  key={value}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition
                  ${
                    dateFilter === value
                      ? "bg-[#38B6FF] text.black text-black shadow-[0_0_18px_rgba(56,182,255,0.35)]"
                      : "bg-[#0F1A39] text-white/90 border border-[#11214D] hover:bg.white/10 hover:bg-white/10"
                  }`}
                  onClick={() => handleDateFilterClick(value)}
                >
                  {label}
                </button>
              ))}
              <button
                className="px-4 py-2 rounded.full rounded-full text-xs sm:text-sm font-semibold bg-rose-600/90 text-white hover:bg-rose-600 transition"
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
                    {dateFilter ? `Preset – ${dateFilter}` : `${startYear || "—"} → ${endYear || "—"}`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== LOADING (centered for both desktop & mobile) ===================== */}
      {isCustomLoading ? (
        <div
          role="status"
          aria-live="polite"
          aria-busy="true"
          className="flex items-center justify-center min-h-[240px] sm:min-h-[320px] rounded-2xl border border-[#11214D] bg-[#0C1328]/40"
        >
          <Loading />
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="rounded-2xl border border-[#11214D] bg-[#0C1328]/40 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-[#0F1A39] text-[#38B6FF]">
                      <th className="py-3 px-5 text-left">Screen Name</th>
                      <th className="py-3 px-5 text-left">Location</th>
                      <th className="py-3 px-5 text-left">Size</th>
                      <th className="py-3 px-5 text-left">Resolution</th>
                      <th className="py-3 px-5 text-left">Price</th>
                      <th className="py-3 px-5 text-left">Availability</th>
                      <th className="py-3 px-5 text-left">Status</th>
                      <th className="py-3 px-5 text-left">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-800/40">
                    {customData?.data?.data?.length ? (
                      customCampaignData.flatMap((campaign: any) =>
                        (campaign.screens || []).map((screen: any, idx: number) => (
                          <tr
                            key={`${campaign.id}-${screen.id}-${idx}`}
                            className={`text-[#AEB9E1] transition-colors ${
                              idx % 2 === 1 ? "bg-white/[0.02]" : ""
                            } hover:bg-white/5`}
                          >
                            <td className="py-3 px-5">{screen.screen_name}</td>
                            <td className="py-3 px-5">{screen.location}</td>
                            <td className="py-3 px-5">{screen.screen_size}</td>
                            <td className="py-3 px-5">{screen.resolution}</td>
                            <td className="py-3 px-5">${screen.price}</td>
                            <td className="py-3 px-5">{screen.availability}</td>
                            <td className="py-3 px-5">
                              <CommonStatus status={campaign.status} />
                            </td>
                            <td className="py-3 px-5">
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => openApproveModal(campaign)}
                                className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-[#38B6FF] cursor-pointer"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                            </td>
                          </tr>
                        ))
                      )
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-10 px-5 text-center text-slate-400">
                          No campaigns found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile list */}
          <div className="md:hidden space-y-4">
            {customCampaignData.length ? (
              customCampaignData.flatMap((campaign: any) =>
                (campaign.screens || []).map((screen: any, idx: number) => (
                  <Card
                    key={`${campaign.id}-${screen.id}-${idx}`}
                    className="bg-gradient-to-b from-[#0C1328] to-[#0A1023] border border-[#11214D] rounded-2xl shadow-[0_0_20px_rgba(34,197,244,0.08)]"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-[#E2E8F0] font-semibold">{screen.screen_name}</h3>
                            <p className="text-[#AEB9E1]/70 text-xs mt-1">{screen.location}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg.white/10 bg-white/10 text-white">
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
                            <span className="text-[#AEB9E1] ml-1">${(screen.price)}</span>
                          </div>
                          <div>
                            <span className="text-[#AEB9E1]/50">Availability:</span>
                            <span className="text-[#AEB9E1] ml-1">{screen.availability}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => openApproveModal(campaign)}
                          className="bg-title-color py-2 rounded-lg cursor-pointer w-full text-sm mt-2"
                        >
                          View Details
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )
            ) : (
              <div className="flex items-center justify.center justify-center py-12 text-slate-400">
                No campaigns found.
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <Pagination currentPage={currentPage} totalPages={TotalPages} onPageChange={setCurrentPage} />
          </div>
        </>
      )}

      {/* Modals */}
      <ScreenCampaignDetailsModal isOpen={isApproveModalOpen} onClose={closeApproveModal} campaign={selectedCampaign} />
      <DeleteCampaignModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} campaign={selectedCampaign} />
    </div>
  );
}
