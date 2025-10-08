import { useState } from "react";
import { useAllBundlePaymentQuery } from "@/store/api/Payment/paymentApi";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye } from "lucide-react"; // Import the Eye icon from lucide-react
import Loading from "@/common/MapLoading";
import Pagination from "@/components/Pagination";
import BundlePaymentDetailsModal from "./BundlePaymentDetailsModal";

const AllBundlePayments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const queryParams: Record<string, string> = {
    page: currentPage.toString(),
  };

  const { data, isLoading } = useAllBundlePaymentQuery(queryParams);
  const payments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleOpenModal = (payment: any) => {
    setSelectedPayment(payment);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto text-white">
      <h2 className="text-2xl font-semibold mb-6">All Bundle Payments</h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full shadow-md rounded-lg overflow-hidden bg-gray-900 text-white">
            <thead className="bg-gray-800 text-left text-gray-300">
              <tr>
                <th className="px-4 py-3">Bundle</th>
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
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-4 py-3 font-medium flex items-center gap-3">
                    <img
                      src={payment.bundle.img_url}
                      alt={payment.bundle.bundle_name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{payment.bundle.bundle_name}</span>
                  </td>
                  <td className="px-4 py-3">${payment.amount}</td>
                  <td className="px-4 py-3 capitalize">
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
                  <td className="px-4 py-3">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <button
                          onClick={() => handleOpenModal(payment)}
                          className="text-sm text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                        >
                          <Eye className="w-5 h-5 inline-block mr-1" />
                        
                        </button>
                      </Dialog.Trigger>
                    </Dialog.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal for Payment Details */}
      {selectedPayment && (
        <BundlePaymentDetailsModal
          selectedPayment={selectedPayment}
          closeModal={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default AllBundlePayments;
