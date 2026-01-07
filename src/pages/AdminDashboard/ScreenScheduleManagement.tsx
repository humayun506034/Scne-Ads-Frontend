/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonHeader from "@/common/CommonHeader";
import CommonModalForm, { Field } from "@/common/CommonModalForm";
import CommonStatus from "@/common/CommonStatus";
import ExtractErrorMessage from "@/common/ExtractErrorMessage";
import Loading from "@/common/MapLoading";
import { IScreen } from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationCard";
import Pagination from "@/components/Pagination";
import { Card, CardContent } from "@/components/ui/card";
import { useChangeScreenStatusMutation, useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const ScreenScheduleManagement: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<IScreen | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  

  const { data, isLoading,refetch } = useGetAllScreenQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
    limit: 30, 
  });

 
  const [changeScreenStatus, { isLoading: isChangeScreenStatusLoading }] = useChangeScreenStatusMutation();
 ;

  const screens = data?.data?.data || [];
  const meta = data?.data?.meta || { page: 1, totalPages: 1 };
  const totalPages = meta?.totalPages || 1;

  const modalFields: Field[] = [
    {
      name: "Status",
      type: "dropdown",
      label: "Status",
      required: true,
      options: [
        { value: "available", label: "Available" },
        { value: "maintenance", label: "Maintenance" },
      ],
    },
  ];

const handleSave = async (data: React.SetStateAction<any>, screenId: string) => {


  if (isChangeScreenStatusLoading) {
    toast.info("Updating screen status...");
    return;
  }

  const id = toast.loading("Updating screen status...");
  try {
   
    const payload = { availability: data.Status };

    
    const res = await changeScreenStatus({ id: screenId, payload }).unwrap();
    
    if (res.success) {
      refetch();         
      setIsModalOpen(false);
      setSelectedData(null);
      toast.success("Screen status updated successfully", { id });
    }
  } catch (error) {
    const msg = ExtractErrorMessage(error);
    toast.error(msg, { id });
    console.error("Error saving form data:", error);
  }
};

  // Handle the search input change and update the searchTerm state
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="p-6 min-h-[90dvh] md:mt-10  bg-bg-dashboard">
      <div className="flex flex-col md:flex-row justify-between items-start">
        <CommonHeader title="Screen Schedule Management" />

  <div className="relative mb-6 w-full max-w-lg">
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Search by name, slug, description, or location"
      className="w-full px-4 py-3 border-2 bg-dashboard-card-bg border-dashboard-border text-white text-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 pr-10"
    />
    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
  </div>
</div>

      {/* Desktop and Tablet View */}
      <Card className="block bg-bg-dashboard lg:p-0 border-[#11214D]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="border-b text-sm lg:text-base bg-[#11214D] border-[#11214D] text-[#AEB9E1] font-normal">
                <tr>
                  <th className="py-3 px-4">Screen Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Price</th>
              
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-4 px-4 text-center">
                     <Loading/>
                    </td>
                  </tr>
                ) : (
                  screens.map((screen: any) => (
                    <tr
                      key={screen.id}
                      className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                    > 
                      <td className="py-3 px-4 flex justify-start items-center gap-4">
                          <img
                          src={screen.imageUrls ? screen.imageUrls[0]?.url : ''}
                          alt={`${screen.screen_name} image`}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <p>{screen.screen_name}</p></td>
                      <td className="py-3 px-4">{screen.location}</td>
                      <td className="py-3 px-4">
                        <CommonStatus status={screen.availability} />
                      </td>
                      <td className="py-3 px-4">
                        <CommonStatus status={screen.status} />
                      </td>
                      <td className="py-3 px-4">${screen.price}</td>
                     
                      <td className="py-3 px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          onClick={() => {
                            setSelectedData(screen);
                            setIsModalOpen(true);
                          }}
                          className="w-4 h-4 text-title-color cursor-pointer transition-all duration-200 ease-in-out  hover:scale-125"
                        >
                          <path
                            d="M11 4.00023H4C3.46957 4.00023 2.96086 4.21094 2.58579 4.58601C2.21071 4.96109 2 5.46979 2 6.00023V20.0002C2 20.5307 2.21071 21.0394 2.58579 21.4144C2.96086 21.7895 3.46957 22.0002 4 22.0002H18C18.5304 22.0002 19.0391 21.7895 19.4142 21.4144C19.7893 21.0394 20 20.5307 20 20.0002V13.0002M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                            stroke="#38B6FF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

   

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <CommonModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Screen Schedule"
        formData={selectedData || {}}
        onSave={(formData) => {
          if (selectedData && selectedData.id) {
            handleSave(formData, selectedData.id);
          }
        }}
        onCancel={() => setIsModalOpen(false)}
        fields={modalFields}
        saveButtonText="Save Changes"
      />
    </div>
  );
};

export default ScreenScheduleManagement;
