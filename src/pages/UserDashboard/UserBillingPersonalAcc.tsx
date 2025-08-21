import React, { useState } from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonInputField from "@/common/CommonInputField";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { getNames } from "country-list";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const UserPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
              Please enter your Personal Account details
            </h1>
            {/* Form Section*/}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full"
            >
              <CommonInputField
                label="Your First Name"
                type="text"
                value={formData.firstName}
                className="w-full"
                onChange={(val) => handleChange("firstName", val)}
              />

              <CommonInputField
                label="Your Last Name"
                type="text"
                value={formData.lastName}
                onChange={(val) => handleChange("lastName", val)}
              />

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8">
                <CommonInputField
                  label="Personal Identification Number"
                  type="ID"
                  value={formData.ID}
                  onChange={(val) => handleChange("ID", val)}
                />
                <CommonInputField
                  label="Country"
                  type="text"
                  value={formData.country}
                  onChange={(val) => handleChange("country", val)}
                  options={countries}
                  icon={<ChevronDown className="w-5 h-5 text-gray-400" />}
                />
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
              <Link to="/user-dashboard/userBillingBusinessAcc">
                Switch to a business account
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
