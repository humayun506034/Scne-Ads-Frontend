import { Button } from "@/components/ui/button";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from "@react-google-maps/api";

import { useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { toggleScreen } from "@/store/Slices/campaign/campaignSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Screen } from "@/types/locations";
import { useNavigate } from "react-router-dom";
import { FilterSidebar } from "./FilterSidebar";

interface BillboardMapProps {
  screens: Screen[];
  defaultCenter: { lat: number; lng: number };
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
  screens,
  defaultCenter,
}: BillboardMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  const [selectedScreenId, setSelectedScreenId] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.campaign.screenIds);
  const navigate = useNavigate();

  useEffect(() => {
    if (screens.length > 0 && !selectedScreenId) {
      setSelectedScreenId(screens[0].id);
      const firstScreen = screens[0];
      if (firstScreen.lat && firstScreen.lng) {
        setMapCenter({
          lat: parseFloat(firstScreen.lat),
          lng: parseFloat(firstScreen.lng),
        });
      }
    }
  }, [screens, selectedScreenId]);

  // Update map center when selected screen changes
  useEffect(() => {
    if (selectedScreenId) {
      const screen = screens.find((s) => s.id === selectedScreenId);
      if (screen?.lat && screen?.lng) {
        setMapCenter({
          lat: parseFloat(screen.lat),
          lng: parseFloat(screen.lng),
        });
      }
    }
  }, [selectedScreenId, screens]);

  const handleScreenSelect = (screenId: string) => {
    setSelectedScreenId(screenId);
  };

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
  
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);

  // Pan map when center changes
  useEffect(() => {
    if (map && mapCenter) {
      map.panTo(mapCenter);
    }
  }, [map, mapCenter]);

  return (
    <div className="relative w-full h-full">
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={13}
          onLoad={onLoad}
          options={mapOptions}
        >
          {screens?.map((screen) => {
            if (!screen.lat || !screen.lng) return null;
            const isSelected = screen.id === selectedScreenId;
            return (
              <Marker
                key={screen.id}
                position={{
                  lat: parseFloat(screen.lat),
                  lng: parseFloat(screen.lng),
                }}
                onClick={() => {
                  setSelectedMarker(screen.id || null);
                  setSelectedScreenId(screen.id || null);
                }}
                icon={isSelected ? undefined : undefined}
              />
            );
          })}

          {selectedMarker && (
            <InfoWindow
              position={{
                lat:
                  parseFloat(
                    screens.find((s) => s.id === selectedMarker)?.lat || "0"
                  ) || 0,
                lng:
                  parseFloat(
                    screens.find((s) => s.id === selectedMarker)?.lng || "0"
                  ) || 0,
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className=" max-w-xl w-full bg-dashboard-card-bg rounded-lg shadow-lg p-2 m-0">
                {(() => {
                  const info = screens.find((s) => s.id === selectedMarker);
                   
                 
         

                  return (
                    <div className="space-y-3 text-sm md:text-base    text-white">
                      <div>
                        <h3 className="font-semibold md:text-2xl">{info?.screen_name}</h3>
                        <p className="mt-2 ">
                        Location:  {info?.location}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          className={getStatusBadgeColor(
                            info?.availability || "available"
                          )}
                        >
                          {info?.availability}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="">Size :</span>
                          <span className="ml-1 font-medium">
                            {info?.screen_size}
                          </span>
                        </div>
                        <div>
                          <span className="">Price:</span>
                          <span className="ml-1 font-medium">
                            ${info?.price}/day 
                          </span>
                        </div>
                      </div>

                      {/* Show the image of the screen */}
                      <img
                        src={info?.imageUrls[0]?.url }
                        alt="Screen Image"
                        className="mt-2 w-full h-32 object-cover rounded-md"
                      />

                      <div className="mt-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          className={`px-3 cursor-pointer ${selectedMarker && selectedIds.includes(selectedMarker) ? "bg-red-600 hover:bg-red-500" : "bg-[#14CA74] hover:bg-[#10a862]"}`}
                          onClick={() => {
                            if (selectedMarker) dispatch(toggleScreen(selectedMarker));
                          }}
                        >
                          {selectedMarker && selectedIds.includes(selectedMarker) ? "Deselect" : "Select"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#14CA74] cursor-pointer text-[#14CA74] hover:bg-[#14CA74]/10"
                          disabled={selectedIds.length === 0}
                          onClick={() => navigate("/user-dashboard/new-campaign")}
                        >
                          Build Campaign ({selectedIds.length})
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      <div className="absolute top-4 left-4 md:top-20 md:left-10 z-10">
        <FilterSidebar
          screens={screens}
          selectedScreenId={selectedScreenId}
          onScreenSelect={handleScreenSelect}
        />
      </div>

      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
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
      </div> */}
    </div>
  );
}
