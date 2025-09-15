/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignupMutation } from "@/store/Slices/AuthSlice/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CircleChevronRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import OtpVerificationModal from "@/pages/OtpVerificationModal";
import type { IRegisterInput } from "@/types/auth";
import { z } from "zod";

const signupSchema = z.object({
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters"),
  organizationName: z.string().min(1, "Organization Name is required"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

interface CountryCode {
  code: string;
  label: string;
  value: string;
}

const CountryCodes: CountryCode[] = [
  { code: "+1", label: "United States", value: "+1" },
  { code: "+44", label: "United Kingdom", value: "+44" },
  { code: "+61", label: "Australia", value: "+61" },
  { code: "+91", label: "India", value: "+91" },
  { code: "+81", label: "Japan", value: "+81" },
  { code: "+49", label: "Germany", value: "+49" },
  { code: "+33", label: "France", value: "+33" },
  // Add more country codes here
];

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [accept, setAccept] = useState(false);
  const [select, setSelect] = useState("");
  const [countryCode, setCountryCode] = useState<string>("+61");
  const [signup, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpEmail, setOtpEmail] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: { countryCode },
  });

  const handleSubmitForm = async (data: SignupFormInputs) => {
    if (!accept) {
      toast.error("You must accept the terms and conditions.");
      return;
    }

    if (!select) {
      toast.error("Please select a user type.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const formattedData: IRegisterInput = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone: `${data.countryCode || countryCode}${data.phoneNumber}`,
      email: data.email,
      password: data.password,
      organisation_name: data.organizationName,
      organisation_role: select,
    };

    try {
      const res = await signup(formattedData).unwrap();
      console.log("Signup success:", res);
      toast.success(res.message || "Account created successfully!");
      if (res.success && res.data && res.data.is_verified === false) {
        setOtpEmail(res.data.email);
        setOtpOpen(true);
      } else {
        navigate("/login");
      }
      // keep form values in case user needs to edit while verifying
    } catch (err) {
      const message =
        (err as any)?.data?.message ||
        (err as any)?.error ||
        "Signup failed. Please try again.";
      console.error("Signup error:", err);
      toast.error(message);
    }
  };

  return (
    <div className="w-full my-20 flex justify-center items-center">
      <div className="max-w-4xl mx-auto px-4 lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
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
          onSubmit={handleSubmit(handleSubmitForm)} // Use onSubmit on form tag
          className="space-y-20"
        >
          {/* First Name and Last Name Section */}
          <div className="space-y-6">
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

          {/* Phone Number Section */}
          <div className="space-y-6">
            <p className="text-white text-base md:text-2xl">
              Now enter your phone number
            </p>
            <div className="flex gap-4 md:gap-10 md:flex-row flex-col items-center">
              <Select
                onValueChange={(value) => {
                  setCountryCode(value);
                  setValue("countryCode", value);
                }}
                value={countryCode}
              >
                <SelectTrigger className="w-fit cursor-pointer bg-[#89AAD5] text-white border-none rounded-xl px-4 py-3">
                  <SelectValue placeholder="AU" />
                </SelectTrigger>
                <SelectContent className="bg-[#0B1739] text-white border-none">
                  {CountryCodes.map((country) => (
                    <SelectItem
                      key={`${country.code}-${country.label}`}
                      value={country.value}
                      className="cursor-pointer hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] hover:text-white"
                    >
                      {country.label} ({country.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="text"
                {...register("phoneNumber")}
                className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email Section */}
          <div className="space-y-6">
            <p className="text-white text-base md:text-2xl">
              Now, Let's give you a <span className="font-semibold">Login</span>{" "}
              . It will be your email.
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

          {/* Password Section */}
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

          {/* User Type Section */}
          <div className="space-y-4">
            <p className="text-white text-base md:text-2xl">
              Will you use me for yourself, or on behalf of your clients?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelect("advertiser")}
                className={`p-6 rounded-lg border cursor-pointer transition-all duration-200 ${
                  select === "advertiser"
                    ? "border-[#47B5FF]"
                    : "border-white/20"
                }`}
              >
                <h3 className="text-white font-medium text-base md:text-xl mb-5">
                  For Yourself (Advertiser)
                </h3>
                <p className="text-sm">
                  Choose this option if you want to create and manage
                  advertising campaigns for your own business or personal use
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelect("agency")}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  select === "agency" ? "border-[#47B5FF]" : "border-white/20"
                }`}
              >
                <h3 className="text-white font-medium text-base md:text-xl mb-5">
                  For Your Clients (Agency)
                </h3>
                <p className="text-sm">
                  Choose this option if you are an agency or consultant looking
                  to manage advertising campaigns on behalf of multiple clients
                </p>
              </motion.div>
            </div>
            {select === "" && (
              <p className="text-red-500 text-sm mt-2">
                Please select a user type
              </p>
            )}
          </div>

          <div className="space-y-8">
            <p className="text-white text-base md:text-2xl">
              Now give your organization a{" "}
              <span className="font-semibold">name</span>
            </p>
            <Input
              placeholder="Organization name"
              {...register("organizationName")}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            {errors.organizationName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.organizationName.message}
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
                  checked={accept}
                  onCheckedChange={(checked) => setAccept(!!checked)}
                  className="border-white/40 cursor-pointer data-[state=checked]:bg-[#47B5FF] data-[state=checked]:border-[#47B5FF] mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="text-white/80 text-xs leading-relaxed cursor-pointer"
                >
                  I have read, agree to and accept the terms and conditions and
                  acknowledge the terms and conditions and privacy policy.
                </label>
              </div>
              {!accept && (
                <p className="text-red-500 text-sm mt-2">
                  You must accept the terms and conditions
                </p>
              )}
            </div>

            <div className="w-full md:w-fit">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
                className="w-full lg:w-fit mx-auto"
              >
                <button
                  type="submit"
                  disabled={!accept || isLoading || !select}
                  className="w-full px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7] hover:scale-105 hover:shadow-[0_0_20px_rgba(142,148,181,0.5)] flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                  <CircleChevronRight className="w-4 h-4 text-black" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.form>
        <OtpVerificationModal
          open={otpOpen}
          onOpenChange={setOtpOpen}
          email={otpEmail}
          onVerified={() => {
            toast.success("Email verified. You can now log in.");
            reset();
            setSelect("");
            setAccept(false);
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
};

export default Signup;
