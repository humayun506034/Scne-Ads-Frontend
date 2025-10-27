 
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  redirectTo?: string;
  redirectAfterSec?: number;
};

const PaymentFailure: React.FC<Props> = ({
  redirectTo = "/buyer/dashboard/orders",
  redirectAfterSec = 4,
}) => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(redirectAfterSec);

  useEffect(() => {
    const iv = setInterval(() => setSeconds((s) => s - 1), 1000);
    const to = setTimeout(() => navigate(redirectTo, { replace: true }), redirectAfterSec * 1000);
    return () => {
      clearInterval(iv);
      clearTimeout(to);
    };
  }, [navigate, redirectAfterSec, redirectTo]);

  return (
    <div className="min-h-[60vh] grid place-items-center p-6">
      <div className="w-full max-w-lg bg-white border border-foundation-white rounded-2xl p-8 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <XCircle className="mx-auto h-16 w-16 text-red-600" />
        </motion.div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-900">Payment Failed</h1>
        <p className="mt-2 text-gray-600">
          We couldn't process your payment. You can try again or visit your dashboard to review your
          order.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            onClick={() => navigate(redirectTo, { replace: true })}
            className="w-full rounded-xl bg-sunset-orange text-white px-4 py-2"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => window.history.length > 1 ? window.history.back() : navigate("/", { replace: true })}
            className="w-full rounded-xl border border-gray-300 text-gray-700 px-4 py-2"
          >
            Try Again
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500">Redirecting in {seconds}s…</p>
      </div>
    </div>
  );
};

export default PaymentFailure;
