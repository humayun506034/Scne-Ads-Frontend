import { cn } from "@/lib/utils";
import React from "react";

interface CommonInputFieldProps {
  label: string;
  type?: "text" | "name" | "password" | "email" | "phone" | "select" | "address" | "ID" ;
  options?: string[]; // only for select type
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
   icon?: React.ReactNode;
}

const CommonInputField: React.FC<CommonInputFieldProps> = ({
  label,
  type = "text",
  options = [],
  value = "",
  onChange,
  required = true,
  className = "",
  icon,
}) => {
  if (type === "select") {
    return (
      <div className={cn("form__group", "field", className)} >

        <select
          className="form__field w-full px-3 py-2"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          required={required}
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <label className="form__label">{label}</label>
      </div>
    );
  }

  return (
<div className={cn("form__group", "field", className)} >
      <input
        type={type === "name" ? "text" : type}
        className="form__field w-full "
        placeholder={label}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        required={required}
      />
      <label className="form__label">{label}</label>
       {icon && (
        <span
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {icon}
        </span>
      )}
    </div>
  );
};

export default CommonInputField;
