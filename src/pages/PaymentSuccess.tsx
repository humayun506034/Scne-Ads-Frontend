import { useParams, Link } from "react-router-dom";

const PaymentSuccess = () => {
  const { paymentId } = useParams<{ paymentId: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-400 to-blue-700 font-sans px-4">
      <div
        className="
          bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center
          transform transition-all duration-700 ease-out
          animate-fadeInScale
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto h-20 w-20 text-green-500 mb-8 drop-shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>

        <h1 className="text-4xl font-extrabold text-teal-700 mb-4 tracking-tight">
          Payment Successful!
        </h1>

        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          Thank you for your payment. Your transaction has been completed
          successfully.
          <br />
          <span className="font-semibold mt-2 block break-words">
            Payment ID: <code className="bg-gray-100 px-2 py-1 rounded text-sm">{paymentId}</code>
          </span>
        </p>

        <Link
          to="/"
          className="
            inline-block bg-teal-600 hover:bg-teal-700 active:scale-95 active:bg-teal-800
            transition-transform duration-150 ease-in-out
            text-white font-semibold px-8 py-3 rounded-xl shadow-lg
            focus:outline-none focus:ring-4 focus:ring-teal-400/50
            hover:shadow-xl
          "
        >
          Go to Home
        </Link>
      </div>

      {/* Tailwind animation classes need to be added in your global CSS */}
      <style>
        {`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default PaymentSuccess;
