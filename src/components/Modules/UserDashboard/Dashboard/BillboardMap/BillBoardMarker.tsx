/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { ILocation } from "@/types/locations";
import { divIcon } from "leaflet";
import { MapPin } from "lucide-react";
import { Marker, Popup } from "react-leaflet";


const getMarkerIcon = (status: ILocation["status"]) => {
  const colors = {
    active: "#10B981",
    inactive: "#6B7280",
    maintenance: "#F59E0B",
  };

  return divIcon({
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${colors[status]};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: "custom-marker",
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const getStatusBadgeStyle = (status: ILocation["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "inactive":
      return "bg-gray-100 text-[#343B4F] hover:bg-gray-100";
    case "maintenance":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-[#343B4F] hover:bg-gray-100";
  }
};

interface BillboardMarkerProps {
  location: any;
 
}

export function BillboardMarker({
  location,
  
}: BillboardMarkerProps) {

  
  return (
    <Marker
        position={[Number(location?.lat) || 0, Number(location?.lng) || 0]}
      icon={getMarkerIcon((location?.status as ILocation["status"]) || "active")}
    >
      <Popup closeButton={true}>
        <div className=" space-y-1">
          {/* {location.image && (
            <div className="w-full h-32 rounded-lg overflow-hidden mb-2">
              <img
                src={location.image || "/placeholder.svg"}
                alt={location.name}
                className="w-full h-full object-fill object-top rounded-lg"
              />
            </div>
          )} */}

          <div className="">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-semibold text-gray-900">
                {location.title}
              </h3>
              <Badge
                className={`text-xs ${getStatusBadgeStyle(location.status)}`}
              >
                {location.status}
              </Badge>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location.location}</span>
            </div>
          </div>

          {location.description && (
            <p className="text-xs text-gray-500 leading-relaxed">
              {location.description}
            </p>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-900">
              <strong>{location.price}</strong> cost per play
            </span>
          </div>

          <div className="pt-1">
            {/* <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
              
              }}
              whileHover={{ scale: 1.05 }}
              className="w-full h-10 bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] cursor-pointer  text-white text-sm rounded-lg flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              View Campaigns
            </motion.button> */}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
