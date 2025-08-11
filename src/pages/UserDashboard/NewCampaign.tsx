import LiveChatDemo from "@/components/Modules/UserDashboard/LiveChat/LiveChatDemo";
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
        <LiveChatDemo />
      </motion.div>
    </div>
  );
};

export default NewCampaign;
