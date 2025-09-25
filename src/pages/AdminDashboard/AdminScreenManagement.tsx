import Pagination from "@/components/Pagination";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { useState } from "react";
import ScreenDetailsModal from "./ScreenDetailsModal";
import Loading from "@/common/MapLoading";

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

function AdminScreenManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error } = useGetAllScreenQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  }) as {
    data: ApiResponse | undefined;
    isLoading: boolean;
    error: any;
  };

  const handleView = (screen: Screen) => {
    console.log(screen);
    setSelectedScreen(screen);
    setIsModalOpen(true);
  };

  const handleEdit = (screen: Screen) => {
    console.log("[v0] Edit screen:", screen.id);
  };

  const handleDelete = (screen: Screen) => {
    console.log("[v0] Delete screen:", screen.id);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#081028] p-4 md:p-6 lg:p-8">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-300">
          <h3 className="font-semibold mb-2">Error Loading Screens</h3>
          <p>Failed to fetch screen data. Please try again.</p>
        </div>
      </div>
    );
  }

  const screens = data?.data?.data || [];
  const meta = data?.data?.meta;
const totalPages =( meta?.totalPages as number )- 1 || 1;
  return (
    <div className="min-h-screen  p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Screen Management
          </h1>
          <p className="text-gray-400">
            Manage your LED screen inventory and availability
          </p>
          {meta && (
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
              <span className="bg-blue-900/30 px-3 py-1 rounded-full">
                Total: {meta.total} screens
              </span>
              <span className="bg-green-900/30 px-3 py-1 rounded-full">
                Page: {meta.page} of {meta.totalPages}
              </span>
            </div>
          )}

          {/* Add search input here */}
          <div className="mt-6">
            <input
              type="text"
              placeholder="Search screens by name ..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Screen List */}
        {screens.length > 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Screen
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Size & Resolution
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Location
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-gray-300 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {screens.map((screen, index) => (
                    <tr
                      key={screen.id}
                      className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/10"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-12 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
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
                          <div>
                            <h3 className="text-white font-medium">
                              {screen.screen_name}
                            </h3>
                            <p className="text-gray-400 text-sm truncate max-w-xs">
                              {screen.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-gray-200">
                          <div className="font-medium">
                            {screen.screen_size}
                          </div>
                          <div className="text-sm text-gray-400">
                            {screen.resolution}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center text-gray-300">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {screen.location}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-green-400 font-semibold">
                          ${screen.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 flex items-center justify-center">
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                              screen.availability === "available"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}
                          >
                            {screen.availability}
                          </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(screen)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(screen)}
                            className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-colors duration-200"
                            title="Edit Screen"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(screen)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                            title="Delete Screen"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {screens.map((screen) => (
                <div
                  key={screen.id}
                  className="border-b border-gray-700/50 last:border-b-0 p-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1">
                        {screen.screen_name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                        {screen.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <span className="text-gray-400">Size: </span>
                          <span className="text-gray-200">
                            {screen.screen_size}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Price: </span>
                          <span className="text-green-400 font-semibold">
                            ${screen.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-400">Location: </span>
                          <span className="text-gray-200">
                            {screen.location}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              screen.availability === "available"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-red-500/20 text-red-300 border border-red-500/30"
                            }`}
                          >
                            {screen.availability}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              screen.status === "active"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                            }`}
                          >
                            {screen.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleView(screen)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
                            title="View Details"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleEdit(screen)}
                            className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-colors duration-200"
                            title="Edit Screen"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(screen)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                            title="Delete Screen"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No Screens Found
            </h3>
            <p className="text-gray-400">
              There are no screens available at the moment.
            </p>
          </div>
        )}

        <ScreenDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          screen={selectedScreen}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default AdminScreenManagement;
