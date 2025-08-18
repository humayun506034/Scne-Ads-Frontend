/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";

const CommonHomeButton = ({
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
  // keep this on parent component
  // isInView={true} as prop or

  //  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // const ref = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
    >
      <button
        type="submit"
        onClick={onClick}
        className="bg-[#47B5FF] hover:bg-[#3BA3E8] text-white font-semibold text-sm md:text-base md:w-fit w-full px-8 py-4 rounded-full cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,181,255,0.5)] hover:scale-103 flex justify-center items-center gap-2"
      >
        {title}
        {Icon && <Icon className="w-4 h-4 text-white" />}
      </button>
    </motion.div>
  );
};

export default CommonHomeButton;
