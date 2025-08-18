import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Copy, Table } from "lucide-react";
import { useState } from "react";
import { Campaign } from ".";
import { StatusBadge } from "../Dashboard/RecentCampaigns/StatusBadge";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination
  const totalPages = Math.ceil(campaigns.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentCampaigns = campaigns.slice(startIndex, endIndex);

  // Handle selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCampaigns(currentCampaigns.map((campaign) => campaign.id));
    } else {
      setSelectedCampaigns([]);
    }
  };

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

  const handleClone = (campaignName: string) => {
    console.log("Clone clicked for:", campaignName);
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
    <div className="w-full bg-[#081028] text-white rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-700 hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedCampaigns.length === currentCampaigns.length &&
                    currentCampaigns.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                Status
              </TableHead>
              <TableHead className="text-gray-300 font-medium min-w-[200px]">
                Name
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                Budget
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                Start Date
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                End Date
              </TableHead>
              <TableHead className="text-gray-300 font-medium">Spend</TableHead>
              <TableHead className="text-gray-300 font-medium">Plays</TableHead>
              <TableHead className="text-gray-300 font-medium">
                Impression
              </TableHead>
              <TableHead className="text-gray-300 font-medium">
                Screen Time
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCampaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                className="border-gray-700 hover:bg-gray-800/50 transition-colors"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedCampaigns.includes(campaign.id)}
                    onCheckedChange={(checked) =>
                      handleSelectCampaign(campaign.id, checked as boolean)
                    }
                    className="border-gray-600 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={campaign.status} />
                    {campaign.status === "Draft" && (
                      <Switch
                        checked={false}
                        className="data-[state=checked]:bg-green-500"
                      />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium text-white">
                      {campaign.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      6b5cde4f3098f5b04f20720fa3
                    </div>
                    <div className="flex items-center gap-2">
                      {!campaign.setupComplete && (
                        <button
                          onClick={() => handleFinishSetup(campaign.name)}
                          className="text-green-400 text-xs hover:text-green-300 transition-colors"
                        >
                          Finish Setup
                        </button>
                      )}
                      <button
                        onClick={() => handleClone(campaign.name)}
                        className="text-gray-400 text-xs hover:text-gray-300 transition-colors flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        Clone
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">
                      {formatCurrency(campaign.budget)}/hr
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatCurrency(campaign.budgetLimit)} limit
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{campaign.startDate}</div>
                    <div className="text-xs text-gray-400">2 days ago</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{campaign.endDate}</div>
                    <div className="text-xs text-gray-400">in a day</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{campaign.spend}</div>
                    <div className="text-xs text-gray-400">0.00 Total*</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{campaign.plays}</div>
                    <div className="text-xs text-gray-400">Plays</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{campaign.impression}</div>
                    <div className="text-xs text-gray-400">Audience</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatScreenTime(campaign.screenTime)}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {/* Totals Row */}
            <TableRow className="border-gray-700 bg-gray-800/30">
              <TableCell className="font-medium">Totals</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{totals.spend}</div>
                  <div className="text-xs text-gray-400">0.00 Total*</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{totals.plays}</div>
                  <div className="text-xs text-gray-400">Plays</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="font-medium">{totals.impression}</div>
                  <div className="text-xs text-gray-400">Audience</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {formatScreenTime(totals.screenTime)}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Prev
        </Button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Rows</span>
            <Select
              value={rowsPerPage.toString()}
              onValueChange={(value) => {
                setRowsPerPage(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-20 h-8 bg-gray-700 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="5" className="text-white hover:bg-gray-600">
                  5
                </SelectItem>
                <SelectItem value="10" className="text-white hover:bg-gray-600">
                  10
                </SelectItem>
                <SelectItem value="20" className="text-white hover:bg-gray-600">
                  20
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="text-gray-300 hover:text-white hover:bg-gray-700"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
