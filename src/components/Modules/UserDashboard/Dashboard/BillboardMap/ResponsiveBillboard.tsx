import { useEffect, useState } from "react";
import BillboardWorldMap from "./BillboardWorldMap";
import MobileBillboardMap from "./MobileBillboard";

export default function ResponsiveBillboardMap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="w-full ">
      {isMobile ? <MobileBillboardMap /> : <BillboardWorldMap />}
    </div>
  );
}
