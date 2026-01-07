/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonHeader from "@/common/CommonHeader";
import CommonSelect from "@/common/CommonSelect";
import CommonStatus from "@/common/CommonStatus";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Duration } from "@/lib/Data";
import { useGetAllCustomCampaignQuery } from "@/store/api/Campaign/campaignApi";
import { useMarkCustomCampaignUploadedMutation } from "@/store/api/User/isUploaded";
import { ArrowUpCircle, CalendarDays, CheckCircle, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import ScreenCampaignDetailsModal from "../../common/ScreenCampaignDetailsModal";
import DeleteCampaignModal from "./DeleteCampaignModal";

export default function AdminScreenCampaignManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  // replace date objects with year strings
  const [startYear, setStartYear] = useState<string>("");
  const [endYear, setEndYear] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [uploadedIds, setUploadedIds] = useState<string[]>([]);

  const [markUploaded] = useMarkCustomCampaignUploadedMutation();

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

  // --- Formatting helper ---
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
  if (dateFilter) queryParams.dateFilter = `${dateFilter}d`;

  const { data: customData, isLoading: isCustomLoading } =
    useGetAllCustomCampaignQuery(queryParams);
  const customCampaignData = customData?.data?.data || [];
  const meta = customData?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  // Modal States
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  // Mark as Uploaded Modal State
  const [markUploadModalOpen, setMarkUploadModalOpen] = useState(false);
  const [campaignToMark, setCampaignToMark] = useState<any>(null);

  const closeApproveModal = () => {
    setIsApproveModalOpen(false);
    setSelectedCampaign(null);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
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
      toast.success("Marked as uploaded.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as uploaded.");
    }
  };

  // if (isCustomLoading) {
  //   return (
  //     <div className="min-h-screen w-full flex items-center justify-center">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 space-y-6 md:mt-10">
      <CommonHeader title="Screen Campaign Management" />

      {/* Filters UI */}
      <div className="rounded-2xl border border-[#11214D] bg-[#0C1328]/40 p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
          {/* Start/End Year Select */}
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-fit">
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

          {/* Quick Presets + Clear */}
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            {newDuration.map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
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

          {/* Active Filter Badge */}
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

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-[#11214D] bg-bg-dashboard">
          <table className="min-w-full divide-y divide-slate-800/40">
            <thead>
              <tr className="text-left text-[#38B6FF]">
                <th className="py-3 px-4">Total Screens</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Content Upload Status</th>
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
                    {campaign.isUploaded ? "Uploaded" : "Not Uploaded"}
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
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setIsApproveModalOpen(true);
                      }}
                    />

                    <button
                      className={`w-6 h-6 flex items-center justify-center rounded-full transition-transform cursor-pointer ${
                        uploadedIds.includes(campaign.id) || campaign.isUploaded
                          ? "bg-green-500 text-white cursor-not-allowed"
                          : "bg-blue-100 text-blue-500 hover:scale-125"
                      }`}
                      disabled={
                        uploadedIds.includes(campaign.id) || campaign.isUploaded
                      }
                      title={
                        uploadedIds.includes(campaign.id) || campaign.isUploaded
                          ? "Uploaded"
                          : "Mark as uploaded"
                      }
                      onClick={() => {
                        if (
                          !campaign.isUploaded &&
                          !uploadedIds.includes(campaign.id)
                        ) {
                          setCampaignToMark(campaign);
                          setMarkUploadModalOpen(true);
                        }
                      }}
                    >
                      {uploadedIds.includes(campaign.id) ||
                      campaign.isUploaded ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <ArrowUpCircle className="w-4 h-4 text-black" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}

      {isCustomLoading ? (
        <div className="min-h-screen w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="md:hidden space-y-4">
          {customCampaignData.map((campaign: any) => (
            <Card
              key={campaign.id}
              className="bg-bg-dashboard border-[#11214D]"
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[#AEB9E1] mb-2 font-medium ">
                        Total Screens :
                        <span className="text-white">
                          {" "}
                          {campaign.screens?.length ?? 0}
                        </span>
                      </h3>
                      <h3 className="text-[#AEB9E1] font-medium text-sm">
                        {campaign.customer?.first_name}{" "}
                        {campaign.customer?.last_name}
                      </h3>

                      <p className="text-white text-xs mt-1">
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
                    onClick={() => {
                      setSelectedCampaign(campaign);
                      setIsApproveModalOpen(true);
                    }}
                    className="bg-[#38B6FF] text-white px-4 py-2 rounded-lg text-sm font-medium mt-2"
                  >
                    View Details
                  </button>

                  {/* Mark as Uploaded for Mobile */}
                  <button
                    className={`mt-2 w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                      uploadedIds.includes(campaign.id) || campaign.isUploaded
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-100 text-blue-500 hover:bg-blue-200"
                    }`}
                    disabled={
                      uploadedIds.includes(campaign.id) || campaign.isUploaded
                    }
                    onClick={() => {
                      if (
                        !campaign.isUploaded &&
                        !uploadedIds.includes(campaign.id)
                      ) {
                        setCampaignToMark(campaign);
                        setMarkUploadModalOpen(true);
                      }
                    }}
                  >
                    {uploadedIds.includes(campaign.id) ||
                    campaign.isUploaded ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <ArrowUpCircle className="w-4 h-4" />
                    )}
                    {uploadedIds.includes(campaign.id) || campaign.isUploaded
                      ? "Uploaded"
                      : "Mark as uploaded"}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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

      {/* Mark as Uploaded Modal */}
      <Dialog
        open={markUploadModalOpen}
        onOpenChange={setMarkUploadModalOpen}
      >
        <DialogContent className="bg-[#081028]">
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              Are you sure you want to mark{" "}
              <span className="font-semibold">
                {campaignToMark?.bundle?.bundle_name}
              </span>
              as uploaded?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setMarkUploadModalOpen(false);
                setCampaignToMark(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              onClick={async () => {
                if (campaignToMark) {
                  await handleMarkUploaded(campaignToMark.id);
                  setMarkUploadModalOpen(false);
                  setCampaignToMark(null);
                }
              }}
            >
              <CheckCircle className="w-4 h-4" /> Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
