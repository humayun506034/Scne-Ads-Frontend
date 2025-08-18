import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface InputTextareaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  className?: string;
  type?: string;
  rows?: number;
}

const CommonHomeInputTextarea: React.FC<InputTextareaProps> = ({
  name,
  placeholder,
  value,
  onChange,
  className = "",
  type = "text",
  rows = 5, // Default to 5 rows, but can be adjusted dynamically
}) => {
  return (
    <>
      {type === "textarea" ? (
        <Textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#47B5FF] focus:ring-[#47B5FF] rounded-md resize-y ${className}`}
          style={{
            backdropFilter: "blur(10px)",
            minHeight: "110px",
            height: "auto",
            maxHeight: "500px",
            overflowY: "auto",
          }}
        />
      ) : (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-[#47B5FF] focus:ring-[#47B5FF] rounded-md md:h-14 px-5 py-5 ${className}`}
          style={{ backdropFilter: "blur(10px)" }}
        />
      )}
    </>
  );
};

export default CommonHomeInputTextarea;
