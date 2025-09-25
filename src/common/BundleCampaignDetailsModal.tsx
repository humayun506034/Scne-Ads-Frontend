import { X } from "lucide-react";

type ApproveCampaignDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
};

export default function BundleCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: ApproveCampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  const { customer, bundle, contents, startDate, endDate, status, payment } =
    campaign;

  const isVideo = (url: string) =>
    url?.endsWith(".mp4") || url?.includes("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
           <h2 className="text-lg font-semibold text-[#38B6FF]">
            Bundle Campaign Details
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-300 hover:text-red-400" />
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

          {/* Bundle Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Bundle Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-slate-400">Name:</span>{" "}
                {bundle?.bundle_name}
              </p>
              <p>
                <span className="text-slate-400">Location:</span>{" "}
                {bundle?.location}
              </p>
              <p>
                <span className="text-slate-400">Duration:</span>{" "}
                {bundle?.duration}
              </p>
              <p>
                <span className="text-slate-400">Price:</span> ${bundle?.price}
              </p>
              <p>
                <span className="text-slate-400">Campaign Status:</span> {status}
              </p>
              <p>
                <span className="text-slate-400">Payment:</span> $
                {payment?.amount} ({payment?.status})
              </p>
              <p>
                <span className="text-slate-400">Start Date:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">End Date:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
            </div>
          </section>

          {/* Contents Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Contents Information
            </h3>
            <div className="grid gap-6">
              {contents?.map((content: any, index: number) => (
                <div
                  key={content.id}
                  className="p-4 border border-slate-700 rounded-lg"
                >
                  <h4 className="text-sm font-semibold mb-3">
                    Content #{index + 1}
                  </h4>

                  {/* Media */}
                  <div className="mb-4">
                    {isVideo(content.url) ? (
                      <video
                        src={content.url}
                        controls
                        className="w-full max-h-64 rounded-lg"
                      />
                    ) : (
                      <img
                        src={content.url}
                        alt={`Content ${index + 1}`}
                        className="w-full max-h-64 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Screen Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <p>
                      <span className="text-slate-400">Screen:</span>{" "}
                      {content.screen?.screen_name}
                    </p>
                    <p>
                      <span className="text-slate-400">Size:</span>{" "}
                      {content.screen?.screen_size}
                    </p>
                    <p>
                      <span className="text-slate-400">Resolution:</span>{" "}
                      {content.screen?.resolution}
                    </p>
                    <p>
                      <span className="text-slate-400">Location:</span>{" "}
                      {content.screen?.location}
                    </p>
                    <p>
                      <span className="text-slate-400">Price:</span> $
                      {content.screen?.price} Per Day
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
