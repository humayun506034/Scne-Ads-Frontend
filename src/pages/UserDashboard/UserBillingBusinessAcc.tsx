import React, { useState } from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import { Link } from "react-router-dom";
import { getNames } from "country-list";
import CommonInputField from "@/common/CommonInputField";
import { ChevronDown } from "lucide-react";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
const UserPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    city: "",
    country: "",
    address: "",
    ID: "",
  });

  const countries = getNames();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };
  return (
    <div className=" bg-bg-dashboard ">
      <UserPanelNavbar />
      <div>
        <main className="flex flex-col mx-auto items-center justify-center">
          <div className="w-full max-w-5xl p-6 flex flex-col items-center justify-center">
            <h1 className="text-[#E4E7EC] text-4xl pb-20">
              Please enter your Business Account details
            </h1>
            {/* Form Section */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full"
            >
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col">
                  <CommonInputField
                    label="Business Name"
                    type="text"
                    value={formData.firstName}
                    onChange={(val) => handleChange("firstname", val)}
                  />
                  <p className="text-xs pt-2 text-[#5E657B]">
                    Switch to a personal account if you don't have a company.
                  </p>
                </div>
                <div className="flex flex-col">
                  <CommonInputField
                    label="Billing Country or region"
                    type="text"
                    value={formData.country}
                    onChange={(val) => handleChange("country", val)}
                    options={countries}
                    icon={<ChevronDown className="w-5 h-5 text-gray-400" />}
                  />
                  <p className="text-xs pt-2 text-[#5E657B]">
                    The legal country or region registered with your government
                    and tax agency.
                  </p>
                </div>
                <CommonInputField
                  label="City"
                  type="text"
                  value={formData.city}
                  onChange={(val) => handleChange("city", val)}
                  icon={<ChevronDown className="w-5 h-5 text-gray-400" />}
                />{" "}
              </div>

              <div className="md:col-span-2">
                <CommonInputField
                  label="Address"
                  type="address"
                  value={formData.address}
                  onChange={(val) => handleChange("address", val)}
                />
              </div>
              {/* pay VAT buttons */}
              <div className="w-min">
                <div className="flex gap-4">
                  <div className="button">
                    <div className="icon2"></div>
                    <div className="text">Yes, we pay VAT</div>
                  </div>
                  <div className="button">
                    <div className="icon"></div>
                    <div className="text">No, we pay don't VAT</div>
                  </div>
                </div>
                <p className="text-xs pt-4 text-[#5E657B]">
                  If you're an European company and do not pay VAT, select NO.
                  Otherwise, select YES.
                </p>
              </div>
              {/* ------ */}
              <br/>
              <div className="flex flex-col">
                <CommonInputField
                  label="Tax Identification Number"
                  type="ID"
                  value={formData.ID}
                  className="w-full"
                  onChange={(val) => handleChange("ID", val)}
                />
                <p className="text-xs pt-2 text-[#5E657B]">
                  If your company is from the US, you should add the EIN here,
                  if from outside US, the EU VAT Number or any other TAX ID for
                  the invoice
                </p>
              </div>
              <div className="flex flex-col">
                <CommonInputField
                  label="Additional Identification"
                  type="ID"
                  value={formData.ID}
                  onChange={(val) => handleChange("ID", val)}
                />{" "}
                <p className="text-xs pt-2 text-[#5E657B]">
                  Add any other information you consider necessary for the
                  invoice
                </p>{" "}
              </div>
              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button>
                  <CommonDashboardButton
                    title="Save Details"
                    className="px-14 py-2 mt-8 rounded-full text-xl text-white font-semibold transition"
                  />
                </button>
              </div>
            </form>
            <p className="text-[#B1C0D5] pt-9 hover:text-white underline cursor-pointer">
              <Link to="/user-dashboard/userBillingPersonalAcc">
                Switch to a personal account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
