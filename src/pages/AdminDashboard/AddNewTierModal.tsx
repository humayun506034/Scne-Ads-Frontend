import CommonModalForm, { Field } from "@/common/CommonModalForm";
import React, { useState } from "react";

interface AddTierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddNewTierModal: React.FC<AddTierModalProps> = ({ isOpen, onClose }) => {
  // Initial form data
  const [formData, setFormData] = useState({
    tierName: "",
    cppAdjustment: "",
  });

  // Define dynamic fields for the form
  const fields: Field[] = [
    {
      name: "tierName",
      type: "input",
      label: "Tier Name",
      placeholder: "Tier 4",
      required: true,
    },
    {
      name: "cppAdjustment",
      type: "input",
      label: "CPP Adjustment (BSD)",
      placeholder: "0.00",
      required: true,
    },
  ];

  // Save handler
  const handleSave = (data: typeof formData) => {
    setFormData(data); // update local state if needed
    onClose();
  };

  // Cancel handler
  const handleCancel = () => {

    onClose();
  };

  if (!isOpen) return null;

  return (
    <CommonModalForm
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Tier"
      formData={formData}
      onSave={handleSave}
      onCancel={handleCancel}
      fields={fields}
      saveButtonText="Add Tier"
    />
  );
};

export default AddNewTierModal;
