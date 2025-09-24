// import React from "react";

// interface ModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   screen: any;
// }

// const ScreenDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose, screen }) => {
//   if (!isOpen || !screen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-md">
//       <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-xl p-6 text-white overflow-hidden">
//         {/* Modern Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 group"
//           aria-label="Close modal"
//         >
//           <svg
//             className="w-5 h-5 text-gray-300 group-hover:text-white transition"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>

//         {/* Image */}
//         <div className="mb-6 rounded-xl overflow-hidden border border-gray-700">
//           <img
//             src={screen.img_url || "/placeholder.svg"}
//             alt={screen.screen_name}
//             className="w-full h-60 object-cover"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement;
//               target.src = "/led-screen-placeholder.jpg";
//             }}
//           />
//         </div>

//         {/* Title */}


import React from "react";
import MapView from "./MapView"; // adjust the path if needed

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  screen: any;
}

const ScreenDetailsModal: React.FC<ModalProps> = ({ isOpen, onClose, screen }) => {
  if (!isOpen || !screen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0f172a]/80 to-[#1e293b]/80 backdrop-blur-md">
      <div className="relative bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl w-full max-w-xl p-6 text-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 group"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5 text-gray-300 group-hover:text-white transition"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="mb-6 rounded-xl overflow-hidden border border-gray-700">
          <img
            src={screen.img_url || "/placeholder.svg"}
            alt={screen.screen_name}
            className="w-full h-60 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/led-screen-placeholder.jpg";
            }}
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">{screen.screen_name}</h2>

        {/* Details */}
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <span className="text-gray-400 font-medium">Description:</span>
            <p>{screen.description || "No description available"}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 font-medium">Size:</span> {screen.screen_size}
            </div>
            <div>
              <span className="text-gray-400 font-medium">Resolution:</span> {screen.resolution}
            </div>
            <div className="col-span-2">
              <span className="text-gray-400 font-medium">Location:</span> {screen.location}
            </div>
          </div>

          <div>
            <span className="text-gray-400 font-medium">Price:</span>
            <span className="text-green-400 font-semibold ml-2">
              ${screen.price.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="text-gray-400 font-medium">Availability:</span>{" "}
              <span
                className={`font-semibold ${
                  screen.availability === "available" ? "text-green-400" : "text-red-400"
                }`}
              >
                {screen.availability}
              </span>
            </div>
            <div>
              <span className="text-gray-400 font-medium">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  screen.status === "active" ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {screen.status}
              </span>
            </div>
          </div>
        </div>

        {/* 🗺️ Map */}
        {screen.lat && screen.lng && (
          <MapView lat={screen.lat} lng={screen.lng} screenName={screen.screen_name} />
        )}
      </div>
    </div>
  );
};

export default ScreenDetailsModal;
