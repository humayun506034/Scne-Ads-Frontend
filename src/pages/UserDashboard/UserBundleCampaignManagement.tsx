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
import { useGetMyselfAllBundleCampaignQuery } from "@/store/api/Campaign/campaignApi";
import { motion } from "framer-motion";
import BundleCampaignDetailsModal from "../../common/BundleCampaignDetailsModal";

export default function UserBundleCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  // replace date objects with year strings
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);

  // current year ±2 for options
  const yearOptions = useMemo(() => {
    const now = new Date().getFullYear();
    const start = now - 2;
    const end = now + 2;

    const arr: { label: string; value: string }[] = [];
    for (let y = end; y >= start; y--)
      arr.push({ label: String(y), value: String(y) });
    return arr;
  }, []);

  // ensure "All" exists in Duration
  const newDuration = useMemo(() => {
    const d = [...Duration];
    if (!d.find((x) => x.value === "all"))
      d.push({ label: "All", value: "all" });
    return d;
  }, []);

  // --- Formatting helper (the one you asked for) ---
  const formatYearForApi = (year: string, kind: "start" | "end") => {
    if (!year) return null;
    if (kind === "start") return `${year}-01-01T00:00:00.000Z`;
    return `${year}-12-31T23:59:59.999Z`;
  };

  // Build query params
  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };
  const startDateIso = formatYearForApi(startYear, "start");
  const endDateIso = formatYearForApi(endYear, "end");
  if (startDateIso) queryParams.startDate = startDateIso;
  if (endDateIso) queryParams.endDate = endDateIso;
  if (dateFilter) queryParams.dateFilter = dateFilter;

  const { data, isLoading } = useGetMyselfAllBundleCampaignQuery(queryParams);
  const campaigns = data?.data?.data || [];
  const meta = data?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

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

  return (
    <div className="">
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white mb-3 border-b border-[#11214D] pb-3">
          Bundle Campaigns
        </h1>

        {/* Filters UI (using CommonSelect) */}
        <div className="rounded-2xl border border-[#11214D] bg-[#0C1328]/40 p-4">
          <div className="flex  flex-col md:flex-row  justify-between  gap-4 items-center">
            {/* Start Year */}
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
              <div className="">
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

            {/* Quick Presets + Clear */}
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

        {/* (The rest of your table/mobile UI remains unchanged) */}
        {isLoading ? (
          <div className="flex items-center justify-center py-10 text-[#AEB9E1]">
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
                        <th className="py-3 px-5 text-left">Bundle Name</th>
                        <th className="py-3 px-5 text-left">Status</th>
                        <th className="py-3 px-5 text-left">IsUploaded</th>
                        <th className="py-3 px-5 text-left">Price</th>
                        <th className="py-3 px-5 text-left whitespace-nowrap">
                          Start Date
                        </th>
                        <th className="py-3 px-5 text-left whitespace-nowrap">
                          End Date
                        </th>
                        <th className="py-3 px-5 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {campaigns.map((c: any, idx: number) => (
                        <tr
                          key={c.id}
                          className={`text-[#AEB9E1] transition-colors ${
                            idx % 2 === 1 ? "bg-white/[0.02]" : ""
                          } hover:bg-white/5`}
                        >
                          <td className="py-3 px-5">{c.bundle?.bundle_name}</td>
                          <td className="py-3 px-5">
                            <CommonStatus status={c.bundle?.status} />
                          </td>
                          <td className="py-3 px-5 text-white">
                            {c?.isUploaded ? "Uploaded" : "Not Uploaded"}
                          </td>
                          <td className="py-3 px-5">
                            $
                            {c?.payment?.amount?.toLocaleString?.() ??
                              c?.payment?.amount ??
                              0}
                          </td>
                          <td className="py-3 px-5 whitespace-nowrap">
                            {new Date(c.startDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-5 whitespace-nowrap">
                            {new Date(c.endDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-5">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedCampaign(c);
                                setIsApproveModalOpen(true);
                              }}
                              className="  rounded-md px-3 py-1.5  text-[#38B6FF]  cursor-pointer"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </tr>
                      ))}
                      {campaigns.length === 0 && (
                        <tr>
                          <td
                            colSpan={7}
                            className="py-10 px-5 text-center text-slate-400"
                          >
                            No campaigns found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {campaigns.map((c: any) => (
                <Card
                  key={c.id}
                  className="bg-gradient-to-b from-[#0C1328] to-[#0A1023] border border-[#11214D] rounded-2xl shadow-[0_0_20px_rgba(34,197,244,0.08)]"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-[#E2E8F0] font-semibold text-sm leading-5 pr-2">
                        {c.bundle?.bundle_name || "Unnamed Bundle"}
                      </h3>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-white/10 text-white">
                        {c.status}
                      </span>
                    </div>

                    <div className="mt-3 h-px bg-white/5" />

                    <div className="mt-3 grid grid-cols-1 gap-2 text-[13px] text-[#AEB9E1]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#AEB9E1]/60">Budget</span>
                        <span className="font-medium">
                          $
                          {c?.payment?.amount?.toLocaleString?.() ??
                            c?.payment?.amount ??
                            0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#AEB9E1]/60">Start</span>
                        <span>
                          {new Date(c.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#AEB9E1]/60">End</span>
                        <span>{new Date(c.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedCampaign(c);
                        setIsApproveModalOpen(true);
                      }}
                      className="  rounded-md px-3 py-1.5 w-full mt-6 text-sm  bg-title-color  cursor-pointer"
                      title="View"
                    >
                      View
                    </motion.button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={TotalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modal */}
        <BundleCampaignDetailsModal
          isOpen={isApproveModalOpen}
          onClose={closeApproveModal}
          campaign={selectedCampaign}
        />
      </div>
    </div>
  );
}
