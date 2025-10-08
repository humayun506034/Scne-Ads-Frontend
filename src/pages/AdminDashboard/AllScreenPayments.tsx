// "use client";

// import { useState } from "react";
// import { useAllScreenPaymentQuery } from "@/store/api/Payment/paymentApi";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Eye, X } from "lucide-react";
// import Loading from "@/common/MapLoading";
// import Pagination from "@/components/Pagination";

// const AllScreenPayments = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   const queryParams: Record<string, string> = {
//     page: currentPage.toString(),
//   };

//   const { data, isLoading } = useAllScreenPaymentQuery(queryParams);
//   const payments = data?.data?.data || [];
//   const [selectedPayment, setSelectedPayment] = useState<any>(null);

//   console.log("payments", payments);
//   const meta = data?.data?.meta;
//   const TotalPages = meta?.totalPages || 1;

//   return (
//     <div className="p-4 max-w-7xl mx-auto text-white">
//       <h2 className="text-2xl font-semibold mb-6">All Screen Payments</h2>

//       {isLoading ? (
//         <Loading />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full shadow-md rounded-lg overflow-hidden bg-gray-900 text-white">
//             <thead className="bg-gray-800 text-left text-gray-300">
//               <tr>
//                 <th className="px-4 py-3">Screens</th>
//                 <th className="px-4 py-3">Amount</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {payments.map((payment: any) => (
//                 <tr key={payment.id} className="border-b border-gray-700">
//                   {/* Screen info short view */}
//                   <td className="px-4 py-3 font-medium flex items-center gap-3">
//                     {payment.screens?.[0] && (
//                       <img
//                         src={payment.screens[0].img_url}
//                         alt={payment.screens[0].screen_name}
//                         className="w-10 h-10 object-cover rounded"
//                       />
//                     )}
//                     <span>{payment.screens?.[0]?.screen_name}</span>
//                   </td>

//                   {/* Amount */}
//                   <td className="px-4 py-3">${payment.amount}</td>

//                   {/* Status */}
//                   <td className="px-4 py-3 capitalize">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${
//                         payment.status === "success"
//                           ? "bg-green-600/20 text-green-400"
//                           : "bg-red-600/20 text-red-400"
//                       }`}
//                     >
//                       {payment.status}
//                     </span>
//                   </td>

//                   {/* Date */}
//                   <td className="px-4 py-3">
//                     {new Date(payment.createdAt).toLocaleDateString()}
//                   </td>

//                   {/* Actions */}
//                   <td className="px-4 py-3 text-center">
//                     <Dialog.Root>
//                       <Dialog.Trigger asChild>
//                         <button
//                           onClick={() => setSelectedPayment(payment)}
//                           className="text-sm  text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
//                         >
//                           <Eye className="w-5 h-5 inline-block mr-1" />
//                         </button>
//                       </Dialog.Trigger>
                      

//                       <Dialog.Portal>
//                         <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
//                         <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-lg p-6 shadow-lg">
//                           <Dialog.Title className="text-2xl font-bold mb-6">
//                             Payment Details
//                           </Dialog.Title>

//                           {/* Payment Info */}
//                           <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
//                             <h4 className="font-semibold text-lg mb-2">
//                               Payment Information
//                             </h4>
//                             <p>
//                               <strong>ID:</strong> {selectedPayment?.id}
//                             </p>
//                             <p>
//                               <strong>Transaction ID:</strong>{" "}
//                               {selectedPayment?.transactionId}
//                             </p>
//                             <p>
//                               <strong>Amount:</strong> $
//                               {selectedPayment?.amount}
//                             </p>
//                             <p>
//                               <strong>Status:</strong> {selectedPayment?.status}
//                             </p>
//                             <p>
//                               <strong>Purchased:</strong>{" "}
//                               {new Date(
//                                 selectedPayment?.createdAt
//                               ).toLocaleString()}
//                             </p>
//                           </div>

