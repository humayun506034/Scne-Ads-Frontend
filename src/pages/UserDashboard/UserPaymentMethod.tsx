
import React, { useState } from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonDashboardButton from "@/common/CommonDashBoardButton";


// Payment Method Modal Component
const PaymentMethodModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    postalCode: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits and limit to 16 characters
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    // Add spaces every 4 digits
    return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpirationDate = (value: string) => {
    // Remove all non-digits and limit to 4 characters
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    // Add slash after 2 digits
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    return cleaned;
  };

  const handleSavePayment = () => {
    console.log('Saving payment method:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-[#081028] rounded-3xl p-8 w-[400px] shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#E4E7EC] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Card Number */}
        <div className="mb-6">
          <label className="block text-[#E4E7EC] text-sm font-medium mb-3">
            Card Number
          </label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className="w-full bg-[#0B1739] border border-[#2D3748] rounded-lg px-4 py-3 text-[#E4E7EC] placeholder-[#718096] focus:outline-none focus:border-[#3182CE] transition-colors"
            maxLength={19}
          />
        </div>

        {/* Row with Expiration Date, CVV, and Postal Code */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Expiration Date */}
          <div>
            <label className="block text-[#E4E7EC] text-sm font-medium mb-3">
              Expiration Date
            </label>
            <input
              type="text"
              value={formData.expirationDate}
              onChange={(e) => handleInputChange('expirationDate', formatExpirationDate(e.target.value))}
              placeholder="MM/YY"
              className="w-full bg-[#0B1739] border border-[#2D3748] rounded-lg px-4 py-3 text-[#E4E7EC] placeholder-[#718096] focus:outline-none focus:border-[#3182CE] transition-colors"
              maxLength={5}
            />
          </div>

          {/* CVV */}
          <div>
            <label className="block text-[#E4E7EC] text-sm font-medium mb-3">
              CVV
            </label>
            <input
              type="text"
              value={formData.cvv}
              onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="•••"
              className="w-full bg-[#0B1739] border border-[#2D3748] rounded-lg px-4 py-3 text-[#E4E7EC] placeholder-[#718096] focus:outline-none focus:border-[#3182CE] transition-colors"
              maxLength={4}
            />
          </div>

          {/* Postal Code */}
          <div>
            <label className="block text-[#E4E7EC] text-sm font-medium mb-3">
              Postal Code
            </label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value.slice(0, 10))}
              placeholder="12345"
              className="w-full bg-[#0B1739] border border-[#2D3748] rounded-lg px-4 py-3 text-[#E4E7EC] placeholder-[#718096] focus:outline-none focus:border-[#3182CE] transition-colors"
              maxLength={10}
            />
          </div>
        </div>

        {/* Save Payment Button */}
        <div>
            <CommonDashboardButton title="Save Payment" />
        </div>
      </div>
    </div>
  );
};

const UserPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPaymentMethod = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-bg-dashboard">
      <UserPanelNavbar />
      
      <div className="w-full mt-20 p-6 flex items-center justify-center">
        <div className="w-md rounded-3xl bg-[#0B1739] px-14 py-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <div className="p-1 gap-4">
            <h3 className="text-xl mb-3 text-center font-normal text-[#E4E7EC]">
              You Have no payment methods.
            </h3>
            <p className="text-sm text-center text-[#C3CEE9]">
              In order to create a campaign you must add a primary payment method.
            </p>
          </div>
          <div className="mt-4">
            <div onClick={handleAddPaymentMethod}>
              <CommonDashboardButton
                title="Add Payment Method"
                className="px-10 py-2 mt-4 text-xl font-semibold cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default UserPanel;