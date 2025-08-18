/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const DashboardTransparentButton = ({
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
      style={{ boxSizing: "border-box" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      type="submit"
      onClick={onClick}
      className={`bg-transparent border-secondary-color border  text-white font-medium text-sm xl:text-base xl:w-fit w-full px-5 py-3 rounded-lg cursor-pointer hover:border-title-color hover:bg-title-color  hover:text-black   flex justify-center items-center gap-2 ${className}`}
    >
      {title}
      {Icon && <Icon className="w-4 h-4 text-white" />}
    </motion.button>
  );
};

export default DashboardTransparentButton;
