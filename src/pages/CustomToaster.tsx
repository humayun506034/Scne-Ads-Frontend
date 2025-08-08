import { useMediaQuery } from "react-responsive";
import { Toaster } from "sonner";

const CustomToaster = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <Toaster
      offset={isMobile ? "16px" : "24px"}
      mobileOffset={{ bottom: "16px" }}
      position="bottom-right"
      toastOptions={{
        style: {
          background: "rgba(3, 53, 121, 0.85)",
          color: "#fff",
          borderRadius: "16px",
          fontFamily: "Poppins, sans-serif",
          padding: "16px 20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      }}
    />
  );
};

export default CustomToaster;
