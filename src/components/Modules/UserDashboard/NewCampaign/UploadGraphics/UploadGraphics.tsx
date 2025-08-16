import { useEffect, useState } from "react";
import MobileUploadGraphics from "./MobileUploadGraphics";
import { UploadGraphicsSection } from "./UploadGraphicsSection";

export default function UploadGraphics() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile ? <MobileUploadGraphics /> : <UploadGraphicsSection />;
}
