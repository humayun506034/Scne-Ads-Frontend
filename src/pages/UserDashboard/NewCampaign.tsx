import { motion } from "framer-motion";

const NewCampaign = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-semibold mb-4">Work in Progress</h1>

        {/* SVG loader animation */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-32 h-32"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="gray"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="blue"
            strokeWidth="4"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset="125.6"
            animate={{
              strokeDashoffset: 0,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        </motion.svg>

        <p className="mt-4 text-xl text-gray-600">We're working on it!</p>
      </motion.div>
    </div>
  );
};

export default NewCampaign;
