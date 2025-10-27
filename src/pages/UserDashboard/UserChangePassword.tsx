import React, { useState } from "react";
import profileImage from "@/assets/UserPanel/profileImage.png";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonInputField from "@/common/CommonInputField";
import { Eye, EyeOff, Pencil } from "lucide-react";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { useChangePasswordMutation } from "@/store/api/User/useApi";
import { toast } from "sonner";

const UserPanel: React.FC = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    oldPassword: "", // Fixed: changed from "OldPassword" to "oldPassword"
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.oldPassword || !formData.newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      const response = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword
      }).unwrap();
      
      toast.success("Password changed successfully!");
      
      // Clear form after successful update
      setFormData({
        newPassword: "",
        oldPassword: "",
      });
      
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Failed to change password";
      toast.error(errorMessage);
      console.error("Password change error:", err);
    }
  };

  return (
    <div className="bg-bg-dashboard">
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
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full"
            >
              <CommonInputField
                label="Old Password"
                type={showOldPassword ? "text" : "password"}
                value={formData.oldPassword}
                onChange={(val) => handleChange("oldPassword", val)}
                icon={
                  showOldPassword ? (
                    <EyeOff 
                      className="cursor-pointer" 
                      onClick={() => setShowOldPassword(false)} 
                    />
                  ) : (
                    <Eye 
                      className="cursor-pointer" 
                      onClick={() => setShowOldPassword(true)} 
                    />
                  )
                }
              />
              
              <CommonInputField
                label="New Password"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={(val) => handleChange("newPassword", val)}
                icon={
                  showNewPassword ? (
                    <EyeOff 
                      className="cursor-pointer" 
                      onClick={() => setShowNewPassword(false)} 
                    />
                  ) : (
                    <Eye 
                      className="cursor-pointer" 
                      onClick={() => setShowNewPassword(true)} 
                    />
                  )
                }
              />

              {/* Submit Button */}
              <div className="col-span-1 md:col-span-2 flex justify-center">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CommonDashboardButton
                    title={isLoading ? "Changing..." : "Change Password"}
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