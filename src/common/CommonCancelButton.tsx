/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const CommonCancelButton = ({
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

export default CommonCancelButton;
