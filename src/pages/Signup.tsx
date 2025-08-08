import CommonLoginButton from "@/common/CommonLoginButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CircleChevronRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CountryCodes } from "@/lib/Data";
import "react-phone-input-2/lib/style.css";
interface SignupFormData {
  firstName: string;
  lastName: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "advertiser" | "agency" | "";
  organizationName: string;
  acceptTerms: boolean;
}

const signupSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
  userType: z.enum(["advertiser", "agency"], {
    errorMap: () => ({ message: "Please select a user type" }),
  }),
  organizationName: z.string().min(1, "Organization Name is required"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [countryCode, setCountryCode] = useState<string>("+61");
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "+61",

    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    organizationName: "",
    acceptTerms: false,
  });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUserTypeChange = (type: "advertiser" | "agency") => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  };

  const handleSubmitForm = (data: SignupFormInputs) => {
    console.log("Signup Form Data:", data, countryCode, phoneNumber);
  };

  return (
    <div className="min-h-screen w-full my-20 flex justify-center items-center">
      <div className="max-w-4xl mx-auto  px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" mb-20"
        >
          <h1 className="text-2xl md:text-5xl font-medium text-white mb-3">
            Don't have an account yet
          </h1>
          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            What's wrong with you? Create one now, or I just do not know how
            long here.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit(handleSubmitForm)}
          className="space-y-20"
        >
          <div className="">
            <p className="font-light text-2xl">
              Let's start with a few details
              <span className="font-semibold pl-1">about you</span>.
            </p>

            <div className="grid grid-cols-2 mt-6 md:mt-8 md:gap-8 gap-4">
              <div>
                <Input
                  placeholder="First Name"
                  {...register("firstName")}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Last Name"
                  {...register("lastName")}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-4 md:gap-10  md:flex-row flex-col items-center ">
              <Select onValueChange={(value) => setCountryCode(value)}>
                <SelectTrigger className="w-fit cursor-pointer bg-[#89AAD5] text-white border-none rounded-xl px-4 py-3">
                  <SelectValue placeholder="AU" />
                </SelectTrigger>
                <SelectContent className=" bg-[#0B1739]  text-white border-none">
                  {CountryCodes.map((country) => (
                    <SelectItem
                      key={country.code}
                      value={country.value}
                      className="cursor-pointer  hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
                    >
                      {country.label} ({country.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-white text-base md:text-2xl">
              Now, Let's give you a{" "}
              <span className="font-semibold"> Login</span> . It will be your
              email.
            </p>
            <Input
              type="email"
              placeholder="Your email address"
              {...register("email")}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <p className="text-white text-base md:text-2xl">
              Set yourself a <span className="font-semibold">password</span>
            </p>
            <div className="grid grid-cols-2 md:gap-8 gap-4">
              <div className="relative">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                />
                <div
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <EyeOff className="w-6 h-6 text-white" />
                  ) : (
                    <Eye className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-white text-base md:text-2xl">
              Will you use me for yourself, or on behalf of your clients?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeChange("advertiser")}
                className={`p-6 rounded-lg border cursor-pointer transition-all duration-200  ${
                  formData.userType === "advertiser"
                    ? "border-[#47B5FF] bg-[#47B5FF]/20"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <h3 className="text-white font-medium text-base md:text-xl mb-5">
                  For Yourself (Advertiser)
                </h3>
                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                  Choose this option if you want to create and manage
                  advertising campaigns for your own business or personal use.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleUserTypeChange("agency")}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  formData.userType === "agency"
                    ? "border-[#47B5FF] bg-[#47B5FF]/20"
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                <h3 className="text-white font-medium text-base md:text-xl mb-5">
                  For Your Clients (Agency)
                </h3>
                <p className="text-white/70 text-xs md:text-base leading-relaxed">
                  Choose this option if you want to manage advertising campaigns
                  on behalf of multiple clients as an agency.
                </p>
              </motion.div>
            </div>
            {errors.userType && (
              <p className="text-red-500 text-sm mt-2">
                {errors.userType?.message}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <p className="text-white text-base md:text-2xl">
              Now give your organization a{" "}
              <span className="font-semibold">name .</span>
            </p>
            <Input
              placeholder="Organization name"
              value={formData.organizationName}
              onChange={(e) =>
                handleInputChange("organizationName", e.target.value)
              }
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.organizationName?.message}
              </p>
            )}
          </div>

          <div className="space-y-4 flex justify-between items-center lg:gap-42 flex-col md:flex-row">
            <div className="border-t flex-1 lg:max-w-xl border-white/20 pt-4">
              <p className="text-white text-sm md:text-base font-semibold mb-3">
                The Terms & Conditions.
              </p>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", checked as boolean)
                  }
                  className="border-white/40 data-[state=checked]:bg-[#47B5FF] data-[state=checked]:border-[#47B5FF] mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-white/80 text-xs leading-relaxed cursor-pointer"
                >
                  I have read, agree to and accept the terms and conditions and
                  acknowledge the terms and conditions and privacy policy.
                </label>
              </div>
            </div>
            <div className="w-full md:w-fit  ">
              <CommonLoginButton
                onClick={handleSubmit(handleSubmitForm)}
                title="Create Account"
                isInView={true}
                Icon={CircleChevronRight}
              />
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
