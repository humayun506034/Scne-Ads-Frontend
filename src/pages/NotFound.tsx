import CommonHomeButton from "@/common/CommonHomeButton";
import { Link } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-bg-color text-primary-text-color font-poppins-regular">
      <div className="text-center w-4xl  p-6">
        <DotLottieReact
          src="https://lottie.host/360b09c9-7286-4237-ba5d-d4d52d981ea7/5g8tb0J3Pp.lottie"
          loop
          autoplay
        />
        <p className="text-xl mb-8">Oops! The page is under construction.</p>

        <Link to="/" className="grid place-items-center">
          <CommonHomeButton isInView={true} title="Back to home" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
