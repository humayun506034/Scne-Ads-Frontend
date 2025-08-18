import CommonHomeButton from "@/common/CommonHomeButton";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-primary-bg-color text-primary-text-color font-poppins-regular">
      <div className="text-center p-6">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>

        <Link to="/" className="grid place-items-center">
          <CommonHomeButton isInView={true} title="Back to home" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
