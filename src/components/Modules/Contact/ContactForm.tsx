import CommonHomeInput from "@/common/CommonHomeInput";
import { motion } from "framer-motion";
import { useState } from "react";
import img from "../../../assets/Home/rocket.png";
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="space-y-8 p-9 rounded-[30px] lg:col-span-5 h-fit bg-transparent  "
      style={{
        borderRadius: "15px",
        background: "rgba(56, 182, 255, 0.12)",
      }}
    >
      <div className="space-y-4">
        <h3 className="text-lg md:text-3xl font-semibold text-white">
          Let's connect constellations
        </h3>
        <p className="text-white/90 text-sm md:text-base leading-relaxed">
          Let's align our constellations! Reach out and let the magic of
          collaboration illuminate our skies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 md:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CommonHomeInput
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <CommonHomeInput
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <CommonHomeInput
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <CommonHomeInput
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <CommonHomeInput
            type="textarea"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleInputChange}
            rows={12}
          />
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <button
            type="submit"
            className="w-full bg-[#47B5FF] hover:bg-[#3BA3E8] text-white font-medium py-4 rounded-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(71,181,255,0.5)] flex items-center cursor-pointer justify-center gap-2 text-base"
          >
            Send it to the moon
            <img
              src={img}
              alt="rocket"
              style={{ mixBlendMode: "screen" }}
              className="w-[25px]  h-3"
            />
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
