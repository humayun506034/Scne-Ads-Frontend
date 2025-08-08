/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const CommonDashboardButton = ({
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
  // keep this on parent component
  // isInView={true} as prop or

  //  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const ref = useRef(null);
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={onClick}
      className={`bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white font-medium text-sm xl:text-base xl:w-fit w-full px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_32px_rgba(9,72,157,0.9)]  flex justify-center items-center gap-2 ${className}`}
    >
      {title}
      {Icon && <Icon className="w-4 h-4 text-white" />}
    </motion.button>
  );
};

export default CommonDashboardButton;
