import CommonGlowingHeader from "@/common/CommonGlowingHeader";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import ContactForm from "./ContactForm";

const locations = [
  { lat: 40.7128, lng: -74.006, title: "Statue of Liberty" },
  { lat: 40.7306, lng: -73.9352, title: "Central Park" },
  { lat: 40.758, lng: -73.9855, title: "Times Square" },
  { lat: 40.7484, lng: -73.9857, title: "Empire State Building" },
];

export default function ContactSection() {
  const handleViewLargerMap = () => {
    // You can implement custom map actions here if needed
  };

  return (
    <section className="w-full md:my-40 my-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center md:mb-16"
      >
        <h2 className="text-2xl md:text-5xl    leading-tight">
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
            className="relative w-full h-[400px] lg:h-[700px]   rounded-[20px] overflow-hidden border border-[#2FABF9]"
            style={{
              background: "rgba(47, 171, 249, 0.12)",
              backdropFilter: "blur(30px)",
            }}
          >
            <button
              onClick={handleViewLargerMap}
              className="absolute top-4 left-4   bg-white/90 hover:bg-white text-[#343B4F] text-sm font-medium px-3 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center z-50 gap-2"
            >
              <Maximize2 className="w-4 h-4" />
              View Larger Map
            </button>

            <MapContainer
              center={locations[0]} // Set default center
              zoom={12} // Initial zoom
              scrollWheelZoom={false}
              className="w-full h-full rounded-[20px]"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Use OpenStreetMap tiles
              />

              {locations.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                  <Popup>{location.title}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </motion.div>
        <ContactForm />
      </div>
    </section>
  );
}
