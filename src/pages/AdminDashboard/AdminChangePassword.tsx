import profileImage from "@/assets/AdminPanel/profileImage.png";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import CommonInputField from "@/common/CommonInputField";
import ExtractErrorMessage from "@/common/ExtractErrorMessage";
import { useChangePasswordMutation } from "@/store/api/User/useApi";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import AdminPanelNavbar from "./AdminPanelNavbar";

const AdminChangePassword: React.FC = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
    
      return;
    }
    const id =toast.loading("Changing password...");
 try{
    const res =await changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    }).unwrap();
    if (res.success) {
      toast.success("Password changed successfully",{ id});
      setFormData({
        newPassword: "",
        oldPassword: "",
        confirmPassword: "",
      });
    }
 }catch(err){
  const msg = ExtractErrorMessage(err);
  toast.error( msg,{ id});
 }
  };

  return (
    <div className=" bg-bg-dashboard ">
      <AdminPanelNavbar />
      <div>
        <main className="flex mx-auto items-center justify-center">
          {/* Form Section */}
          <div className="w-full max-w-5xl  p-6 flex flex-col items-center justify-center">
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
                    <EyeOff onClick={() => setShowOldPassword(false)} />
                  ) : (
                    <Eye onClick={() => setShowOldPassword(true)} />
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
                  disabled={isLoading}
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

export default AdminChangePassword;
