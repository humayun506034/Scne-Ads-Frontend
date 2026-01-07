/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useVerifyOtpMutation } from "@/store/Slices/AuthSlice/authApi";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface OtpVerificationModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  email: string;
  onVerified?: () => void;
}

const OtpVerificationModal = ({
  open,
  onOpenChange,
  email,
  onVerified,
}: OtpVerificationModalProps) => {
  const [codes, setCodes] = useState(["", "", "", ""]);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  useEffect(() => {
    if (open) {
      setCodes(["", "", "", ""]);
      setTimeout(() => refs[0].current?.focus(), 50);
    }
  }, [open]);

  const handleChange = (idx: number, value: string) => {
    const v = value.replace(/\D/g, "");
    if (!v) {
      const next = [...codes];
      next[idx] = "";
      setCodes(next);
      return;
    }
    const chars = v.split("");
    const next = [...codes];
    next[idx] = chars[0] || "";
    // Autofill subsequent boxes if user pasted multiple digits
    for (let i = 1; i < chars.length && idx + i < 4; i++) {
      next[idx + i] = chars[i];
    }
    setCodes(next);
    // Move focus
    const moveTo = Math.min(idx + chars.length, 3);
    refs[moveTo]?.current?.focus();
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codes[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) refs[idx - 1].current?.focus();
    if (e.key === "ArrowRight" && idx < 3) refs[idx + 1].current?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const raw = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!raw) return;
    e.preventDefault();
    const chars = raw.slice(0, 4).split("");
    const next = ["", "", "", ""] as string[];
    for (let i = 0; i < chars.length; i++) next[i] = chars[i];
    setCodes(next);
    refs[Math.min(chars.length - 1, 3)]?.current?.focus();
  };

  const handleVerify = async () => {
    const otp = codes.join("");
    if (otp.length !== 4) {
      toast.error("Please enter the 4-digit code.");
      return;
    }
    try {
      const res = await verifyOtp({ email, otp }).unwrap();
      if (res.success && res.data?.is_verified) {
        toast.success(res.message || "Verification successful");
        onOpenChange(false);
        onVerified?.();
      } else {
        toast.error(res.message || "Verification failed");
        console.error("OTP verify failed:", res);
      }
    } catch (err: any) {
      const message = err?.data?.message || err?.error || "Verification failed";
      toast.error(message);
      console.error("OTP verify error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#081028] border-none text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Verify your email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-title-color text-sm">
            We sent a 4-digit code to {email}. Enter it below.
          </p>
          <div className="flex items-center justify-between gap-3">
            {codes.map((val, idx) => (
              <Input
                key={idx}
                ref={refs[idx]}
                value={val}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                inputMode="numeric"
                maxLength={1}
                className="w-14 h-14 text-center text-xl bg-transparent border-white/40 focus:border-white"
                placeholder="-"
                autoComplete="one-time-code"
              />
            ))}
          </div>
          <div className="flex justify-end  pt-2 ">
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full md:w-fit px-5 py-3 rounded-lg bg-[#89AAD5] text-black font-semibold text-sm md:text-base cursor-pointer transition-all duration-300 hover:bg-[#7E95C7]  hover:shadow-[0_0_20px_rgba(142,148,181,0.5)] flex justify-center items-center gap-2"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpVerificationModal;
