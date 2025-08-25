import { cn } from "@/lib/utils";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface CustomTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
  isError?: boolean;
  rows?: number;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  register,
  placeholder,
  className = "",
  isError = false,
  rows = 6,
  ...props
}) => {
  return (
    <textarea
      {...register}
      {...props}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        "w-full bg-[#132C51] text-white border-none ring-0 focus:ring-none focus:outline-none py-3 px-4 rounded-md placeholder:text-[#374B71] mt-2 resize-none",
        isError && "border-red-500",
        className
      )}
    />
  );
};

export default CustomTextarea;
