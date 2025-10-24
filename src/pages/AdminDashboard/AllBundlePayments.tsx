/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { useAllBundlePaymentQuery } from "@/store/api/Payment/paymentApi";
import { motion } from 'framer-motion';
import { Eye } from "lucide-react";
import { useState } from "react";
import BundlePaymentDetailsModal from "./BundlePaymentDetailsModal";

const AllBundlePayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };

  const { data, isLoading } = useAllBundlePaymentQuery(queryParams);

  const payments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

  return (
    <div className="p-6  min-h-[90dvh]  text-white md:mt-10">
      <h2 className="text-xl sm:text-2xl lg:text-4xl font-medium text-[#AEB9E1] mb-6 lg:mb-8 relative">
    All Bundle Payments 
  </h2>


      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#11214D] bg-bg-dashboard">
          <table className="divide-y w-full divide-slate-800/40">
            <thead className="text-left text-[#38B6FF] hidden md:table-header-group">
              <tr>
                <th className="px-4 py-3">Bundle</th>
                <th className="px-4 py-3">Customer Email</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-700 hover:bg-[#11214D]/30 transition-colors block md:table-row"
                >
                  <td className="px-4 py-3 font-medium flex items-center gap-3 ">
                    <img
                      src={payment.bundle.img_url}
                      alt={payment.bundle.bundle_name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{payment.bundle.bundle_name}</span>
                  </td>
                  <td className="px-4 py-3  md:table-cell">
                <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Customer Email:</span>    {payment.user.email}
                  </td>
                  <td className="px-4 py-3 md:table-cell">
                    <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Amount:</span>
                    ${payment.amount}
                  </td>
                  <td className="px-4 py-3 capitalize md:table-cell">
                    <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Status:</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        payment.status === "success"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 md:table-cell">
                    <span className="inline md:hidden font-medium text-[#38B6FF] mr-2">Date:</span>
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center md:table-cell">
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleViewDetails(payment)}
                      className="text-sm  rounded text-secondary-color cursor-pointer  flex items-center justify-center gap-1 mx-auto"
                    >
                      <Eye className="w-4 h-4" />
                      
                    </motion.button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 mb-4">
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Payment Details Modal */}
      {isDetailsModalOpen && selectedPayment && (
        <BundlePaymentDetailsModal
          selectedPayment={selectedPayment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default AllBundlePayments;
