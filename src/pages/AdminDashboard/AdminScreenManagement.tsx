/* eslint-disable @typescript-eslint/no-explicit-any */
// import Pagination from "@/components/Pagination";
// import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
// import { useState } from "react";
// import Loading from "@/common/MapLoading";
// import AdminScreenDetails from "./AdminScreenDetails";

// interface Screen {
//   id: string;
//   slug: string;
//   screen_name: string;
//   screen_size: string;
//   description: string;
//   resolution: string;
//   lat: string;
//   lng: string;
//   img_url: string;
//   price: number;
//   availability: "available" | "unavailable";
//   status: "active" | "inactive";
//   location: string;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiResponse {
//   success: boolean;
//   message: string;
//   data: {
//     data: Screen[];
//     meta: {
//       page: number;
//       limit: number;
//       total: number;
//       totalPages: number;
//     };
//   };
// }

// function AdminScreenManagement() {
//   const [isAddScreenModalOpen, setAddScreenModalOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data, isLoading, error } = useGetAllScreenQuery({
//     page: currentPage.toString(),
//     searchTerm: searchTerm,
//   }) as {
//     data: ApiResponse | undefined;
//     isLoading: boolean;
//     error: any;
//   };

//   const handleView = (screen: Screen) => {
//     setSelectedScreen(screen);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (screen: Screen) => {
//     console.log("[v0] Edit screen:", screen.id);
//   };

//   const handleDelete = (screen: Screen) => {
//     console.log("[v0] Delete screen:", screen.id);
//   };

//   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const toggleModal = () => setAddScreenModalOpen(!isAddScreenModalOpen);

//   if (isLoading) {
//     return <Loading />;
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-[#081028] p-4 md:p-6 lg:p-8">
//         <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-300">
//           <h3 className="font-semibold mb-2">Error Loading Screens</h3>
//           <p>Failed to fetch screen data. Please try again.</p>
//         </div>
//       </div>
//     );
//   }

//   const screens = data?.data?.data || [];
//   const meta = data?.data?.meta;

//   return (
//     <div className="min-h-screen p-4 md:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Screen Management
//           </h1>
//           <p className="text-gray-400">
//             Manage your LED screen inventory and availability
//           </p>
//           {meta && (
//             <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
//               <span className="bg-blue-900/30 px-3 py-1 rounded-full">
//                 Total: {meta.total} screens
//               </span>
//               <span className="bg-green-900/30 px-3 py-1 rounded-full">
//                 Page: {meta.page} of {meta.totalPages}
//               </span>
//             </div>
//           )}

//           {/* Search input and add screen button */}
//           <div className="flex flex-col md:flex-row gap-4 justify-between">
//             <div className="mt-6">
//               <input
//                 type="text"
//                 placeholder="Search screens by name ..."
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <button
//                 onClick={toggleModal}
//                 className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//               >
//                 Add Screen
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Screen List */}
//         {screens.length > 0 ? (
//           <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden">
//             {/* Desktop Table */}
//             <div className="hidden lg:block overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-900/50 border-b border-gray-700">
//                   <tr>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Screen
//                     </th>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Size & Resolution
//                     </th>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Location
//                     </th>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Price
//                     </th>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Status
//                     </th>
//                     <th className="text-left py-4 px-6 text-gray-300 font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {screens.map((screen, index) => (
//                     <tr
//                       key={screen.id}
//                       className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-200 ${
//                         index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/10"
//                       }`}
//                     >
//                       <td className="py-4 px-6">
//                         <div className="flex items-center gap-4">
//                           <div className="w-16 h-12 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
//                             <img
//                               src={screen.img_url || "/placeholder.svg"}
//                               alt={screen.screen_name}
//                               className="w-full h-full object-cover"
//                               onError={(e) => {
//                                 const target = e.target as HTMLImageElement;
//                                 target.src = "/led-screen-placeholder.jpg";
//                               }}
//                             />
//                           </div>
//                           <div>
//                             <h3 className="text-white font-medium">
//                               {screen.screen_name}
//                             </h3>
//                             <p className="text-gray-400 text-sm truncate max-w-xs">
//                               {screen.description}
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="text-gray-200">
//                           <div className="font-medium">
//                             {screen.screen_size}
//                           </div>
//                           <div className="text-sm text-gray-400">
//                             {screen.resolution}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <div className="flex items-center text-gray-300">
//                           <svg
//                             className="w-4 h-4 mr-2 text-gray-400"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           {screen.location}
//                         </div>
//                       </td>
//                       <td className="py-4 px-6">
//                         <span className="text-green-400 font-semibold">
//                           ${screen.price.toLocaleString()}
//                         </span>
//                       </td>
//                       <td className="py-4 flex items-center justify-center">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
//                             screen.availability === "available"
//                               ? "bg-green-500/20 text-green-300 border border-green-500/30"
//                               : "bg-red-500/20 text-red-300 border border-red-500/30"
//                           }`}
//                         >
//                           {screen.availability}
//                         </span>
//                       </td>

