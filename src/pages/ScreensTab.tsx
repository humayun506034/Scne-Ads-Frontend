import { useState } from "react";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import Loading from "@/common/MapLoading";
import ScreenDetailsModal from "./AdminDashboard/ScreenDetailsModal";
import Pagination from "@/components/Pagination";
import CreateCampaignModal from "@/components/Shared/CreateCampaignModal";
import { useMakeScreenPaymentMutation } from "@/store/api/Payment/paymentApi";
import { toast } from "sonner";

interface Screen {
  id: string;
  slug: string;
  screen_name: string;
  screen_size: string;
  description: string;
  resolution: string;
  lat: string;
  lng: string;
  img_url: string;
  price: number;
  availability: "available" | "unavailable";
  status: "active" | "inactive";
  location: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Screen[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

function ScreensTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data, isLoading, error } = useGetAllScreenQuery(
    {
      page: currentPage.toString(),
      searchTerm: searchTerm,
    },
  ) as {
    data: ApiResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleView = (screen: Screen) => {
    setSelectedScreen(screen);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedScreen(null);
  };

  const handleCreateCampaign = () => {
    setIsCreateModalOpen(true);
  };

  const [makeScreenPayment] =
    useMakeScreenPaymentMutation();
  const handleSaveCampaign = async (data: any) => {
    const formattedData = {
      ...data,
      startDate: data.startDate.includes("T")
        ? data.startDate
        : `${data.startDate}T00:00:00.000Z`,
      endDate: data.endDate.includes("T")
        ? data.endDate
        : `${data.endDate}T00:00:00.000Z`,
    };

    const { image, ...restData } = formattedData;

    const formData = new FormData();
    formData.append("data", JSON.stringify(restData));
    formData.append("file1", image);

    // Show toast while request is in progress
    const loadingToastId = toast.loading("Creating payment session...");

    try {
      const res = await makeScreenPayment(formData).unwrap();
      toast.dismiss(loadingToastId); // remove loading toast

      if (res.success && res.data?.url) {
        toast.success("Redirecting to payment...", { duration: 1000 });

        // Delay slightly before redirecting (so toast can show)
        setTimeout(() => {
          window.location.href = res.data.url;
        }, 1000); // 1 second delay
      }
    } catch (err) {
      toast.dismiss(loadingToastId);
      console.error("Failed:", err);
      toast.error("Payment setup failed!");
    }
  };


  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#081028] p-6 flex justify-center items-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-300 max-w-md text-center">
          <h3 className="font-semibold mb-2">Error Loading Data</h3>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  const screens = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = (meta?.totalPages as number) || 1;

  return (
    <div>
      {/* <Navbar /> */}
      <div className="min-h-screen  p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

           {/* Search */}
             <div className="mb-10">
              <input
                type="text"
                placeholder="Search screens by name ..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
   

     
          <>
              {screens.length > 0 ? (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {screens.map((screen) => (
                    <div
                      key={screen.id}
                      className="bg-gray-800/60 rounded-xl border border-gray-700 p-4 flex flex-col hover:shadow-lg hover:shadow-blue-500/10 transition"
                    >
                      <div className="w-full h-40 bg-gray-900 rounded-lg overflow-hidden mb-4">
                        <img
                          src={screen.img_url || "/placeholder.svg"}
                          alt={screen.screen_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/led-screen-placeholder.jpg";
                          }}
                        />
                      </div>
                      <h3 className="text-white font-semibold text-lg">
                        {screen.screen_name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {screen.description}
                      </p>

                      <div className="flex justify-between items-center text-sm text-gray-300 mb-3">
                        <span>{screen.screen_size}</span>
                        <span className="text-green-400 font-semibold">
                          ${screen.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            screen.availability === "available"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-red-500/20 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {screen.availability}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            screen.status === "active"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                          }`}
                        >
                          {screen.status}
                        </span>
                      </div>

                      <button
                        onClick={() => handleView(screen)}
                        className="w-full py-2 mb-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  No screens found.
                </div>
              )}

              <div className="flex justify-end mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
        
        </div>

        {/* Screen Modal */}
        <ScreenDetailsModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          screen={selectedScreen}
          onCreateCampaign={handleCreateCampaign}
        />

        {/* Create Campaign Modal */}
        <CreateCampaignModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          screenId={selectedScreen?.id || ""}
          onSubmit={handleSaveCampaign}
        />
      </div>
    </div>
  );
}

export default ScreensTab;
