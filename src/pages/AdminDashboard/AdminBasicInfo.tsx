import Icon from "@/assets/AdminPanel/edit-2.svg";
import profileImage from "@/assets/AdminPanel/profileImage.png";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CommonInputField from "@/common/CommonInputField";
import React, { useState } from "react";
import AdminPanelNavbar from "./AdminPanelNavbar";

const AdminBasicInfo: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
  });
// const  [updateProfile,{isLoading}] = useUpdateProfileMutation();
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className=" bg-bg-dashboard ">
      <AdminPanelNavbar />
      <div>
        <main className="flex mx-auto items-center justify-center">
          {/* Form Section */}
          <div className="w-full max-w-5xl  p-6 flex flex-col items-center justify-center">
            {/* Profile Image */}
            <div className="relative w-60 h-60 mb-20">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#081028]"
              />

              <div className="absolute bottom-2 right-2 w-14 h-14 bg-[#033579] rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-blue-700 hover:scale-110 transition-all duration-200">
                <img src={Icon} alt="icon" className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full"
            >
              <CommonInputField
                label="First Name"
                type="text"
                value={formData.firstName}
                className="w-full"
                onChange={(val) => handleChange("firstName", val)}
              />

              <CommonInputField
                label="Last Name"
                type="text"
                value={formData.lastName}
                onChange={(val) => handleChange("lastName", val)}
              />

              <CommonInputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(val) => handleChange("email", val)}
              />

              <CommonInputField
                label="Phone"
                type="phone"
                value={formData.phone}
                onChange={(val) => handleChange("phone", val)}
              />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button>
                  <CommonDashboardButton
                    title="Save"
                    className="px-14 py-2 mt-4 rounded-full text-xl text-white font-semibold transition"
                  />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBasicInfo;
