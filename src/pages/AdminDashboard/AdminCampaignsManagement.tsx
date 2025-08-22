import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
const campaignsData = [
  {
    name: "New Product Launch",
    advertiser: "TerchCorp",
    status: "Approved",
    actionedBy: "Admin User 1",
    budget: "$5,000",
    spent: "$3,200",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
  },
  {
    name: "Summer Sale 2025",
    advertiser: "FashionCo",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$10,000",
    spent: "$0",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "Holiday Special",
    advertiser: "FoodMart",
    status: "Approved",
    actionedBy: "Admin User 2",
    budget: "$7,000",
    spent: "$6,500",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "Back to School",
    advertiser: "BookWorms",
    status: "Rejected",
    actionedBy: "Admin User 1",
    budget: "$10,000",
    spent: "$10,000",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "New Product Launch",
    advertiser: "TerchCorp",
    status: "Approved",
    actionedBy: "Admin User 1",
    budget: "$5,000",
    spent: "$3,200",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
  },
  {
    name: "Summer Sale 2025",
    advertiser: "FashionCo",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$10,000",
    spent: "$0",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "Holiday Special",
    advertiser: "FoodMart",
    status: "Approved",
    actionedBy: "Admin User 2",
    budget: "$7,000",
    spent: "$6,500",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "Back to School",
    advertiser: "BookWorms",
    status: "Rejected",
    actionedBy: "Admin User 1",
    budget: "$10,000",
    spent: "$10,000",
    startDate: "2025-07-01",
    endDate: "2025-09-15",
  },
  {
    name: "Winter Clearance",
    advertiser: "ElectroMart",
    status: "Approved",
    actionedBy: "Admin User 3",
    budget: "$8,500",
    spent: "$7,200",
    startDate: "2025-11-01",
    endDate: "2025-12-31",
  },
  {
    name: "Spring Collection Launch",
    advertiser: "StyleHouse",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$15,000",
    spent: "$0",
    startDate: "2025-03-01",
    endDate: "2025-04-15",
  },
  {
    name: "Black Friday Blast",
    advertiser: "MegaDeals",
    status: "Approved",
    actionedBy: "Admin User 2",
    budget: "$25,000",
    spent: "$19,500",
    startDate: "2025-11-20",
    endDate: "2025-11-30",
  },
  {
    name: "Cyber Monday Madness",
    advertiser: "TechWorld",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$12,000",
    spent: "$11,200",
    startDate: "2025-11-29",
    endDate: "2025-12-02",
  },
  {
    name: "Valentine’s Day Promo",
    advertiser: "GiftExpress",
    status: "Rejected",
    actionedBy: "Admin User 2",
    budget: "$4,000",
    spent: "$500",
    startDate: "2025-02-01",
    endDate: "2025-02-14",
  },
  {
    name: "Eid Festival Offers",
    advertiser: "GlobalBazaar",
    status: "Approved",
    actionedBy: "Admin User 1",
    budget: "$18,000",
    spent: "$16,750",
    startDate: "2025-05-20",
    endDate: "2025-06-10",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Backyard BBQ Promo",
    advertiser: "GrillMasters",
    status: "Pending",
    actionedBy: "N/A",
    budget: "$6,000",
    spent: "$0",
    startDate: "2025-06-01",
    endDate: "2025-07-04",
  },
  {
    name: "Travel Bonanza",
    advertiser: "FlyHigh Airlines",
    status: "Approved",
    actionedBy: "Admin User 5",
    budget: "$30,000",
    spent: "$27,500",
    startDate: "2025-07-15",
    endDate: "2025-08-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
  {
    name: "Halloween Specials",
    advertiser: "SpookyTown",
    status: "Rejected",
    actionedBy: "Admin User 3",
    budget: "$9,000",
    spent: "$9,000",
    startDate: "2025-10-01",
    endDate: "2025-10-31",
  },
  {
    name: "Year-End Gala",
    advertiser: "LuxuryEvents",
    status: "Approved",
    actionedBy: "Admin User 4",
    budget: "$40,000",
    spent: "$35,000",
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
];

const ITEMS_PER_PAGE = 20;

const AdminCampaignManagement: React.FC = () => {
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = campaignsData.slice(startIndex, endIndex);

  const hasNextPage = endIndex < campaignsData.length;
  const hasPrevPage = page > 1;
  return (
    <div className="p-4 sm:p-6 lg:py-16 lg:px-6 bg-bg-dashboard">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-normal text-[#AEB9E1] mb-6 lg:mb-8">
        Campaign management
      </h2>

      {/* Desktop and Tablet View */}
      <Card className="hidden sm:block bg-bg-dashboard lg:p-0 border-[#11214D]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="border-b text-sm lg:text-base bg-[#11214D] border-[#11214D] text-[#AEB9E1] font-normal">
                <tr>
                  <th className="py-3 px-4">Campaign Name</th>
                  <th className="py-3 px-4">Advertiser</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actioned By</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Spent</th>
                  <th className="py-3 px-4">Start date</th>
                  <th className="py-3 px-4">End Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((campaign, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                  >
                    <td className="py-3 px-4">{campaign.name}</td>
                    <td className="py-3 px-4">{campaign.advertiser}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : campaign.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{campaign.actionedBy}</td>
                    <td className="py-3 px-4">{campaign.budget}</td>
                    <td className="py-3 px-4">{campaign.spent}</td>
                    <td className="py-3 px-4">{campaign.startDate}</td>
                    <td className="py-3 px-4">{campaign.endDate}</td>
                    <td className="py-3 px-4 flex items-center gap-3">
                      <Eye className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:text-blue-500" />
                      <p> | </p>

                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:text-red-500" />
                      </motion.div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View - Card Layout */}
      <div className="sm:hidden space-y-4">
        {campaignsData.map((campaign, index) => (
          <Card key={index} className="bg-bg-dashboard border-[#11214D]">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-[#AEB9E1] font-medium text-sm">
                      {campaign.name}
                    </h3>
                    <p className="text-[#AEB9E1]/70 text-xs mt-1">
                      {campaign.advertiser}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      campaign.status === "Approved"
                        ? "bg-green-500/20 text-green-400"
                        : campaign.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#AEB9E1]/50">Budget:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {campaign.budget}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">Spent:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {campaign.spent}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">Start:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {campaign.startDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#AEB9E1]/50">End:</span>
                    <span className="text-[#AEB9E1] ml-1">
                      {campaign.endDate}
                    </span>
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#AEB9E1]/50">Actioned by:</span>
                  <span className="text-[#AEB9E1] ml-1">
                    {campaign.actionedBy}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-800/40">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:text-blue-500" />
                    <p className="text-[#AEB9E1]/50">|</p>
                    <Trash2 className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:text-red-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        {hasPrevPage && (
          <button
            onClick={() => setPage((prev) => prev - 1)}
            className="px-4 py-2 bg-[#11214D] text-[#AEB9E1] rounded-lg hover:bg-[#1a2b5d]"
          >
            Previous
          </button>
        )}

        {/* Page Indicator */}
        <span className="text-[#AEB9E1] text-sm">
          Page {page} of {Math.ceil(campaignsData.length / ITEMS_PER_PAGE)}
        </span>

        {hasNextPage && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-[#11214D] text-[#AEB9E1] rounded-lg hover:bg-[#1a2b5d]"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminCampaignManagement;
