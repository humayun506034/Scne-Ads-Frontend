import React, { useState, useEffect } from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonInputField from "@/common/CommonInputField";
import { Pencil } from "lucide-react";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import {
  useGetSingleUserQuery,
  useUpdateProfileMutation,
} from "@/store/api/User/useApi";
import { toast } from "sonner";

const UserPanel: React.FC = () => {
  const { data: userData, isLoading, error } = useGetSingleUserQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // Initialize formData with empty values, then update when data loads
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    country: "",
    file: "" as string | File,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Update formData when userData is available
  useEffect(() => {
    if (userData?.data) {
      setFormData((prev) => ({
        ...prev,
        firstName: userData.data.first_name || "",
        lastName: userData.data.last_name || "",
        email: userData.data.email || "",
        phone: userData.data.phone || "",
        file: userData.data.image || "",
      }));

      // Set image preview if user has an existing image
      if (userData.data.image) {
        setImagePreview(userData.data.image);
      }
    }
  }, [userData]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the data object
    const updateData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      // Add other fields as needed
    };

    // Create FormData object with the required structure
    const formDataToSend = new FormData();

    // Append the data object as JSON string
    formDataToSend.append("data", JSON.stringify(updateData));

    // Append profile image if exists
    if (profileImage) {
      formDataToSend.append("file", profileImage);
    }

    try {
      const response = await updateProfile(formDataToSend).unwrap();
      toast.success("Profile updated successfully!");
      console.log("Update response:", response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
      console.error("Update error:", err);
    }
  };

  if (error) return <div>Error loading user data</div>;

  return (
    <div className="bg-bg-dashboard">
      <UserPanelNavbar />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <main className="flex mx-auto items-center justify-center">
            {/* Form Section */}
            <div className="w-full max-w-5xl p-6 flex flex-col items-center justify-center">
              {/* Profile Image */}
              <div className="relative w-56 h-56 mb-20">
                <img
                  src={
                    imagePreview ||
                    (typeof formData.file === "string" ? formData.file : "") ||
                    "/default-avatar.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-[#081028]"
                />
                <label className="absolute bottom-2 right-2 bg-[#1DA1F2] p-2 rounded-full text-white hover:bg-[#1a8cd8] cursor-pointer">
                  <Pencil className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
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
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CommonDashboardButton
                      title={isUpdating ? "Updating..." : "Save"}
                      className="px-14 py-2 mt-4 rounded-full text-xl text-white font-semibold transition"
                    />
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default UserPanel;
