import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import img from "../../../assets/Home/Analytics.png";
function AnalyticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section ref={ref} className="w-full mt-20 md:mt-60 ">
      <div className="grid grid-cols-1 lg:grid-cols-12  gap-6 lg:gap-16 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-start lg:col-span-7 flex-1"
        >
          <div className="relative z-10">
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={isInView ? { scale: 1 } : { scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                {/* Outer Glow */}
                <div
                  className="absolute -inset-4 rounded-[35px] opacity-80"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(47, 171, 249, 0.6), rgba(59, 130, 246, 0.4))",
                    filter: "blur(15px)",
                  }}
                />

                {/* Inner Glow */}
                <div
                  className="absolute -inset-2 rounded-[32px] opacity-60"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(47, 171, 249, 0.8), rgba(59, 130, 246, 0.6))",
                    filter: "blur(8px)",
                  }}
                />

                <div className="relative rounded-[30px] overflow-hidden border-2 border-[#2FABF9] bg-gray-900/50 backdrop-blur-sm">
                  <img
                    src={img}
                    alt="Analytics Dashboard"
                    className="w-full md:h-[450px] cursor-pointer object-cover"
                  />

                  <div
                    className="absolute inset-0 rounded-[28px] pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(45deg, rgba(47, 171, 249, 0.1), rgba(59, 130, 246, 0.05))",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative lg:col-span-5 flex-1 text-center md:text-left"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={isInView ? { scale: 1 } : { scale: 0.9 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="text-2xl md:text-5xl text-white md:mb-8 mb-4 leading-tight"
            >
              Analytics that <CommonGlowingHeader glowingTitle="drive" />{" "}
              results
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
              className="text-white/90 text-sm md:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Unlock powerful insights with SCNE Ads' advanced analytics engine.
              Track and measure the performance of your campaigns in real-time
              with detailed data on impressions, audience engagement, and return
              on investment (ROI).
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default AnalyticsSection;
