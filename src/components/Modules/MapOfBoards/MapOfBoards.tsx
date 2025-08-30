import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import { useCallback, useState } from "react";

import { FilterOptions } from ".";

import { FilterSidebar } from "./FilterSidebar";
import { ILocation } from "@/common/CommonLocationCardModal";

interface BillboardMapProps {
  locations: ILocation[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  selectedLocations: string[];
  onClearFilters: () => void;
  selectedCount: number;
  onLocationSelect: (locationId: string) => void;
  center: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels",
      stylers: [
        {
          visibility: "on", // Hide all labels
        },
      ],
    },
    {
      featureType: "poi.business",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", // Hide business labels
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off", // Hide transit icons
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off", // Hide POI icons
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", // Hide road labels
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        {
          visibility: "off", // Hide water labels
        },
      ],
    },
  ],
};

export function MapOfBoards({
  locations,
  onClearFilters,
  selectedCount,
  onFiltersChange,
  filters,
  selectedLocations,
  onLocationSelect,
  center,
}: BillboardMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    console.log("🚀 ~ MapOfBoards ~ map:", map);
  }, []);

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          options={mapOptions}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => setSelectedMarker(location.id)}
            />
          ))}
          <Marker position={{ lat: center.lat, lng: center.lng }} />
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: locations.find((l) => l.id === selectedMarker)?.lat || 0,
                lng: locations.find((l) => l.id === selectedMarker)?.lng || 0,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2 max-w-xs">
                {(() => {
                  const location = locations.find(
                    (l) => l.id === selectedMarker
                  );
                  if (!location) return null;

                  return (
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold ">{location.title}</h3>
                        <p className="text-sm text-title-color">
                          {location.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusBadgeColor(location.availability)}
                        >
                          {location.availability}
                        </Badge>
                        <Badge variant="outline">{location.category}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-title-color">Size:</span>
                          <span className="ml-1 font-medium">
                            {location.screenSize} ft
                          </span>
                        </div>
                        <div>
                          <span className="text-title-color">Price:</span>
                          <span className="ml-1 font-medium">
                            ${location.price}/day
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-title-color">Daily Reach:</span>
                          <span className="ml-1 font-medium">
                            {(location.reach / 1000).toFixed(0)}k
                          </span>
                        </div>
                      </div>

                      {location.availability === "available" && (
                        <Button
                          onClick={() => onLocationSelect(location.id)}
                          size="sm"
                          className={`w-full ${
                            selectedLocations.includes(location.id)
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-blue-500 hover:bg-blue-600"
                          }`}
                        >
                          {selectedLocations.includes(location.id)
                            ? "Remove"
                            : "Select"}
                        </Button>
                      )}
                    </div>
                  );
                })()}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="absolute top-20 left-10 transform  z-10">
        <FilterSidebar
          filters={filters}
          onFiltersChange={onFiltersChange}
          selectedCount={selectedCount}
          onClearFilters={onClearFilters}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Card className="bg-bg-dashboard text-white p-4 shadow-lg">
          <div className="text-center">
            <p className="text-sm">This is a preview of all my boards</p>
            <div className="flex items-center gap-2 mt-2">
              <Button size="sm" className="bg-secondary-color">
                Sign up
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#2B4C7E] bg-transparent"
              >
                Log in
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
