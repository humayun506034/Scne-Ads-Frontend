import { X } from "lucide-react";

type BundleCampaignDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
};

export default function BundleCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: BundleCampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  const {
    customer,
    payment,
    bundle,
    contentUrls,
    status,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  } = campaign;

  console.log('campaign', campaign);

  const isVideo = (url: string) => url?.endsWith(".mp4") || url?.includes("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
        role="presentation" // Prevent overlay click from triggering focus
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
          <h2 id="modal-title" className="text-lg font-semibold text-[#38B6FF]">
            Bundle Campaign Details
          </h2>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-300 hover:text-red-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-8">
          {/* Customer Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Customer Information
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-slate-400">Name:</span>{" "}
                {customer?.first_name} {customer?.last_name}
              </p>
              <p>
                <span className="text-slate-400">Email:</span> {customer?.email}
              </p>
            </div>
          </section>

          {/* Payment Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Payment Information
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-slate-400">Transaction ID:</span> {payment?.transactionId}
              </p>
              <p>
                <span className="text-slate-400">Amount:</span> ${payment?.amount}
              </p>
              <p>
                <span className="text-slate-400">Payment Status:</span> {payment?.status}
              </p>
              <p>
                <span className="text-slate-400">Payment Date:</span> {new Date(payment?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Bundle Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Bundle Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-slate-400">Bundle Name:</span>{" "}
                {bundle?.bundle_name}
              </p>
              <p>
                <span className="text-slate-400">Location:</span> {bundle?.location}
              </p>
              <p>
                <span className="text-slate-400">Duration:</span> {bundle?.duration}
              </p>
              <p>
                <span className="text-slate-400">Price:</span> ${bundle?.price}
              </p>
              <p>
                <span className="text-slate-400">Bundle Status:</span> {bundle?.status}
              </p>
              <p>
                <span className="text-slate-400">Start Date:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">End Date:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">Created At:</span>{" "}
                {new Date(createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">Updated At:</span>{" "}
                {new Date(updatedAt).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Content Information */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Contents Information
            </h3>
            <div className="grid gap-6">
              {contentUrls?.map((url: string, index: number) => (
                <div
                  key={index}
                  className="p-4 border border-slate-700 rounded-lg space-y-3"
                >
                  <h4 className="text-sm font-semibold">Content #{index + 1}</h4>

                  {/* Media */}
                  <div className="mb-4">
                    {isVideo(url) ? (
                      <video
                        src={url}
                        controls
                        className="w-full max-h-64 rounded-lg"
                        aria-label={`Video content ${index + 1}`}
                      />
                    ) : (
                      <img
                        src={url}
                        alt={`Content ${index + 1}`}
                        className="w-full max-h-64 object-cover rounded-lg"
                        aria-label={`Image content ${index + 1}`}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screens Information */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Screens Information
            </h3>
            {bundle?.screens && bundle.screens.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bundle.screens.map((screen: any) => (
                  <div
                    key={screen.id}
                    className="p-4 border border-slate-700 rounded-lg space-y-3"
                  >
                    <h4 className="text-sm font-semibold">{screen.screen_name}</h4>
                    <div className="mb-4">
                      <img
                        src={screen.img_url}
                        alt={`Screen ${screen.screen_name}`}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    </div>

                    {/* Screen Details */}
                    <div className="text-sm">
                      <p>
                        <span className="text-slate-400">Size:</span>{" "}
                        {screen.screen_size}
                      </p>
                      <p>
                        <span className="text-slate-400">Location:</span>{" "}
                        {screen.location}
                      </p>
                      <p>
                        <span className="text-slate-400">Price:</span> $
                        {screen.price}
                      </p>
                      <p>
                        <span className="text-slate-400">Resolution:</span>{" "}
                        {screen.resolution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No screens available for this bundle.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
