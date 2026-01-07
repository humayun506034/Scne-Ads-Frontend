/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import CommonHeader from "@/common/CommonHeader";
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import { useMySelfBundlePaymentQuery } from "@/store/api/Payment/paymentApi";
import { Eye } from "lucide-react";
import { useState } from "react";
import UserBundlePaymentDetailsModal from "./UserBundlePaymentDetailsModal";

const UserBundlePayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const queryParams: Record<string, string> = { page: currentPage.toString() };
  const { data, isLoading } = useMySelfBundlePaymentQuery(queryParams);

  const payments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;

  const openModal = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setIsDetailsModalOpen(false);
  };



  return (
    <div className="p-6 space-y-6 text-white">
     <CommonHeader title="My Bundle Payments" />

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="rounded-lg border border-[#11214D] bg-bg-dashboard overflow-hidden">
          <table className="min-w-full divide-y divide-slate-800/40">
            <thead>
              <tr className="text-left text-[#38B6FF]">
                <th className="py-3 px-4">Bundle</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
    <tr>
      <td colSpan={5}>
        <div className="flex items-center justify-center py-24">
          <Loading />
        </div>
      </td>
    </tr>
  ) :(
     payments.map((payment: any) => (
                <tr
                  key={payment.id}
                  className="border-b border-slate-800/40 last:border-0 text-[#AEB9E1]"
                >
                  {/* Bundle Info */}
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={payment.bundle?.img_url}
                      alt={payment.bundle?.bundle_name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{payment.bundle?.bundle_name}</span>
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-4">${payment.amount}</td>

                  {/* Status */}
                  <td className="py-3 px-4 capitalize">
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
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {payments.map((payment: any) => (
          <div
            key={payment.id}
            className="border border-[#11214D] rounded-lg bg-bg-dashboard p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-[#38B6FF] text-sm">
                {payment.bundle?.bundle_name}
              </span>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  payment.status === "success"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-yellow-600/20 text-yellow-400"
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

      {/* Details Modal */}
      {isDetailsModalOpen && selectedPayment && (
        <UserBundlePaymentDetailsModal
          selectedPayment={selectedPayment}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default UserBundlePayments;
