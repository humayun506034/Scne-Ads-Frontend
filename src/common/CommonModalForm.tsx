import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommonDashboardButton from "@/common/CommonDashBoardButton";

// Reusable Input Field
const FormInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) => (
  <div className="space-y-3">
    <label className="block text-white text-sm font-medium">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-[#1A274C] text-white text-sm rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${className}`}
    />
  </div>
);

// Reusable Dropdown Field
const FormDropdown = ({
  label,
  value,
  onChange,
  options = [],
  required = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: { value: string; label: string }) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`space-y-3 relative ${className}`}>
      <label className="block text-white text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-[#1A274C] text-white text-sm text-left rounded-lg flex justify-between items-center transition-all"
          style={{
            border: "2px solid",
            borderImage:
              "linear-gradient(291deg, #38B6FF -45.64%, #09489D 69.04%) 1",
          }}
        >
          <span>{selectedOption?.label || "Select option"}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-1 bg-[#0B1739] rounded-lg shadow-2xl z-50 overflow-hidden"
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    value === option.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-200 hover:bg-[#222E51] hover:text-white"
                  } ${index === 0 ? "rounded-t-lg" : ""} ${
                    index === options.length - 1 ? "rounded-b-lg" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export type Field = {
  name: string;
  type: "input" | "dropdown";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
};

type CommonModalFormProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: Record<string, any>;
  onSave: (formData: any) => void;
  onCancel: () => void;
  fields: Field[];
  saveButtonText?: string;
  cancelButtonText?: string;
  children?: React.ReactNode;
};

const CommonModalForm: React.FC<CommonModalFormProps> = ({
  isOpen,
  onClose,
  onCancel,
  title,
  formData,
  onSave,
  fields,
  saveButtonText = "Save Changes",
  children,
}) => {
  const [formState, setFormState] = useState(formData);

  const updateField = (fieldName: string, value: string) => {
    setFormState((prev: any) => ({ ...prev, [fieldName]: value }));
  };

  const handleSave = () => onSave(formState);
  const handleCancel = () => {
    onCancel?.();
    onClose();
  };
  if (!isOpen) return null;
  // cancel button
  const CancelButton = ({
    title,
    Icon,
    onClick,
    className = "",
  }: {
    title: string;
    Icon?: any;
    className?: string;
    onClick?: () => void;
  }) => {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        onClick={onClick}
        className={`bg-[#16294E] text-white font-medium text-sm xl:text-base xl:w-fit w-full px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex justify-center items-center gap-2 ${className}`}
      >
        {title}
        {Icon && <Icon className="w-4 h-4 text-white" />}
      </motion.button>
    );
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ duration: 0.25 }}
        className="bg-[#0B1739] rounded-2xl w-full lg:w-2xl md:w-xl sm:w-md mx-4 shadow-2xl border border-[#1c2c55] overflow-hidden"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-[#1c2c55]">
          <h3 className="text-lg font-medium text-white">{title}</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-[#AEB9E1] hover:text-red-400 cursor-pointer transition" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6">
          {fields.map((field) =>
            field.type === "input" ? (
              <FormInput
                key={field.name}
                label={field.label}
                value={formState[field.name] || ""}
                onChange={(value) => updateField(field.name, value)}
                placeholder={field.placeholder}
                required={field.required}
              />
            ) : (
              <FormDropdown
                key={field.name}
                label={field.label}
                value={formState[field.name] || ""}
                onChange={(value) => updateField(field.name, value)}
                options={field.options || []}
                required={field.required}
              />
            )
          )}
          {children}
        </div>

        {/* buttons */}
        <div className="px-6 pb-6 flex justify-end gap-5">
          <CommonDashboardButton
            title={saveButtonText}
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5"
          />
          <CancelButton onClick={handleCancel} title="Cancel" />
        </div>
      </motion.div>
    </div>
  );
};

export default CommonModalForm;
