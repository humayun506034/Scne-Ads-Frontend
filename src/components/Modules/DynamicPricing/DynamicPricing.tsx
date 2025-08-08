import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import { PricingData } from "@/lib/Data";
import { motion } from "framer-motion";
import PricingCard from "./PricingCard";
const DynamicPricing = () => {
  return (
    <section className="w-full pt-20 md:pt-40 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center   "
      >
        <h2 className="text-2xl lg:text-5xl   leading-tight">
          Understanding Our <br />
          <CommonGlowingHeader glowingTitle="Dynamic Pricing" /> Engine
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 md:mt-18">
        {PricingData.map((item, index) => (
          <PricingCard
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default DynamicPricing;