//                           {/* User Info */}
//                           <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
//                             <h4 className="font-semibold text-lg mb-2">
//                               Customer Information
//                             </h4>
//                             <p>
//                               <strong>Name:</strong>{" "}
//                               {selectedPayment?.user.first_name}{" "}
//                               {selectedPayment?.user.last_name}
//                             </p>
//                             <p>
//                               <strong>Email:</strong>{" "}
//                               {selectedPayment?.user.email}
//                             </p>
//                             <p>
//                               <strong>User ID:</strong>{" "}
//                               {selectedPayment?.user.id}
//                             </p>
//                           </div>

//                           {/* Screens */}
//                           <div className="mt-6">
//                             <h4 className="font-semibold text-lg mb-4">
//                               Screens
//                             </h4>
//                             <div className="grid sm:grid-cols-2 gap-4">
//                               {selectedPayment?.screens?.map((screen: any) => (
//                                 <div
//                                   key={screen.id}
//                                   className="border rounded p-3 bg-gray-800"
//                                 >
//                                   <img
//                                     src={screen.img_url}
//                                     alt={screen.screen_name}
//                                     className="w-full h-24 object-cover rounded mb-2"
//                                   />
//                                   <p className="text-sm font-medium">
//                                     {screen.screen_name}
//                                   </p>
//                                   <p className="text-xs text-gray-400">
//                                     {screen.location}
//                                   </p>
//                                   <p className="text-xs text-gray-400">
//                                     Size: {screen.screen_size}
//                                   </p>
//                                   <p className="text-xs text-gray-400">
//                                     Price: {screen.price}$ Per Day
//                                   </p>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Uploaded Contents */}
//                           <div className="mt-6">
//                             <h4 className="font-semibold text-lg mb-4">
//                               Uploaded Contents
//                             </h4>
//                             <div className="grid sm:grid-cols-2 gap-4">
//                               {selectedPayment?.contents?.map(
//                                 (content: any) => (
//                                   <div
//                                     key={content.id}
//                                     className="border rounded p-2 bg-gray-800"
//                                   >
//                                     <a
//                                       href={content.url}
//                                       target="_blank"
//                                       rel="noopener noreferrer"
//                                     >
//                                       {content.url.endsWith(".mp4") ? (
//                                         <video
//                                           controls
//                                           className="w-full h-32 object-cover rounded"
//                                         >
//                                           <source
//                                             src={content.url}
//                                             type="video/mp4"
//                                           />
//                                         </video>
//                                       ) : (
//                                         <img
//                                           src={content.url}
//                                           alt="Uploaded Content"
//                                           className="w-full h-32 object-cover rounded"
//                                         />
//                                       )}
//                                     </a>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>

//                           <Dialog.Close asChild>
//                             <button
//                               className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-gray-700"
//                               aria-label="Close"
//                             >
//                               <X size={20} />
//                             </button>
//                           </Dialog.Close>
//                         </Dialog.Content>
//                       </Dialog.Portal>
//                     </Dialog.Root>
//                   </td>

                  
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       <div className="flex justify-end mt-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={TotalPages}
//           onPageChange={setCurrentPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default AllScreenPayments;


"use client";

import { useState } from "react";
import { useAllScreenPaymentQuery } from "@/store/api/Payment/paymentApi";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, X } from "lucide-react";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";