//                       <td className="py-4 px-6">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => handleView(screen)}
//                             className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors duration-200"
//                             title="View Details"
//                           >
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                               />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleEdit(screen)}
//                             className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-colors duration-200"
//                             title="Edit Screen"
//                           >
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                               />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => handleDelete(screen)}
//                             className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
//                             title="Delete Screen"
//                           >
//                             <svg
//                               className="w-5 h-5"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         ) : (
//           <div className="text-gray-500 text-center py-8">
//             No screens found for this search.
//           </div>
//         )}

//         {/* Pagination */}
//         {meta && (
//           <Pagination
//             totalPages={meta.totalPages}
//             currentPage={meta.page}
//             onPageChange={(page) => setCurrentPage(page)}
//           />
//         )}
//       </div>

//       {/* Modal for screen details */}
//       {isModalOpen && selectedScreen && (
//         <AdminScreenDetails
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           screen={selectedScreen}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminScreenManagement;

import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import {
  useDeleteScreenMutation,
  useGetAllScreenQuery,
} from "@/store/api/Screen/screenApi";
import { useState } from "react";
import { toast } from "sonner";
import AdminScreenDetails from "./AdminScreenDetails";

// Confirm Delete Modal
const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}) => {
  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
          <h2 className="text-2xl text-white mb-4">Confirm Deletion</h2>
          <p className="text-gray-400">
            Are you sure you want to delete this screen?
          </p>
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={onClose}
              className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  );
};

function AdminScreenManagement() {
  const [isAddScreenModalOpen, setAddScreenModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [screenToDelete, setScreenToDelete] = useState<any | null>(null); // State to store the screen being deleted
  const [deleteScreen] = useDeleteScreenMutation();
  const { data, isLoading, error } = useGetAllScreenQuery({
    page: currentPage.toString(),
    searchTerm: searchTerm,
  }) as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const handleView = (screen: Screen) => {
    setSelectedScreen(screen);
    setIsModalOpen(true);
  };


  const handleDelete = (screen: Screen) => {
    setScreenToDelete(screen); // Set the screen to be deleted
    setDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const confirmDelete = async () => {
    if (screenToDelete) {
     
      // Replace with your actual delete logic here (API call)
      try {
        await deleteScreen(screenToDelete.id).unwrap();
      
        toast.success("Screen Deleted Successfully...", { duration: 1000 });
      } catch (error) {
        console.error("Error deleting screen:", error);
      }
    }
    setDeleteModalOpen(false); // Close the delete modal after confirming
    setScreenToDelete(null); // Reset the screen to be deleted
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleModal = () => setAddScreenModalOpen(!isAddScreenModalOpen);

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

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
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

          {/* Search input and add screen button */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search screens by name ..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <button
                onClick={toggleModal}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Add Screen
              </button>
            </div>
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
                              d="M4 10a1 1 0 011-1h4V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {screen.location}
                        </div>
                      </td>
                      <td className="py-4 px-6">{screen.price}</td>
                      <td>
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
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleView(screen)}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          >
                            View
                          </button>
                         
                          <button
                            onClick={() => handleDelete(screen)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-4">
            No screens found.
          </div>
        )}

        {/* Pagination */}
        {meta && (
          <Pagination
            currentPage={currentPage}
            totalPages={meta.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {isModalOpen && selectedScreen && (
        <AdminScreenDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          screen={selectedScreen}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDelete}
      />
    </div>
  );
}

export default AdminScreenManagement;
