import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import CommonHomeButton from "@/common/CommonHomeButton";
import { RatingData } from "@/lib/Data";
import { motion } from "framer-motion";
import { useState } from "react";
import TestimonialCard from "./TestimonialCard";

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState(3);

  const showMoreTestimonials = () => {
    if (testimonials + 3 <= RatingData.length) {
      setTestimonials(testimonials + 3);
    } else {
      setTestimonials(RatingData.length);
    }
  };

  return (
    <section className="w-full mt-16 md:mt-40 ">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center "
      >
        <h2 className="text-2xl md:text-5xl text-white">
          What Our <CommonGlowingHeader glowingTitle="Clients" /> Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:mt-16 mt-6">
        {RatingData.slice(0, testimonials).map((testimonial, index) => (
          <TestimonialCard
            key={testimonial.id}
            {...testimonial}
            index={index}
          />
        ))}
      </div>

      {testimonials < RatingData.length && (
        <div className="md:grid md:place-items-center md:mt-18 mt-6">
          <CommonHomeButton
            title="Read More Reviews"
            isInView={true}
            onClick={showMoreTestimonials}
          />
        </div>
      )}
    </section>
  );
}
