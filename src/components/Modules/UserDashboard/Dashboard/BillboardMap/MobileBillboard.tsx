import { ArrowRight, List, Map, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import CommonDashboardButton from "@/common/CommonDashBoardButton";

import { IScreen } from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationCard";
import "leaflet/dist/leaflet.css";
import { mapConfig } from ".";
import { BillboardMarker } from "./BillBoardMarker";

type ScreenResponse = {
  data?: {
    data?: IScreen[];
  };
};

export default function MobileBillboardMap({ data }: { data: ScreenResponse }) {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const screens = useMemo(
    () => data?.data?.data ?? [],
    [data?.data?.data]
  );

  const formatPrice = (value?: number) =>
    typeof value === "number" ? `$${value.toLocaleString()}` : "N/A";

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-400/20 text-emerald-200 border border-emerald-400/20";
      case "available":
        return "bg-sky-400/20 text-sky-200 border border-sky-400/20";
      case "maintenance":
        return "bg-amber-400/20 text-amber-200 border border-amber-400/20";
      default:
        return "bg-white/10 text-white/70 border border-white/10";
    }
  };

  return (
    <div className="w-full h-[600px] relative bg-dashboard-card-bg rounded-3xl border border-white/10">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4">
        <div className="flex  items-center justify-between">
          <h2 className="text-white text-lg font-semibold ">
            Map of ad plays - Drag to pan
          </h2>

          <div className="flex bg-white/10 rounded-lg p-1 ">
            <button
              onClick={() => setViewMode("map")}
              className={`p-2 rounded ${
                viewMode === "map" ? "bg-white/20 text-white" : "text-white/70"
              }`}
            >
              <Map className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${
                viewMode === "list" ? "bg-white/20 text-white" : "text-white/70"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full h-full pt-28 pb-16">
        {viewMode === "map" ? (
          <MapContainer
            center={mapConfig.center}
            zoom={1}
            minZoom={1}
            maxZoom={18}
            className="w-full h-full"
            style={{ backgroundColor: "#1A2B3F" }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            />

            {screens.map((location) => (
              <BillboardMarker
                key={location.id}
                location={location}
               
              />
            ))}
          </MapContainer>
        ) : (
          <div className="h-full overflow-y-auto px-4 space-y-3 pb-8">
            {screens.length === 0 && (
              <p className="text-center text-sm text-gray-400">
                No screens available.
              </p>
            )}

            {screens.slice(0, 30).map((screen) => {
              const heroImage = screen.imageUrls?.[0]?.url;
              return (
                <div
                  key={screen.id}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="h-16 w-16 rounded-xl overflow-hidden bg-white/10 flex-shrink-0">
                    {heroImage ? (
                      <img
                        src={heroImage}
                        alt={screen.screen_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[#183b7a] to-[#0d1c3d]" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {screen.screen_name}
                        </p>
                        <p className="flex items-center gap-1 text-xs text-gray-300">
                          <MapPin className="h-3.5 w-3.5 text-sky-300" />
                          {screen.location}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-[10px] rounded-full uppercase tracking-wide ${getStatusBadge(
                          screen.availability || screen.status
                        )}`}
                      >
                        {screen.availability || screen.status || "n/a"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      {screen.screen_size} | {screen.resolution}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {formatPrice(screen.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="mt-6 ">
          <CommonDashboardButton
            title="See all campaigns"
            Icon={ArrowRight}
           
          />
        </div>
      </div>

      {/* See All Campaigns Button */}
    </div>
  );
}
