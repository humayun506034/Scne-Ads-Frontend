/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLoginButton from "@/common/CommonLoginButton";
import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/store/hooks";
import {
  useLoginMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} from "@/store/Slices/AuthSlice/authApi";
import { setUser } from "@/store/Slices/AuthSlice/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react"; // Importing eye icons from lucide-react
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [requestReset, { isLoading: requesting }] =
    useRequestResetPasswordMutation();
  const [resetPassword, { isLoading: resetting }] = useResetPasswordMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleForgotPassword = () => {
    const currentEmail =
      (document.querySelector('input[type="email"]') as HTMLInputElement)
        ?.value || "";
    setResetEmail(currentEmail);
    setShowRequestModal(true);
  };

  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.success && res.data?.accessToken) {
        const { user, accessToken } = res.data;
        dispatch(setUser({ user, token: accessToken }));
        toast.success(res.message || "Logged in successfully", { id: toastId });
        if (res.data.user.role === "customer") {
          navigate(`/${"user-dashboard"}`);
        } else if (res.data.user.role === "admin") {
          navigate(`/${"admin-dashboard"}`);
        }
      } else {
        toast.error(res.message || "Login failed", { id: toastId });
      }
    } catch (err: any) {
      const message = err?.data?.message || err?.error || "Login failed";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className=" flex items-center justify-center my-10 md:my-0 ">
      <CommonWrapper>
        <div className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-medium text-white mb-5 leading-none">
              Hi
            </h1>
            <div className="space-y-1">
              <p className="text-white text-base md:text-xl font-medium">
                Welcome to the SCNE Ads billboard experience.
              </p>
              <p className="text-[#AEB9E1] text-lg md:text-xl">
                Feel free to log in and enjoy me. I do bite, however.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-16"
          >
            <div className="grid grid-cols-1 my-20 md:my-32 md:grid-cols-2 gap-6 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  {...register("email")}
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white text-base md:text-lg  placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
                />

                {errors.email && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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

                {errors.password && (
                  <p className="mt-2 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-center  gap-8 lg:gap-12 lg:pt-8"
            >
              <div className="text-white text-base md:text-lg">
                {"Don't have an account ? "}
                <Link to="/signup">
                  <Button
                    type="button"
                    variant="link"
                    className="text-[#14CA74] cursor-pointer hover:text-[#38A3E8] p-0 h-auto font-medium text-lg md:text-xl underline-offset-2"
                  >
                    Make one
                  </Button>
                </Link>
                {" it's free."}
              </div>
              <div className=" flex lg:justify-center lg:items-center gap-6 flex-col justify-start items-start lg:flex-row w-full lg:w-fit">
                <Button
                  type="button"
                  variant="link"
                  onClick={handleForgotPassword}
                  className="text-white hover:text-[#14CA74]  cursor-pointer p-0 h-auto text-start text-base md:text-lg"
                >
                  Forget Password ?
                </Button>
                <div className="w-full flex-1">
                  <CommonLoginButton
                    isInView={true}
                    title={isLoggingIn ? "Logging in..." : "Log In"}
                    Icon={ArrowRight}
                  />
                </div>
              </div>
            </motion.div>
          </motion.form>
        </div>
      </CommonWrapper>

      {/* Request Reset Password - Email Modal */}
      <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
        <DialogContent className="bg-[#081028] border-none text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Forgot password</DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            <p className="text-title-color">
              Enter your email to receive an OTP.
            </p>
            <Input
              type="email"
              placeholder="Email Address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            <div className="flex justify-end pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={async () => {
                  if (!resetEmail) {
                    toast.error("Please enter your email.");
                    return;
                  }
                  try {
                    const res = await requestReset({
                      email: resetEmail,
                    }).unwrap();
                    toast.success(res.message || "OTP sent to your email");
                    setShowRequestModal(false);
                    setShowResetModal(true);
                  } catch (err: any) {
                    const message =
                      err?.data?.message || err?.error || "Failed to send OTP";
                    toast.error(message);
                  }
                }}
                disabled={requesting}
                className="w-full md:w-fit px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7]  hover:shadow-[0_0_20px_rgba(142,148,181,0.5)]"
              >
                {requesting ? "Sending..." : "Send OTP"}
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showResetModal} onOpenChange={setShowResetModal}>
        <DialogContent className="bg-[#081028] border-none text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Reset your password</DialogTitle>
          </DialogHeader>
          <div className="space-y-8">
            <p className="text-title-color text-sm">
              Enter the OTP from your email and a new password.
            </p>
            <Input
              type="email"
              placeholder="Email Address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            <Input
              type="text"
              placeholder="OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white md:text-lg text-base placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
            />
            <div className="flex justify-end pt-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={async () => {
                  if (!resetEmail || !otpCode || !newPassword) {
                    toast.error("Please fill all fields.");
                    return;
                  }
                  try {
                    const res = await resetPassword({
                      email: resetEmail,
                      opt: otpCode,
                      newPassword,
                    }).unwrap();
                    toast.success(res.message || "Password reset successful");
                    setShowResetModal(false);
                    setOtpCode("");
                    setNewPassword("");
                  } catch (err: any) {
                    const message =
                      err?.data?.message ||
                      err?.error ||
                      "Failed to reset password";
                    toast.error(message);
                  }
                }}
                disabled={resetting}
                className="w-full md:w-fit px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7]  hover:shadow-[0_0_20px_rgba(142,148,181,0.5)]"
              >
                {resetting ? "Resetting..." : "Reset Password"}
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
