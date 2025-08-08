import { Button } from "@/components/ui/button";
import { ArrowRight, List, Map } from "lucide-react";
import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import CommonDashboardButton from "@/common/CommonDashBoardButton";
import "leaflet/dist/leaflet.css";
import { BillboardLocation, billboardLocations, mapConfig } from ".";
import { BillboardMarker } from "./BillBoardMarker";

export default function MobileBillboardMap() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const handleViewCampaigns = (location: BillboardLocation) => {
    console.log("View campaigns for:", location.name);
  };

  const handleSeeAllCampaigns = () => {
    console.log("Navigate to all campaigns");
  };

  const getStatusColor = (status: BillboardLocation["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "maintenance":
        return "bg-orange-500";
      case "inactive":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="w-full h-[600px] relative bg-dashboard-card-bg rounded-lg">
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

            {billboardLocations.map((location) => (
              <BillboardMarker
                key={location.id}
                location={location}
                onViewCampaigns={handleViewCampaigns}
              />
            ))}
          </MapContainer>
        ) : (
          <div className="h-full overflow-y-auto px-4 space-y-3">
            {billboardLocations.map((location) => (
              <div
                key={location.id}
                className=" backdrop-blur rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`w-3 h-3 rounded-full ${getStatusColor(
                          location.status
                        )}`}
                      />
                      <h3 className="text-white font-medium text-sm">
                        {location.name}
                      </h3>
                    </div>
                    <p className="text-white/70 text-xs mb-2">
                      {location.city}, {location.country}
                    </p>
                    <p className="text-white/60 text-xs">
                      {location.campaigns} active campaigns
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => handleViewCampaigns(location)}
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 ">
          <CommonDashboardButton
            title="See all campaigns"
            Icon={ArrowRight}
            onClick={handleSeeAllCampaigns}
          />
        </div>
      </div>

      {/* See All Campaigns Button */}
    </div>
  );
}
