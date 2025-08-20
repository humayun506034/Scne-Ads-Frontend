import React, { useState } from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Briefcase, User } from "lucide-react";
import { Link } from "react-router-dom";

const UserPanel: React.FC = () => {
  const [selectedAccount, setSelectedAccount] = useState<
    "personal" | "business" | null
  >(null);

  return (
    <div className=" bg-bg-dashboard ">
      <UserPanelNavbar />
      <div>
        <main className="flex flex-col mx-auto items-center justify-center">
          {/* Card Section */}
          <div className="w-full mt-24 p-6 flex flex-col items-center justify-center">
            <h1 className="text-[#E4E7EC] text-4xl pb-20">
              Choose what type of account do you want:
            </h1>
            {/* Cards */}
            <div className="flex gap-12">
              {/* Personal Account */}
              <div className=" bg-[#0B1739]  border w-96 border-[#38B6FF] rounded-2xl px-11 py-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center flex-col gap-4">
                  <User className="w-8 h-8 text-[#FFFFFF]" />
                  <h3 className="text-xl font-semibold text-[#FFFFFF]">
                    Personal Account
                  </h3>
                  <p className="text-sm text-center text-[#FFFFFF]">
                    Same benefits as a business account, but less hassle!
                    Invoices will be issued to you directly.
                  </p>
                </div>
                <div className="mt-4">
                  <Link to="/user-dashboard/userBillingPersonalAcc">
                    {" "}
                    <CommonDashboardButton
                      title="Select"
                      className={`px-16 py-2 mt-4 text-xl font-semibold ${
                        selectedAccount === "personal"
                          ? "bg-[#38B6FF] text-white"
                          : "bg-[#0B1739] text-white border border-[#38B6FF]"
                      }`}
                      onClick={() => setSelectedAccount("personal")}
                    />
                  </Link>
                </div>
              </div>

              {/* Business Account Card */}
              <div className=" bg-[#0B1739]  border w-96 border-[#38B6FF] rounded-2xl px-11 py-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex flex-col items-center gap-4">
                  <Briefcase className="w-8 h-8 text-[#FFFFFF]" />
                  <h3 className="text-lg font-semibold text-[#FFFFFF]">
                    Business Account
                  </h3>

                  <p className="text-sm text-center text-[#FFFFFF]">
                    Perfect if you need the invoices to reflect your company
                    information (also makes you look cooler).
                  </p>
                </div>
                <div className="mt-4 ">
                  <Link to="/user-dashboard/userBillingBusinessAcc">
                    <CommonDashboardButton
                      title="Select"
                      className={`px-16 py-2 mt-4 text-xl font-semibold `}
                      onClick={() => setSelectedAccount("business")}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
