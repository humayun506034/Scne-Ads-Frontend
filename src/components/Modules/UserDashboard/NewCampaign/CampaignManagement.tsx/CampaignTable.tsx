import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CampaignTableProps } from ".";
import { StatusBadge } from "../../Dashboard/RecentCampaigns/StatusBadge";
import { CampaignFilterTable } from "./CampaignFilterTable";

export function CampaignTable({ campaigns }: CampaignTableProps) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [activeStatus, setActiveStatus] = useState("Active");
  const [activeDay, setActiveDay] = useState("1 Mo");
  const totalPages = Math.ceil(campaigns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, endIndex);
  const [openStart, setOpenStart] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = useState<Date | undefined>(undefined);

  const handleSelectCampaign = (campaignId: string, checked: boolean) => {
    if (checked) {
      setSelectedCampaigns((prev) => [...prev, campaignId]);
      console.log(
        "Selected campaign:",
        campaigns.find((c) => c.id === campaignId)?.name
      );
    } else {
      setSelectedCampaigns((prev) => prev.filter((id) => id !== campaignId));
    }
  };
  const handleFinishSetup = (campaignName: string) => {
    console.log("Finish Setup clicked for:", campaignName);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatScreenTime = (minutes: number) => {
    return `${minutes.toFixed(1)} mins.`;
  };

  // Calculate totals for current page
  const totals = currentCampaigns.reduce(
    (acc, campaign) => ({
      spend: acc.spend + campaign.spend,
      plays: acc.plays + campaign.plays,
      impression: acc.impression + campaign.impression,
      screenTime: acc.screenTime + campaign.screenTime,
    }),
    { spend: 0, plays: 0, impression: 0, screenTime: 0 }
  );

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <CampaignFilterTable
        openStart={openStart}
        setOpenStart={setOpenStart}
        openFinish={openFinish}
        setOpenFinish={setOpenFinish}
        startDate={startDate}
        setFinishDate={setFinishDate}
        setStartDate={setStartDate}
        finishDate={finishDate}
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
      <div className="overflow-x-auto w-full mt-20">
        <table className="w-full">
          <thead>
            <tr className="border-none space-x-2 hover:bg-transparent">
              <th className="w-14"></th>
              <th className="font-medium text-start min-w-[100px] pl-2">
                Status
              </th>
              <th className="font-medium text-start pl-2 min-w-[200px]">
                Name
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                Budget
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                Start Date
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                End Date
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                Spend
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                Plays
              </th>
              <th className="font-medium text-start pl-2  min-w-[100px]">
                Impression
              </th>
              <th className="font-medium text-start pl-2  min-w-[120px]">
                Screen Time
              </th>
            </tr>
          </thead>
          <tbody className="mt-4">
            {currentCampaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b-1  border-gray-700
                 shadow-lg rounded-lg "
              >
                <td className="p-2 py-5  ">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Checkbox
                      checked={selectedCampaigns.includes(campaign.id)}
                      onCheckedChange={(checked) =>
                        handleSelectCampaign(campaign.id, checked === true)
                      }
                      className="data-[state=checked]:bg-[#14CA74] data-[state=checked]:border-[#14CA74] data-[state=unchecked]:border-[#14CA74] data-[state=unchecked]:border-2 p-2 my-5 cursor-pointer data-[state=checked]:border-2"
                    />
                  </motion.div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={campaign.status} />
                    {campaign.status === "Draft" && (
                      <Switch
                        checked={false}
                        className="data-[state=checked]:bg-[#14CA74] "
                      />
                    )}
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className=" text-white">{campaign.name}</div>
                    <div className="text-xs text-title-color">
                      {campaign.id}
                    </div>
                    <div className="flex items-center gap-2">
                      {!campaign.setupComplete && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleFinishSetup(campaign.name)}
                          className="text-[#14CA74] cursor-pointer flex justify-center gap-2 items-center text-xs hover:text-green-300 transition-colors"
                        >
                          Finish Setup{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <mask
                              id="mask0_571_2012"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="12"
                              height="12"
                            >
                              <rect width="12" height="12" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_571_2012)">
                              <path
                                d="M6.3375 6L4.8 7.5375L5.5 8.25L7.75 6L5.5 3.75L4.8 4.4625L6.3375 6ZM6 11C5.30833 11 4.65833 10.8687 4.05 10.6062C3.44167 10.3438 2.9125 9.9875 2.4625 9.5375C2.0125 9.0875 1.65625 8.55833 1.39375 7.95C1.13125 7.34167 1 6.69167 1 6C1 5.30833 1.13125 4.65833 1.39375 4.05C1.65625 3.44167 2.0125 2.9125 2.4625 2.4625C2.9125 2.0125 3.44167 1.65625 4.05 1.39375C4.65833 1.13125 5.30833 1 6 1C6.69167 1 7.34167 1.13125 7.95 1.39375C8.55833 1.65625 9.0875 2.0125 9.5375 2.4625C9.9875 2.9125 10.3438 3.44167 10.6062 4.05C10.8687 4.65833 11 5.30833 11 6C11 6.69167 10.8687 7.34167 10.6062 7.95C10.3438 8.55833 9.9875 9.0875 9.5375 9.5375C9.0875 9.9875 8.55833 10.3438 7.95 10.6062C7.34167 10.8687 6.69167 11 6 11ZM6 10C7.11667 10 8.0625 9.6125 8.8375 8.8375C9.6125 8.0625 10 7.11667 10 6C10 4.88333 9.6125 3.9375 8.8375 3.1625C8.0625 2.3875 7.11667 2 6 2C4.88333 2 3.9375 2.3875 3.1625 3.1625C2.3875 3.9375 2 4.88333 2 6C2 7.11667 2.3875 8.0625 3.1625 8.8375C3.9375 9.6125 4.88333 10 6 10Z"
                                fill="#14CA74"
                              />
                            </g>
                          </svg>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="">{formatCurrency(campaign.budget)}/hr</div>
                    <div className="text-xs text-[#7999C4]">
                      {formatCurrency(campaign.budgetLimit)} limit
                    </div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="text-sm">{campaign.startDate}</div>
                    <div className="text-xs text-[#7999C4]">
                      {campaign.startDateDuration}{" "}
                    </div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="text-sm">{campaign.endDate}</div>
                    <div className="text-xs text-[#7999C4]">
                      {campaign.endDateDuration}
                    </div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="">{campaign.spend}</div>
                    <div className="text-xs text-[#7999C4]">0.00 Total*</div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="">{campaign.plays}</div>
                    <div className="text-xs text-[#7999C4]">Plays</div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="space-y-1">
                    <div className="">{campaign.impression}</div>
                    <div className="text-xs text-[#7999C4]">Audience</div>
                  </div>
                </td>
                <td className="p-2 py-5  ">
                  <div className="text-sm">
                    {formatScreenTime(campaign.screenTime)}
                  </div>
                </td>
              </tr>
            ))}

            <tr className="">
              <td className="py-5 ">Totals</td>
              <td className="">-</td>
              <td className="py-5 ">-</td>
              <td className="py-5 ">-</td>
              <td className="py-5 ">-</td>
              <td className="py-5 ">-</td>
              <td className="py-5 ">
                <div className="space-y-1">
                  <div className="">{totals.spend}</div>
                  <div className="text-xs text-title-color">0.00 Total*</div>
                </div>
              </td>
              <td className="py-5 ">
                <div className="space-y-1">
                  <div className="">{totals.plays}</div>
                  <div className="text-xs text-title-color">Plays</div>
                </div>
              </td>
              <td className="py-5 ">
                <div className="space-y-1">
                  <div className="">{totals.impression}</div>
                  <div className="text-xs text-title-color">Audience</div>
                </div>
              </td>
              <td className="py-5 ">
                <div className="text-sm">
                  {formatScreenTime(totals.screenTime)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap  md:justify-between px-6 py-4 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="hover:text-[#14CA74] cursor-pointer  bg-[#28345B]"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm ">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex  items-center gap-2">
            <span className="text-sm ">Rows</span>
            <select
              value={rowsPerPage.toString()}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-20 h-8 bg-[#28345B] rounded-lg px-4 border-[#28345B] text-[#14CA74]"
            >
              <option
                className="cursor-pointer hover:bg-[#28345B] text-[#14CA74]"
                value="5"
              >
                5
              </option>
              <option
                className="cursor-pointer hover:bg-[#28345B] text-[#14CA74]"
                value="10"
              >
                10
              </option>
              <option
                className="cursor-pointer hover:bg-[#28345B] text-[#14CA74]"
                value="20"
              >
                20
              </option>
            </select>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="hover:text-white cursor-pointer  text-[#14CA74] bg-[#28345B]"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
