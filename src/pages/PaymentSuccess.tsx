import DashboardTransparentButton from "@/common/DashboardTransparentButton";
import { Link, useParams } from "react-router-dom";

type PaymentStatus = "success" | "failed";

interface PaymentResultProps {
  status: PaymentStatus;                 // "success" | "failed"
  retryHref?: string;                    // optional: where to retry (default: /user-dashboard)
 
                     
}

const PaymentResult: React.FC<PaymentResultProps> = ({
  status,
  retryHref = "/user-dashboard",

}) => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const isSuccess = status === "success";

  const title = isSuccess ? "Payment Successful!" : "Payment Failed";
  const lead = isSuccess
    ? "Thank you for your payment. Your transaction has been completed successfully."
    : "We couldn’t complete your transaction. No funds were captured.";
  const accentBg = isSuccess ? "bg-emerald-500/15" : "bg-red-500/15";
  const accentRing = isSuccess ? "ring-emerald-500/30" : "ring-red-500/30";
  const accentText = isSuccess ? "text-emerald-400" : "text-red-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-bg-dashboard to-primary-bg-color text-white font-sans px-4">
      <div
        className="
          bg-dashboard-card-bg rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center
          transform transition-all duration-700 ease-out animate-fadeInScale
        "
      >
        {/* Icon */}
        <div className={`h-24 w-24 mx-auto grid place-items-center rounded-full ${accentBg} ring-8 ${accentRing} mb-6`}>
          {isSuccess ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-14 w-14 ${accentText}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-14 w-14 ${accentText}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">{title}</h1>

        {/* Lead + PaymentId */}
        <p className="text-title-color mb-6 text-lg leading-relaxed">
          {lead}
        </p>

        {paymentId && (
          <div className="font-semibold mt-4 mb-2 flex flex-col md:flex-row justify-center items-center gap-2 break-words">
            Payment ID:
            <code className="bg-title-color text-black px-2 py-1 rounded text-sm">{paymentId}</code>
          </div>
        )}

       
        

        {/* Actions */}
        <div className="mx-auto w-full mt-12 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/user-dashboard" className="w-full sm:w-auto">
            <DashboardTransparentButton
              className="w-full sm:w-auto"
              title={isSuccess ? "Go to Dashboard" : "Back to Dashboard"}
            />
          </Link>

          {!isSuccess && (
            <>
              <Link to={retryHref} className="w-full sm:w-auto">
                <DashboardTransparentButton
                  className="w-full sm:w-auto"
                  title="Go to Dashboard"
                />
              </Link>

           
            </>
          )}
        </div>
      </div>

      {/* Local animation (keeps your existing style) */}
      <style>
        {`
          @keyframes fadeInScale {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentResult;
