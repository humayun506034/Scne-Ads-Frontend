import RatingComponent from "@/common/CommonRating";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  name: string;
  location: string;
  comment: string;
  rating: number;
  profileImage: string;
  index: number;
}

export default function TestimonialCard({
  name,
  location,
  comment,
  rating,
  profileImage,
  index,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col p-8 rounded-[30px] border border-[#2FABF9] h-full relative card"
    >
      <div className="absolute top-6 left-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="59"
          height="44"
          viewBox="0 0 59 44"
          fill="none"
        >
          <path
            d="M51.3284 1.28784C50.4987 2.16698 49.6306 3.00616 48.8486 3.93276C47.1644 5.92831 45.7704 8.13865 45.0155 10.7711C44.8569 11.323 44.7481 11.9 44.6846 12.4744C44.4058 14.987 44.4942 15.0994 46.7246 15.3791C53.3163 16.2033 58.2328 21.7728 58.532 28.7535C58.8471 36.0614 54.5562 42.1979 48.0892 43.6889C40.4458 45.4497 32.9747 39.0884 32.603 30.5043C32.0182 17.0425 38.6211 6.05319 50.1066 1.37775C50.4489 1.23789 50.807 1.15048 51.1561 1.03809C51.2128 1.12051 51.2717 1.20542 51.3284 1.28784Z"
            fill="#38B6FF"
          />
          <path
            d="M19.0578 0.916992C16.3286 4.2862 13.4907 7.41564 12.6724 11.9787C12.482 13.0401 12.5568 14.1565 12.5115 15.1606C14.0755 15.4028 15.4038 15.4877 16.6754 15.8249C23.0835 17.5208 27.1477 24.2741 26.3067 31.7219C25.5247 38.6426 19.8806 44.0248 13.4363 43.9924C6.87865 43.9599 1.24357 38.6576 0.617953 31.5645C-0.406606 19.9059 4.19031 9.12896 14.5742 3.12733C16.0203 2.29065 17.5617 1.64878 19.0578 0.916992Z"
            fill="#38B6FF"
          />
        </svg>
      </div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.1, delay: index * 0.1 + 0.1 }}
        viewport={{ once: true }}
        className="flex justify-center mb-6 mt-12"
      >
        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.1, delay: index * 0.1 + 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center space-y-4 flex-1"
      >
        <h3 className="text-base md:text-lg font-medium">{name}</h3>

        <p className="text-white/70 text-sm italic">{location}</p>

        <p
          className="text-white/90 text-sm leading-relaxed flex-1"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          {comment}
        </p>

        <div className="mt-4">
          <RatingComponent rating={rating} size={16} />
        </div>
      </motion.div>
    </motion.div>
  );
}
