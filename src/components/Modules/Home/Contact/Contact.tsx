import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactForm from "./ContactForm";

const locations = [
  { lat: 40.7128, lng: -74.006, title: "Statue of Liberty" },
  { lat: 40.7306, lng: -73.9352, title: "Central Park" },
  { lat: 40.758, lng: -73.9855, title: "Times Square" },
  { lat: 40.7484, lng: -73.9857, title: "Empire State Building" },
];

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
  ],
};

export default function ContactSection() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  return (
    <section className="w-full md:my-40 my-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center md:mb-16"
      >
        <h2 className="text-2xl md:text-5xl leading-tight">
          Connect With & Ignite <br />
          The <CommonGlowingHeader glowingTitle="Conversation" />
        </h2>
      </motion.div>

      <div className="grid mt-6 md:mt-25 grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full col-span-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative lg:col-span-7"
        >
          <div
            className="relative w-full h-[400px] lg:h-[700px] rounded-[20px] overflow-hidden border border-[#2FABF9]"
            style={{
              background: "rgba(47, 171, 249, 0.12)",
              backdropFilter: "blur(30px)",
            }}
          >
            <LoadScript
              googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={locations[0]} // Set default center
                zoom={12} // Initial zoom
                options={mapOptions}
              >
                {locations.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat, lng: location.lng }}
                    onClick={() => setSelectedMarker(location.title)} // Set the selected marker
                  />
                ))}

                {/* Show InfoWindow for the selected marker */}
                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat:
                        locations.find((l) => l.title === selectedMarker)
                          ?.lat || 0,
                      lng:
                        locations.find((l) => l.title === selectedMarker)
                          ?.lng || 0,
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      {locations.find((l) => l.title === selectedMarker)?.title}
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}
