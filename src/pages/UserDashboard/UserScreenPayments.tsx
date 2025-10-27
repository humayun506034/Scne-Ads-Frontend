"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { useMySelfScreenPaymentQuery } from "@/store/api/Payment/paymentApi";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import UserScreenPaymentDetailsModal from "./UserScreenPaymentsModal";

const UserScreenPayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const queryParams: Record<string, string> = { page: currentPage.toString() };
  const { data, isLoading } = useMySelfScreenPaymentQuery(queryParams);

  const payments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;

  const openModal = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedPayment(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 text-white">
      <h2 className="text-2xl font-bold border-b border-[#11214D] pb-2">
        My Screen Payments
      </h2>

      {/* Table */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-[#11214D] bg-bg-dashboard overflow-hidden">
          <table className="min-w-full divide-y divide-slate-800/40">
            <thead>
              <tr className="text-left text-[#38B6FF]">
                <th className="py-3 px-4">Screen Name</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                >
                  {/* Screen Name */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    {payment.screens?.[0] && (
                      <img
                        src={payment.screens[0].imageUrls?.[0]?.url}
                        alt={payment.screens[0].screen_name}
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    <span>{payment.screens?.[0]?.screen_name}</span>
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-4">
                    ${payment.screens?.[0]?.price || payment.amount}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4 capitalize">
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
                  <td className="py-3 px-4">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4">
                    <Eye
                      className="w-4 h-4 text-[#38B6FF] cursor-pointer hover:scale-125 transition-transform"
                      onClick={() => openModal(payment)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment: any) => (
          <div
            key={payment.id}
            className="border border-[#11214D] rounded-lg bg-bg-dashboard p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-[#38B6FF] text-sm">
                {payment.screens?.[0]?.screen_name}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  payment.status === "success"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {payment.status}
              </span>
            </div>

            <div className="text-xs text-[#AEB9E1] space-y-1">
              <p>
                <span className="text-[#AEB9E1]/50">Amount:</span>{" "}
                ${payment.amount}
              </p>
              <p>
                <span className="text-[#AEB9E1]/50">Date:</span>{" "}
                {new Date(payment.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={() => openModal(payment)}
                className="px-3 py-1.5 text-xs bg-[#38B6FF] text-black font-semibold rounded hover:bg-[#5cc4ff] transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal */}
      {isDetailsModalOpen && selectedPayment && (
        <UserScreenPaymentDetailsModal
          selectedPayment={selectedPayment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default UserScreenPayments;
