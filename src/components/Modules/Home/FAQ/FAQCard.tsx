import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
  index: number;
  isInitiallyOpen?: boolean;
}

export default function FAQCard({
  question,
  answer,
  index,
  isInitiallyOpen = true,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-[20px] border border-[#2FABF9] overflow-hidden cursor-pointer card"
    >
      <motion.div
        onClick={toggleOpen}
        className="flex items-center justify-between p-8 transition-colors duration-200"
      >
        <h3 className="text-white text-base md:text-lg font-medium pr-4 leading-relaxed">
          {question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6 text-[#47B5FF]" />
          ) : (
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#47B5FF]" />
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.2, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="px-6 pb-6"
            >
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/90 text-sm md:text-base leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
