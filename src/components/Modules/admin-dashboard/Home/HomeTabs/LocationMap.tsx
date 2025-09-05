import CommonCancelButton from "@/common/CommonCancelButton";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPin } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const LocationMapModal = ({
  open,
  setOpenMap,
  lat,
  lng,
}: {
  open: boolean;
  setOpenMap: (open: boolean) => void;
  lat?: number;
  lng?: number;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = {
    lat: lat || 37.7749,
    lng: lng || -122.4194,
  };
  const [markerPosition, setMarkerPosition] = useState(center);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    const latLng = e.latLng;
    setMarkerPosition({
      lat: latLng!.lat(),
      lng: latLng!.lng(),
    });
  }, []);
  const handleChangeLocation = () => {
    console.log(markerPosition);
    toast.success("Location changed successfully!");
    setConfirmDeleteOpen(false);
    setOpenMap(false);
  };
  if (!isLoaded) return <div>kela mela...</div>;

  return (
    <Dialog open={open} onOpenChange={setOpenMap}>
      <DialogTrigger asChild>
        <CommonDashboardButton title="Place on Map" Icon={MapPin} />
      </DialogTrigger>

      <DialogContent className="bg-[#081028]  w-full xl:min-w-7xl mx-auto rounded-lg  overflow-y-auto border-none ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl mb-4">
            Place Marker on Map
          </DialogTitle>
        </DialogHeader>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={9}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} />
        </GoogleMap>

        <div className="mt-4 flex justify-end gap-4">
          <Dialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
            <DialogTrigger asChild>
              <CommonDashboardButton
                onClick={() => {
                  setConfirmDeleteOpen(true);
                }}
                title="  Set new  Location ?"
              />
            </DialogTrigger>
            <DialogContent className="bg-[#081028] rounded-lg border-none p-6 mx-auto text-center">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Are you sure you want to change the location of this screen?
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-col md:flex-row  justify-between gap-4 mt-4">
                <CommonDashboardButton
                  onClick={handleChangeLocation}
                  title="  Confirm Location"
                  Icon={MapPin}
                />
                <CommonCancelButton
                  onClick={() => setConfirmDeleteOpen(false)}
                  title="Cancel"
                />
              </div>
            </DialogContent>
          </Dialog>

          <CommonCancelButton
            onClick={() => setOpenMap(false)}
            title="Cancel"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMapModal;
