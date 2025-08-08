import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import { StepsData } from "@/lib/Data";
import { motion } from "framer-motion";
import StepCard from "./StepsCard";

export default function HowItWorksSection() {
  return (
    <section className="w-full pt-20 md:pt-40 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center "
      >
        <h2 className="text-2xl md:text-5xl   text-white ">
          How it's <CommonGlowingHeader glowingTitle="Works" />
        </h2>
        <div className="max-w-4xl mx-auto md:mt-3 ">
          <p
            className="text-white/90 text-sm md:text-xl leading-relaxed "
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Select the best digital billboards across the Caribbean to showcase
            your ad.
          </p>
          <p className="text-white/90 text-sm md:text-xl leading-relaxed">
            Whether it's on a bustling city street, inside a shopping mall, or
            near a popular event,
          </p>
          <p className="text-white/90 text-sm md:text-xl leading-relaxed">
            SCNE Ads offers diverse locations to reach your target audience.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4  md:gap-8 mt-6 md:mt-14">
        {StepsData.map((step, index) => (
          <StepCard
            key={step.id}
            stepNumber={step.stepNumber}
            title={step.title}
            description={step.description}
            icon={step.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
