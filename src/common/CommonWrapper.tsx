import React, { ReactNode } from "react";

interface CommonWrapperProps {
  children: ReactNode;
  className?: string;
}

const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={` w-full max-w-[1440px] mx-auto my-auto px-4 md:px-10  ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;
