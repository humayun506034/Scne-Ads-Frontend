import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import CommonHomeButton from "@/common/CommonHomeButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import img from "../../../assets/Home/laptop3.png";
import vdo from "../../../assets/Home/video.mp4";
import BlurText from "./BlurText";
export default function Banner() {
  return (
    <section className="w-full mt-24 md:mt-36 lg:mt-40 relative z-0">
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 1,
            },
          },
        }}
      >
        <motion.h1 className="text-2xl text-white md:text-center md:text-5xl md:leading-[60px]">
          {[
            <span key="line1">
              Launch
              <CommonGlowingHeader glowingTitle="outdoor ads " />
              <span className="ml-2">in minutes</span> —
            </span>,
            <span key="line2">
              <span>straight from</span>
              <span className="pl-2">your screen</span>
            </span>,
          ].map((line, i) => (
            <motion.div
              key={i}
              className="block"
              variants={{
                hidden: {
                  opacity: 0,
                  filter: "blur(4px)",
                  y: 10,
                },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                },
              }}
            >
              {line}
            </motion.div>
          ))}
        </motion.h1>
        <motion.p
          className="text-white mt-8   my-6 max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <BlurText
            text=" Unlock the full potential of your brand with digital billboards in
          Nassau, Bahamas, and beyond. SCNE Ads offers a user-friendly platform
          to advertise on the most strategic locations in the Caribbean.!"
            delay={50}
            animateBy="words"
            direction="top"
            className="text-sm md:text-base md:text-center mb-8"
          />
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/login" className="mt-12 md:grid place-items-center">
            <CommonHomeButton title="Start Now And Login " isInView={true} />
          </Link>
        </motion.div>
      </motion.div>

      <section className="relative w-full pt-12 md:pt-25 ">
        <div
          className="absolute  top-60 -left-40  h-60
            0 w-180 -z-10  blur-[60px] opacity-40 rounded-[10%] bg-[#38B6FF]"
        />
        <div
          className="absolute  top-10 left-0  h-60
            0 w-100 -z-10  blur-[90px] opacity-40 rounded-[10%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-60 left-20  h-60
            0 w-140 -z-10  blur-[90px] opacity-40 rounded-[0%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-40 left-1/2  h-60
            0 w-140 -z-10  blur-[90px] opacity-40 rounded-[0%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-20 -left-20  h-80
            0 w-140 -z-10  blur-[90px] opacity-40 rounded-[0%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-50 left-80  h-80
            0 w-140 -z-10  blur-[90px] opacity-40 rounded-[90%] bg-[#38B6FF]"
        />

        {/* <div
          className="absolute  -top-0 left-80  h-60
            0 w-140 -z-10  blur-[90px] opacity-10 rounded-[90%] bg-[#38B6FF]"
        /> */}
        <div
          className="absolute  top-60 right-40   h-100
            0 w-60 -z-10  blur-[90px] opacity-40 rounded-[10%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-12  -right-0   h-100
            0 w-60 -z-10  blur-[90px] opacity-40 rounded-[10%] bg-[#38B6FF]"
        />
        <div
          className="absolute  -top-40  -right-60   h-60
            0 w-160 -z-10  blur-[90px] opacity-40 rounded-[10%] bg-[#38B6FF]"
        />

        <div className="relative mb-14 md:mb-32  flex justify-center items-center w-full mx-auto">
          <div className="relative mx-auto xl:h-auto xl:w-auto lg:w-[944px] lg:h-[580px] md:w-[677px] md:h-[415px] w-[287px] h-[172px]">
            <img src={img} alt="Laptop  " className=" object-contain   " />

            <div
              className="absolute xl:top-3 xl:w-[82.5%] xl:left-29.5  xl:h-[88%]
              lg:top-2 lg:w-[83%] lg:left-20 lg:h-[87%]
             md:top-2 md:w-[82%] md:left-15 md:h-[87%]
            top-1 w-[82%] h-[88.5%] left-6.5
            "
            >
              <video
                src={vdo}
                controls={false}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover rounded-t-xs md:rounded-t-lg xl:rounded-t-3xl lg:rounded-t-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
