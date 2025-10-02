import MapView from "./MapView"; // adjust the path if needed

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  screen: any;
  onCreateCampaign?: (screen: any) => void; // optional handler
}

const AdminScreenDetails: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  screen,
  onCreateCampaign,
}) => {
  if (!isOpen || !screen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">
              {screen.screen_name}
            </h2>
            <p className="text-sm text-slate-400">ID: {screen.id || "N/A"}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
          >
            <svg
              className="w-5 h-5 text-gray-300 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Image */}
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <img
              src={screen.img_url || "/placeholder.svg"}
              alt={screen.screen_name}
              className="w-full h-56 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/led-screen-placeholder.jpg";
              }}
            />
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Description
            </h3>
            <p className="text-sm text-slate-300">
              {screen.description || "No description available"}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
            <div>
              <span className="text-slate-400 font-medium">Size:</span>{" "}
              {screen.screen_size || "N/A"}
            </div>
            <div>
              <span className="text-slate-400 font-medium">Resolution:</span>{" "}
              {screen.resolution || "N/A"}
            </div>
            <div className="col-span-2">
              <span className="text-slate-400 font-medium">Location:</span>{" "}
              {screen.location || "N/A"}
            </div>
          </div>

          {/* Price + Status */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <span className="text-slate-400 font-medium">Price:</span>
              <span className="ml-2 text-green-400 font-bold">
                ${screen.price?.toLocaleString() || 0}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Availability:</span>{" "}
              <span
                className={`font-semibold ${
                  screen.availability === "available"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {screen.availability}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  screen.status === "active" ? "text-blue-400" : "text-gray-400"
                }`}
              >
                {screen.status}
              </span>
            </div>
          </div>

          {/* Map */}
          {screen.lat && screen.lng && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Map Location
              </h3>
              <MapView
                lat={screen.lat}
                lng={screen.lng}
                screenName={screen.screen_name}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        {/* <div className="px-6 py-4 border-t border-slate-700 flex justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition"
          >
            Close
          </button>

          <button
            onClick={() => onCreateCampaign?.(screen)}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-sm font-semibold shadow-md transition"
          >
            Create Campaign
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AdminScreenDetails;
