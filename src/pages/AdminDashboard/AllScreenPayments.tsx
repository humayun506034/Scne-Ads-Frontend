/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { useAllScreenPaymentQuery } from "@/store/api/Payment/paymentApi";
import { motion } from 'framer-motion';
import { Eye } from "lucide-react";
import { useState } from "react";
import ScreenPaymentDetailsModal from "./ScreenPaymentDetailsModal";

const AllScreenPayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };

  const { data, isLoading } = useAllScreenPaymentQuery(queryParams);
  const payments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const TotalPages = meta?.totalPages || 1;

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="p-6 text-white min-h-[90vh] md:mt-10">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium text-[#AEB9E1] mb-6 lg:mb-8 relative">
        All Screen Payments
      </h2>

      {isLoading ? (
         <Loading />
       ) : (
         <div className="overflow-x-auto rounded-lg border border-[#11214D] bg-bg-dashboard">
           <table className="divide-y w-full divide-slate-800/40">
             <thead className="text-left text-[#38B6FF] hidden md:table-header-group">
               <tr>
                 <th className="px-4 py-3">Screen</th>
                 <th className="px-4 py-3">Customer Email</th>
                 <th className="px-4 py-3">Amount</th>
                 <th className="px-4 py-3">Status</th>
                 <th className="px-4 py-3">Date</th>
                 <th className="px-4 py-3 text-center">Actions</th>
               </tr>
             </thead>
             <tbody>
               {payments.map((payment: any) => {
               
                 return <tr key={payment.id} className="border-b border-gray-700 hover:bg-[#11214D]/30 transition-colors block md:table-row">
              
                   <td className="px-4 py-3 font-medium flex items-center gap-3 ">
                     {payment.screens?.[0] && (
                       <img
                         src={payment.screens[0].imageUrls[0]?.url }
                         alt={payment.screens[0].screen_name}
                         className="w-10 h-10 object-cover rounded"
                       />
                     )}
                     <span>{payment.screens?.[0]?.screen_name}</span>
                   </td>

                   {/* Customer Email */}
                   <td className="px-4 py-3  md:table-cell">
                  <span className="inline md:hidden font-medium text-[#38B6FF]md:hidden mr-2">Customer Email :</span>   {payment.user?.email}
                   </td>

                   {/* Amount */}
                   <td className="px-4 py-3 md:table-cell">
                     <span className="inline  font-medium text-[#38B6FF] mr-2">Amount:</span>
                     ${payment.amount}
                   </td>

                   {/* Status */}
                   <td className="px-4 py-3 capitalize md:table-cell">
                     <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Status:</span>
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
                   <td className="px-4 py-3 md:table-cell">
                     <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Date:</span>
                     {new Date(payment.createdAt).toLocaleDateString()}
                   </td>

                   {/* Actions */}
                   <td className="px-4 py-3 text-center md:table-cell">
                     <motion.button
                       whileHover={{ scale: 1.2 }}
                       whileTap={{ scale: 0.9 }}
                       
                       onClick={() => handleViewDetails(payment)}
                       className="text-sm text-[#38B6FF]  flex items-center cursor-pointer justify-center gap-1 mx-auto"
                     >
                       <Eye className="w-4 h-4" />
                  
                     </motion.button>
                   </td>
                 </tr>;
               })}
             </tbody>
           </table>
         </div>
      )
    }
      <div className="flex justify-between items-center mt-6 mb-4">
        <div></div>
        <Pagination
          currentPage={currentPage}
          totalPages={TotalPages}
          onPageChange={setCurrentPage}
        />
      </div>
 
      
  

   
      {isDetailsModalOpen && selectedPayment && (
        <ScreenPaymentDetailsModal
          selectedPayment={selectedPayment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default AllScreenPayments;