const AllScreenPayments = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };

  const { data, isLoading } = useAllScreenPaymentQuery(queryParams);
  const payments = data?.data?.data || [];
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  console.log("payments", payments);
  const meta = data?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  return (
    <div className="p-4 max-w-7xl mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-6">All Screen Payments</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md rounded-lg overflow-hidden bg-gray-900 text-white">
            <thead className="bg-gray-800 text-left text-gray-300">
              <tr>
                <th className="px-4 py-3">Screens</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: any) => (
                <tr key={payment.id} className="border-b border-gray-700">
                  {/* Screen info short view */}
                  <td className="px-4 py-3 font-medium flex items-center gap-3">
                    {payment.screens?.[0] && (
                      <img
                        src={payment.screens[0].img_url}
                        alt={payment.screens[0].screen_name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span>{payment.screens?.[0]?.screen_name}</span>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3">${payment.amount}</td>

                  {/* Status */}
                  <td className="px-4 py-3 capitalize">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === "success"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="text-sm  text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                        >
                          <Eye className="w-5 h-5 inline-block mr-1" />
                        </button>
                      </Dialog.Trigger>

                      {/* Payment Detail Modal */}
                      <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
                        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-lg p-6 shadow-lg">
                          <Dialog.Title className="text-2xl font-bold mb-6">
                            Payment Details
                          </Dialog.Title>

                          {/* Payment Info */}
                          <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
                            <h4 className="font-semibold text-lg mb-2">
                              Payment Information
                            </h4>
                            <p>
                              <strong>ID:</strong> {selectedPayment?.id}
                            </p>
                            <p>
                              <strong>Transaction ID:</strong>{" "}
                              {selectedPayment?.transactionId}
                            </p>
                            <p>
                              <strong>Amount:</strong> ${selectedPayment?.amount}
                            </p>
                            <p>
                              <strong>Status:</strong> {selectedPayment?.status}
                            </p>
                            <p>
                              <strong>Purchased:</strong>{" "}
                              {new Date(
                                selectedPayment?.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>

                          {/* Customer Info */}
                          <div className="space-y-2 text-sm bg-gray-800 p-4 rounded-lg mb-6">
                            <h4 className="font-semibold text-lg mb-2">
                              Customer Information
                            </h4>
                            <p>
                              <strong>Name:</strong>{" "}
                              {selectedPayment?.user.first_name}{" "}
                              {selectedPayment?.user.last_name}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {selectedPayment?.user.email}
                            </p>
                            <p>
                              <strong>User ID:</strong>{" "}
                              {selectedPayment?.user.id}
                            </p>
                          </div>

                          {/* Screens */}
                          <div className="mt-6">
                            <h4 className="font-semibold text-lg mb-4">
                              Screens
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {selectedPayment?.screens?.map((screen: any) => (
                                <div
                                  key={screen.id}
                                  className="border rounded p-3 bg-gray-800"
                                >
                                  <img
                                    src={screen.img_url}
                                    alt={screen.screen_name}
                                    className="w-full h-24 object-cover rounded mb-2"
                                  />
                                  <p className="text-sm font-medium">
                                    {screen.screen_name}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {screen.location}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Size: {screen.screen_size}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    Price: {screen.price}$ Per Day
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Uploaded Content */}
                          <div className="mt-6">
                            <h4 className="font-semibold text-lg mb-4">
                              Uploaded Content
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                              {selectedPayment?.contentUrls?.map(
                                (contentUrl: string, index: number) => (
                                  <div
                                    key={index}
                                    className="border rounded p-2 bg-gray-800"
                                  >
                                    <a
                                      href={contentUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {contentUrl.endsWith(".mp4") ? (
                                        <video
                                          controls
                                          className="w-full h-32 object-cover rounded"
                                        >
                                          <source
                                            src={contentUrl}
                                            type="video/mp4"
                                          />
                                        </video>
                                      ) : (
                                        <img
                                          src={contentUrl}
                                          alt="Uploaded Content"
                                          className="w-full h-32 object-cover rounded"
                                        />
                                      )}
                                    </a>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Close Button */}
                          <Dialog.Close asChild>
                            <button
                              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full p-2 text-gray-300 hover:bg-gray-700"
                              aria-label="Close"
                            >
                              <X size={20} />
                            </button>
                          </Dialog.Close>
                        </Dialog.Content>
                      </Dialog.Portal>
                    </Dialog.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={TotalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllScreenPayments;
