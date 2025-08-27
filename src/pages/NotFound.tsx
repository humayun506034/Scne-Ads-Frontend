import CommonHomeButton from "@/common/CommonHomeButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-bg-color text-primary-text-color font-poppins-regular">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center w-4xl p-6"
      >
        {/* Animation wrapper for Lottie */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <DotLottieReact
            src="https://lottie.host/360b09c9-7286-4237-ba5d-d4d52d981ea7/5g8tb0J3Pp.lottie"
            loop
            autoplay
          />
        </motion.div>

        {/* Animated text */}
        <motion.p
          className="text-xl mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Oops! The page you are looking for doesn&apos;t exist.
        </motion.p>

        {/* Animated button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.9,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
        >
          <Link to="/" className="grid place-items-center">
            <CommonHomeButton isInView={true} title="Back to home" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
