import CommonModalForm, { Field } from "@/common/CommonModalForm";
import React, { useState } from "react";

interface AddCustomTimeBlockModalProps {
  onClose: () => void;
}

const AddCustomTimeBlockModal: React.FC<AddCustomTimeBlockModalProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    tierName: "",
    timeBlocks: "",
    cppAdjustment: "",
    isPeakHour: false,
  });

  // Define the fields for this modal
  const fields: Field[] = [
    {
      name: "tierName",
      type: "input",
      label: "Tier Name",
      placeholder: "Tier 4",
      required: true,
    },
    {
      name: "timeBlocks",
      type: "input",
      label: "Time Blocks (e.g., 22:00-06:00)",
      placeholder: "22:00-06:00",
      required: true,
    },
    {
      name: "cppAdjustment",
      type: "input",
      label: "CPP Adjustment (BSD):",
      placeholder: "0.00",
      required: true,
    },
  ];

  const handleSave = (data: any) => {
    setFormData(data);
    onClose();
  };
  // Cancel handler
  const handleCancel = () => {
    console.log("Cancelled");
    onClose();
  };
  return (
    <CommonModalForm
      isOpen={true}
      onClose={onClose}
      title="Add Custom Time Block"
      formData={formData}
      fields={fields}
      onSave={handleSave}
      onCancel={handleCancel}
      saveButtonText="Add Time Block"
    >
      {" "}
      <div className="flex px-1 pt-2 items-center space-x-2">
        <input
          type="checkbox"
          id="isPeakHour"
          checked={formData.isPeakHour}
          onChange={() =>
            setFormData((prev) => ({ ...prev, isPeakHour: !prev.isPeakHour }))
          }
          style={{ accentColor: "#5678A5" }}
          className="w-4 h-4 rounded focus:ring-0"
        />
        <label htmlFor="isPeakHour" className="text-white text-sm">
          Is peak hour?
        </label>
      </div>
    </CommonModalForm>
  );
};

export default AddCustomTimeBlockModal;
