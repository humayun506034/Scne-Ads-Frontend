import { motion } from "framer-motion";
import { Clock, Layers, Lightbulb, TrendingUp } from "lucide-react";

interface PricingCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "layers":
      return Layers;
    case "clock":
      return Clock;
    case "trending-up":
      return TrendingUp;
    case "lightbulb":
      return Lightbulb;
    default:
      return Layers;
  }
};

export default function PricingCard({
  title,
  description,
  icon,
  index,
}: PricingCardProps) {
  const IconComponent = getIcon(icon);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col p-8 rounded-[30px] border border-[#2FABF9] h-full bg-transparent card"
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          viewport={{ once: true }}
          className="w-16 h-16 rounded-full bg-[#47B5FF] flex items-center justify-center flex-shrink-0"
        >
          <IconComponent className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          viewport={{ once: true }}
          className="text-white text-base md:text-2xl font-medium"
        >
          {title}
        </motion.h3>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
        viewport={{ once: true }}
        className=" text-xs md:text-lg leading-relaxed flex-1"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
