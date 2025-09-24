import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  lat: string;
  lng: string;
  screenName: string;
}

const MapView: React.FC<MapViewProps> = ({ lat, lng, screenName }) => {
  const position: [number, number] = [parseFloat(lat), parseFloat(lng)];

  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-gray-700 mt-6">
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={markerIcon}>
          <Popup>{screenName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
