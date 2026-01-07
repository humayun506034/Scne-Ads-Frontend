/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonModalForm, { Field } from "@/common/CommonModalForm";
import React, { useState } from "react";

interface AddNewScreenProps {
  onClose: () => void;
}

const AddNewScreenModal: React.FC<AddNewScreenProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    screenName: "",
    location: "",
    description: "",
    baseCpp: "",
    assignedTier: "",
  });

  const fields: Field[] = [
    {
      name: "screenName",
      type: "input",
      label: "Screen Name",
      placeholder: "New City Display",
      required: true,
    },
    {
      name: "location",
      type: "input",
      label: "Location",
      placeholder: "Downtown Plaza",
      required: true,
    },
    {
      name: "baseCpp",
      type: "input",
      label: "Base CPP ($)",
      placeholder: "0.00",
      required: true,
    },
    {
      name: "assignedTier",
      type: "input",
      label: "Assigned Tier",
      placeholder: "Tier 1",
      required: true,
    },
  ];
  // save handler
  const handleSave = (data: any) => {
    setFormData(data);
    onClose();
  };
  // Cancel handler
  const handleCancel = () => {

    onClose();
  };

  return (
    <CommonModalForm
      isOpen={true}
      onClose={onClose}
      title="Add New Screen"
      formData={formData}
      fields={fields}
      onSave={handleSave}
      onCancel={handleCancel}
      saveButtonText="Add screen"
    />
  );
};

export default AddNewScreenModal;
