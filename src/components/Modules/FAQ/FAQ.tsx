import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import { FaqData } from "@/lib/Data";
import { motion } from "framer-motion";
import FAQCard from "./FAQCard";

export default function FaqSection() {
  return (
    <section className="w-full mt-20 md:mt-40 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center  mb-6 md:mb-20"
      >
        <h2 className="text-2xl md:text-5xl  leading-tight">
          Everything you <CommonGlowingHeader glowingTitle="need " /> to know
        </h2>
        <div className="max-w-3xl mx-auto mt-4">
          <p className="text-sm md:text-xl ">
            Find answers to the most frequently asked questions
          </p>
          <p className="text-sm md:text-xl  mt-2">
            about our SCNE Ads features, setup, and capabilities.
          </p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {FaqData.map((faq, index) => (
          <FAQCard
            key={faq.id}
            question={faq.question}
            answer={faq.answer}
            index={index}
            isInitiallyOpen={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
