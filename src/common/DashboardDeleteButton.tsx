/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const DashboardDeleteButton = ({
  title,
  Icon,
  onClick,
  disabled,
  className = "",
}: {
  title: string;
  Icon?: any;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.8 }}
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`px-2 md:px-8 py-4 w-full  md:w-fit cursor-pointer flex justify-center items-center gap-2 bg-red-500 text-sm md:text-base text-white rounded-md bg-[linear-gradient(291deg,_#FF4C4C_-45.64%,_#B71C1C_69.04%)]  ${className}`}
    >
      {title}
      {Icon && <Icon className="w-4 h-4 text-white" />}
    </motion.button>
  );
};

export default DashboardDeleteButton;
