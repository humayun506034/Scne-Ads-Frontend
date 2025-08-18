import CommonLoginButton from "@/common/CommonLoginButton";
import CommonWrapper from "@/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react"; // Importing eye icons from lucide-react
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  // State for toggling password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const handleSignUp = () => {
    console.log("Navigate to signup");
  };

  const handleForgotPassword = () => {
    console.log("Navigate to forgot password");
  };

  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-10 md:my-0 ">
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
                    onClick={handleSignUp}
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
                    title="Log In"
                    Icon={ArrowRight}
                  />
                </div>
              </div>
            </motion.div>
          </motion.form>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Login;
