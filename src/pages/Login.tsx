/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonLoginButton from "@/common/CommonLoginButton";
import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
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
import { ArrowLeft, ArrowRight, Copy, Eye, EyeOff, Info } from "lucide-react";
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

const BACKEND_DEMO_URL = "https://danaj242-backend.onrender.com/api";

const demoCredentials = {
  admin: {
    email: "admin@scneads.com",
    password: "123456",
  },
  customer: {
    email: "jagafo8068@dwakm.com",
    password: "123456",
  },
};

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showDemoDetails, setShowDemoDetails] = useState(false);

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

  const backendUrl = import.meta.env.VITE_BASE_URL;
  const showDemoTooltip = backendUrl === BACKEND_DEMO_URL;
  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navbar */}
      <div className="flex justify-between items-center w-full px-4 sm:px-8 lg:px-16 py-3 lg:py-5 bg-transparent flex-wrap">
        {/* Logo */}
        <Link to={"/"}>
          <div className="w-[100px] sm:w-[124px] h-[48px] sm:h-[56px]">
            <img
              src={logo}
              alt="SCNE Ads Logo"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </Link>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="mt-2 sm:mt-0 flex-shrink-0"
        >
          <Button
            variant="link"
            className="flex items-center text-sm sm:text-base px-3 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-4 hover:text-[#38A3E8] transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 w-4 h-4 sm:w-5 sm:h-5" /> Back to Home
          </Button>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex items-center justify-center pt-32">
        <CommonWrapper>
          <div className="w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h1 className="text-5xl flex  relative justify-between md:text-7xl font-medium text-white mb-5 leading-none">
                <p>Hi</p> <div>
                    {showDemoTooltip && (
                      <div className="flex justify-between items-center mb-3">
                        <button
                          type="button"
                          onClick={() => setShowDemoDetails((prev) => !prev)}
                          aria-expanded={showDemoDetails}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs md:text-sm text-white/80 transition hover:text-white hover:border-white/40"
                        >
                          <Info className="h-4 w-4" />
                          {showDemoDetails ? "Hide demo credentials" : "View demo credentials"}
                        </button>
                      </div>
                    )}
                    {showDemoTooltip && showDemoDetails && (
                      <div className="absolute bottom-4 right-0 z-10 w-full sm:w-[320px] translate-y-[100%]">
                        <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-lg text-white shadow-[0_20px_45px_-30px_rgba(8,33,71,0.9)]">
                          <p className="text-[10px] uppercase tracking-[0.4em] text-white/70 mb-2">
                            Demo Access ( Contained Info So that you dont need to do Anything )
                          </p>
                          <div className="space-y-3 text-sm">
                            <div className="space-y-1">
                              <p className="font-semibold text-white/90">Admin</p>
                              <div className="flex items-center justify-between gap-3 text-white/80">
                                <p className="break-all">
                                  Email:{" "}
                                  <span className="font-medium text-white">
                                    {demoCredentials.admin.email}
                                  </span>
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(demoCredentials.admin.email)}
                                  className="text-xs inline-flex items-center gap-1 text-white/60 hover:text-white"
                                >
                                  <Copy className="h-3.5 w-3.5" /> Copy
                                </button>
                              </div>
                              <div className="flex items-center justify-between gap-3 text-white/80">
                                <p>
                                  Password:{" "}
                                  <span className="font-medium text-white">
                                    {demoCredentials.admin.password}
                                  </span>
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(demoCredentials.admin.password)}
                                  className="text-xs inline-flex items-center gap-1 text-white/60 hover:text-white"
                                >
                                  <Copy className="h-3.5 w-3.5" /> Copy
                                </button>
                              </div>
                            </div>
                            <div className="space-y-1 border-t border-white/10 pt-2">
                              <p className="font-semibold text-white/90">Customer</p>
                              <div className="flex items-center justify-between gap-3 text-white/80">
                                <p className="break-all">
                                  Email:{" "}
                                  <span className="font-medium text-white">
                                    {demoCredentials.customer.email}
                                  </span>
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(demoCredentials.customer.email)}
                                  className="text-xs inline-flex items-center gap-1 text-white/60 hover:text-white"
                                >
                                  <Copy className="h-3.5 w-3.5" /> Copy
                                </button>
                              </div>
                              <div className="flex items-center justify-between gap-3 text-white/80">
                                <p>
                                  Password:{" "}
                                  <span className="font-medium text-white">
                                    {demoCredentials.customer.password}
                                  </span>
                                </p>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCopy(demoCredentials.customer.password)
                                  }
                                  className="text-xs inline-flex items-center gap-1 text-white/60 hover:text-white"
                                >
                                  <Copy className="h-3.5 w-3.5" /> Copy
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end pr-6">
                          <span className="h-3 w-3 rotate-45 border-r border-b border-white/20 bg-white/10"></span>
                        </div>
                      </div>
                    )}
                </div>
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
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-white/40 text-white text-base md:text-lg placeholder:text-[#5575C4] focus:outline-none focus:border-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none transition-all duration-300"
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
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 lg:pt-8"
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
                <div className="flex lg:justify-center lg:items-center gap-6 flex-col justify-start items-start lg:flex-row w-full lg:w-fit">
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleForgotPassword}
                    className="text-white hover:text-[#14CA74] cursor-pointer p-0 h-auto text-start text-base md:text-lg"
                  >
                    Forget Password ?
                  </Button>
                  <div className="w-full flex-1 relative">
                  
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
      </div>

      {/* Request Reset Password - Email Modal */}
      <Dialog
        open={showRequestModal}
        onOpenChange={setShowRequestModal}
      >
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
                className="w-full md:w-fit px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7] hover:shadow-[0_0_20px_rgba(142,148,181,0.5)]"
              >
                {requesting ? "Sending..." : "Send OTP"}
              </motion.button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Password Modal */}
      <Dialog
        open={showResetModal}
        onOpenChange={setShowResetModal}
      >
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
                className="w-full md:w-fit px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7] hover:shadow-[0_0_20px_rgba(142,148,181,0.5)]"
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
