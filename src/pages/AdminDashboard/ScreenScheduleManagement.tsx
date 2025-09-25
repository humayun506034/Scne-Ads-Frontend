import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import CommonStatus from "@/common/CommonStatus";
import CommonModalForm, { Field } from "@/common/CommonModalForm";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import Pagination from "@/components/Pagination";


const ScreenScheduleManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetAllScreenQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  });

  const screens = data?.data?.data || [];
  const meta = data?.data?.meta || { page: 1, totalPages: 1 };
const totalPages = meta?.totalPages  || 1; 
  const modalFields: Field[] = [
    {
      name: "screen_name",
      type: "input",
      label: "Screen Name",
      placeholder: "e.g Downtown Billboard",
      required: true,
    },
    {
      name: "location",
      type: "input",
      label: "Location",
      placeholder: "e.g Main St.",
      required: true,
    },
    {
      name: "status",
      type: "dropdown",
      label: "Status",
      required: true,
      options: [
        { value: "active", label: "Active" },
        { value: "maintenance", label: "Maintenance" },
      ],
    },
    {
      name: "schedule",
      type: "input",
      label: "Schedule",
      required: false,
      placeholder: "e.g 9 AM - 10 PM",
    },
  ];

  if (isLoading) {
    return <p className="text-center text-[#AEB9E1]">Loading screens...</p>;
  }

  return (
    <div className="p-4 sm:p-6 lg:py-16 lg:px-6 bg-bg-dashboard">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium text-[#AEB9E1] mb-6 lg:mb-8">
        Screen Schedule Management
      </h2>

      {/* Desktop and Tablet View */}
      <Card className="hidden sm:block bg-bg-dashboard lg:p-0 border-[#11214D]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="border-b text-sm lg:text-base bg-[#11214D] border-[#11214D] text-[#AEB9E1] font-normal">
                <tr>
                  <th className="py-3 px-4">Screen Name</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">availability</th>
                  <th className="py-3 px-4">status</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {screens.map((screen: any) => (
                  <tr
                    key={screen.id}
                    className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                  >
                    <td className="py-3 px-4">{screen.screen_name}</td>
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
                        className="w-4 h-4 text-[#38B6FF] cursor-pointer transition-all duration-200 ease-in-out hover:text-blue-600 hover:scale-125"
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile View - Card Layout */}
      <div className="grid gap-4 sm:hidden">
        {screens.map((screen: any) => (
          <Card key={screen.id} className="bg-[#11214D] border-[#1a2b5d]">
            <CardContent className="p-4 text-[#AEB9E1] space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold">
                  {screen.screen_name}
                </h3>
                <CommonStatus status={screen.status} />
              </div>
              <p className="text-sm">
                <span className="font-medium">Location:</span> {screen.location}
              </p>
              <p className="text-sm">
                <span className="font-medium">Price:</span> ${screen.price}
              </p>
              <div className="flex justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  onClick={() => {
                    setSelectedData(screen);
                    setIsModalOpen(true);
                  }}
                  className="w-5 h-5 text-[#38B6FF] cursor-pointer transition-all duration-200 ease-in-out hover:text-blue-600 hover:scale-125"
                >
                  <path
                    d="M11 4.00023H4C3.46957 4.00023 2.96086 4.21094 2.58579 4.58601C2.21071 4.96109 2 5.46979 2 6.00023V20.0002C2 20.5307 2.21071 21.0394 2.58579 21.4144C2.96086 21.7895 3.46957 22.0002 4 22.0002H18C18.5304 22.0002 19.0391 21.7895 19.4142 21.4144C19.7893 21.0394 20 20.5307 20 20.0002V13.0002M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z"
                    stroke="#38B6FF"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
          console.log("Updated:", formData);
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
        fields={modalFields}
        saveButtonText="Save Changes"
      />
    </div>
  );
};

export default ScreenScheduleManagement;
