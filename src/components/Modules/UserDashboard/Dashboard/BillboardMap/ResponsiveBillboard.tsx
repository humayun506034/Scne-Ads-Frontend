import { IScreen } from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationCard";
import { useGetAllScreenQuery } from "@/store/api/Screen/screenApi";
import { MapPin } from "lucide-react";
import {  useMemo, useState } from "react";
import BillboardWorldMap from "./BillboardWorldMap";
// import MobileBillboardMap from "./MobileBillboard";

export default function ResponsiveBillboardMap() {
  // const [isMobile, setIsMobile] = useState(false);
  const { data } = useGetAllScreenQuery({ limit: 100000, page: "1" });
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const screens = useMemo<IScreen[]>(
    () => data?.data?.data ?? [],
    [data?.data?.data]
  );

  // useEffect(() => {
  //   const checkIsMobile = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   checkIsMobile();
  //   window.addEventListener("resize", checkIsMobile);

  //   return () => window.removeEventListener("resize", checkIsMobile);
  // }, []);

  // if (isMobile) {
  //   return <MobileBillboardMap data={data} />;
  // }

  return (
    <div className="w-full ">
      <div className="flex flex-col md:flex-row items-center  mb-4  justify-between">
        <h2 className="text-white text-lg  font-medium ">
          Map of ad plays - Drag to pan
        </h2>
        <div className="flex mt-4 md:mt-0 items-center gap-2">
          <button
            onClick={() => setViewMode("map")}
            className={`px-2 py-1 cursor-pointer rounded-lg text-sm ${
              viewMode === "map"
                ? "bg-gradient-to-r from-[#38B6FF] px-6 py-3 text-lg font-medium via-[#0c3d7c] to-[#091d3f] text-white shadow-[0_20px_45px_-20px_rgba(8,33,71,0.9)]"
                : "bg-[#0c1222] border border-dashboard-border text-gray-300  px-6 py-3 hover:bg-[#111a31]"
            }`
          
        
          }
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-2 py-1 cursor-pointer rounded-lg text-sm ${
               viewMode === "list"
                ? "bg-gradient-to-r from-[#38B6FF] px-6 py-3 text-lg font-medium via-[#0c3d7c] to-[#091d3f] text-white shadow-[0_20px_45px_-20px_rgba(8,33,71,0.9)]"
                : "bg-[#0c1222]  border border-dashboard-border text-gray-300  px-6 py-3 hover:bg-[#111a31]"
            }`}
          >
            List View
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between"></div>
   {
     viewMode === "map" ? (
       <BillboardWorldMap screens={screens} />
     ) : (
       <ScreenListPanel screens={screens} />
     )
   }
    </div>
  );
}

const formatCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ScreenListPanel({ screens }: { screens: IScreen[] }) {
  const highlightedScreens = screens.slice(0, 6);

  return (
    <div className="bg-dashboard-card-bg rounded-3xl border border-white/10 p-5 text-white shadow-[0_25px_60px_-30px_rgba(6,15,43,0.8)]">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase mb-2 tracking-[0.3em] text-sky-200/70">
            List View
          </p>
          <h3 className="text-xl sm:text-2xl font-medium">
            High-performing Screens
          </h3>
          <p className="text-sm text-title-color mb-2">
            Scout inventory with instant reach, availability and pricing intel.
          </p>
        </div>
        <div className="rounded-2xl flex gap-2 justify-center items-center bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.3em] text-sky-100">
       <p>
           {screens.length}</p> <p>
             Screens
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4 max-h-[250px] overflow-y-auto pr-2">
        {highlightedScreens.map((screen) => {
          const heroImage = screen.imageUrls?.[0]?.url;
          return (
            <div
              key={screen.id}
              className="flex flex-col md:flex-row gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 via-transparent to-white/0 p-4 backdrop-blur-xl"
            >
              <div className="h-40 md:h-20 w-full md:w-20 rounded-2xl overflow-hidden bg-white/10 flex-shrink-0">
                {heroImage ? (
                  <img
                    src={heroImage}
                    alt={screen.screen_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-[#173364] to-[#0d1d3a]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-2  sm:flex-row sm:items-start sm:justify-between ">
                  <div className="space-y-1">
                    <p className="md:text-lg font-medium text-white">
                      {screen.screen_name}
                    </p>
                    <p className="flex items-center gap-1 text-sm text-title-color">
                      <MapPin className="h-4 w-4 text-sky-300" />
                      {screen.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      {screen.screen_size} | {screen.resolution}
                    </p>
                  </div>
                  <div className="text-right text-sm text-gray-200">
                    <p className="text-base font-semibold text-white">
                      {formatCurrency.format(screen.price ?? 0)}
                    </p>
                    <p className="capitalize text-xs mt-1">
                      {screen.availability || screen.status || "n/a"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {highlightedScreens.length === 0 && (
          <p className="text-sm text-gray-400">No screens available.</p>
        )}
      </div>
    </div>
  );
}
