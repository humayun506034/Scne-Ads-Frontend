import { cn } from "@/lib/utils";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
  isError?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  register,
  placeholder,
  className = "",
  isError = false,
  ...props
}) => {
  return (
    <input
      {...register}
      {...props}
      placeholder={placeholder}
      className={cn(
        "w-full bg-[#132C51] text-white border-none ring-0 focus:ring-none focus:outline-none py-3 px-4 rounded-md placeholder:text-[#374B71] mt-2",
        isError && "border-red-500",
        className
      )}
    />
  );
};

export default CustomInput;
