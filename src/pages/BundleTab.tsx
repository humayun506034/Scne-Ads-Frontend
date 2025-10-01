import { useState } from "react";
import { useGetAllBundleQuery } from "@/store/api/Bundle/bundleApi";
import BundleDetailsModal from "./BundleDetailsModal";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";

const BundleTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetAllBundleQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  });

  const bundles = data?.data?.data || [];

  const [selectedBundle, setSelectedBundle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (bundle: any) => {
    setSelectedBundle(bundle);
    setIsModalOpen(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const meta = data?.data?.meta;
  const totalPages = (meta?.totalPages as number) || 1;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-red-400 text-center py-10">
        Failed to load bundles.
      </div>
    );
  }

  return (
    <>
      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search bundles by name ..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-gray-800/60 rounded-xl border border-gray-700 p-4 flex flex-col hover:shadow-lg hover:shadow-blue-500/10 transition"
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img
                src={bundle.img_url || "/placeholder.svg"}
                alt={bundle.bundle_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/led-screen-placeholder.jpg";
                }}
              />
            </div>

            {/* Title & Price */}
            <div className="mb-2 flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg truncate">
                {bundle.bundle_name}
              </h3>
              <span className="text-green-400 font-semibold">
                ${bundle.price}
              </span>
            </div>

            {/* Status + Duration */}
            <div className="flex justify-between items-center text-sm text-gray-300 mb-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  bundle.status === "ongoing"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                }`}
              >
                {bundle.status}
              </span>
              <span className="text-blue-300 text-xs">{bundle.duration}</span>
            </div>

            {/* Location */}
            <p className="text-gray-400 text-sm mb-3">📍 {bundle.location}</p>

            {/* Screens Summary */}
            <div className="text-gray-300 text-xs mb-3">
              <p className="font-medium mb-1">
                Included Screens: {bundle.screens.length} Screen
              </p>
              <ul className="list-disc pl-4 space-y-1">
                {bundle.screens.slice(0, 2).map((screen:any) => (
                  <li key={screen.id}>{screen.screen_name}</li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <button
              onClick={() => handleOpenModal(bundle)}
              className="mt-auto w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
            >
              View Bundle
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Bundle Details Modal */}
      <BundleDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bundle={selectedBundle}
        // onCreateCampaign={handleCreateCampaign}
      />
    </>
  );
};

export default BundleTab;
