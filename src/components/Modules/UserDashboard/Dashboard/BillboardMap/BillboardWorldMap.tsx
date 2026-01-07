/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { IScreen } from "@/components/Modules/admin-dashboard/Home/HomeTabs/AdminLocationCard";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { mapConfig } from ".";
import { BillboardMarker } from "./BillBoardMarker";

export  type Props = {
  screens: IScreen[];
};

function BillboardWorldMap({ screens }: Props) {
  const mapRef = useRef<any>(null);



  return (
    <div
      className={`w-full bg-dashboard-card-bg rounded-lg relative h-[416px]  `}
    >

      <div className="w-full h-full px-5 py-6 pb-20">
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
          {screens.map((location) => (
            <BillboardMarker
              key={location.id}
              location={location}
             
            />
          ))}
        </MapContainer>
        <Link to="/dashboard/new-campaigns" className="grid place-items-center mt-4">
          <CommonDashboardButton title="See All Campaigns" Icon={ArrowRight} />
        </Link>
      </div>
    </div>
  );
}

export default BillboardWorldMap;
