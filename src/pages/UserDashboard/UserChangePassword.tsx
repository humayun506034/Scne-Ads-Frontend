import React, { useState } from "react";
import profileImage from "../..//assets/UserPanel/profileImage.jpg";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonInputField from "@/common/CommonInputField";

import { Eye, EyeOff, Pencil } from "lucide-react";
import CommonDashboardButton from "@/common/CommonDashBoardButton";

const UserPanel: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
  };

  return (
    <div className=" bg-bg-dashboard ">
      <UserPanelNavbar />
      <div>
        <main className="flex mx-auto items-center justify-center">
          {/* Form Section */}
          <div className="w-full max-w-5xl p-6 flex flex-col items-center justify-center">
            {/* Profile Image */}
            <div className="relative w-56 h-56 mb-20">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-[#081028]"
              />
              <button className="absolute bottom-2 right-2 bg-[#1DA1F2] p-2 rounded-full text-white hover:bg-[#1a8cd8]">
                <Pencil className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full"
            >
              <CommonInputField
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(val) => handleChange("newPassword", val)}
                icon={
                  showNewPassword ? (
                    <EyeOff onClick={() => setShowNewPassword(false)} />
                  ) : (
                    <Eye onClick={() => setShowNewPassword(true)} />
                  )
                }
              />

              <CommonInputField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(val) => handleChange("confirmPassword", val)}
                icon={
                  showConfirmPassword ? (
                    <EyeOff onClick={() => setShowConfirmPassword(false)} />
                  ) : (
                    <Eye onClick={() => setShowConfirmPassword(true)} />
                  )
                }
              />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button>
                  <CommonDashboardButton
                    title="Change Password"
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

export default UserPanel;
