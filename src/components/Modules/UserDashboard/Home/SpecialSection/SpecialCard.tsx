import { motion } from "framer-motion";

interface CardProps {
  title: string;
  bundleTitle: string;
  bundleIcon: string;
  image: string;
  description: string[];
  price: string;
  id: string;
}

const SpecialCard = ({
  title,
  bundleTitle,
  bundleIcon,
  image,
  description,
  price,
}: CardProps) => {
  return (
    <motion.div
      className="rounded-lg m-6 cursor-pointer h-[300px] xl:h-[280px]  w-full  overflow-hidden flex flex-col"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute left-0 right-0 top-0 px-4 pt-4 pb-1 bg-gradient-to-b from-[#101A33]/80 via-[#101A33]/60 to-transparent rounded-md">
          <h3 className="text-white text-base font-semibold leading-6 drop-shadow-lg">
            {title}
          </h3>

          <div className="bg-[#132046] rounded-md mt-10 px-6 py-5 flex flex-col gap-2 ">
            <div className="flex items-center ">
              <span className="text-3xl">{bundleIcon}</span>
              <span className="text-white font-semibold text-lg">
                {bundleTitle}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/80 text-xs ml-4">
              {description.map((desc, index) => (
                <span key={index}>✔ {desc}</span>
              ))}
            </div>

            <div className="mt-2 ml-4">
              <span className=" text-base font-semibold">$ {price} USD</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialCard;
