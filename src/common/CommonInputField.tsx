import React from "react";

interface CommonInputFieldProps {
  label: string;
  type?: "text" | "name" | "password" | "email" | "phone" | "select";
  options?: string[]; // only for select type
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
}

const CommonInputField: React.FC<CommonInputFieldProps> = ({
  label,
  type = "text",
  options = [],
  value = "",
  onChange,
  required = true,
  className = "",
}) => {
  if (type === "select") {
    return (
      <div className={`form__group field ${className}`}>
        <select
          className="form__field"
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
    <div className={`form__group field ${className}`}>
      <input
        type={type === "name" ? "text" : type}
        className="form__field"
        placeholder={label}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        required={required}
      />
      <label className="form__label">{label}</label>
    </div>
  );
};

export default CommonInputField;
