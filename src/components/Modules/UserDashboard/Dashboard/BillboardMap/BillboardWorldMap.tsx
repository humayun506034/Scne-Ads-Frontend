/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { BillboardLocation, billboardLocations, mapConfig } from ".";
import { BillboardMarker } from "./BillBoardMarker";

function BillboardWorldMap() {
  const mapRef = useRef<any>(null);

  const handleViewCampaigns = (location: BillboardLocation) => {
    console.log("View campaigns for:", location.name);
    // Implement navigation to campaigns page
  };

  return (
    <div
      className={`w-full bg-dashboard-card-bg rounded-lg  mt-13 relative h-[400px]  `}
    >
      <div className="absolute top-0 left-0 right-0 z-[1000] p-6">
        <h2 className="text-white text-lg text-center font-medium mb-4">
          Map of ad plays - Drag to pan
        </h2>
      </div>

      <div className="w-full h-full px-5 pt-20 pb-20">
        <MapContainer
          ref={mapRef}
          center={mapConfig.center}
          zoom={mapConfig.zoom}
          minZoom={mapConfig.minZoom}
          maxZoom={mapConfig.maxZoom}
          className="w-full h-full rounded-lg"
          style={{
            backgroundColor: "#033579",
            filter: " inverse(1) brightness(1.2) contrast(1.2)",
          }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">Scene ADS</a>'
          />
          {billboardLocations.map((location) => (
            <BillboardMarker
              key={location.id}
              location={location}
              onViewCampaigns={handleViewCampaigns}
            />
          ))}
        </MapContainer>
        <div className="grid place-items-center mt-4">
          <CommonDashboardButton title="See All Campaigns" Icon={ArrowRight} />
        </div>
      </div>
    </div>
  );
}

export default BillboardWorldMap;
