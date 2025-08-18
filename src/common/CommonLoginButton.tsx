/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const CommonLoginButton = ({
  isInView,
  title,
  Icon,
  onClick,
}: {
  isInView: boolean;
  title: string;
  Icon?: any;

  onClick?: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
      className="w-full lg:w-fit mx-auto"
    >
      <button
        onClick={onClick}
        type="submit"
        className="w-full px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7] hover:scale-105 hover:shadow-[0_0_20px_rgba(142,148,181,0.5)] flex justify-center items-center gap-2"
      >
        {title}
        {Icon && <Icon className="w-4 h-4 text-black" />}
      </button>
    </motion.div>
  );
};

export default CommonLoginButton;
