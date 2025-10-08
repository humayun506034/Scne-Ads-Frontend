

// import { X } from "lucide-react";

// interface ScreenCampaignDetailsModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   campaign: any;
// }

// export default function ScreenCampaignDetailsModal({
//   isOpen,
//   onClose,
//   campaign,
// }: ScreenCampaignDetailsModalProps) {
//   if (!isOpen || !campaign) return null;

//   const {
//     customer,
//     contents,
//     startDate,
//     endDate,
//     status,
//     CustomPayment,
//   } = campaign;

//   const payment = CustomPayment?.[0];

//   const isVideo = (url: string) =>
//     url?.endsWith(".mp4") || url?.includes("video");

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/70" onClick={onClose} />

//       {/* Modal */}
//       <div className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
//           <h2 className="text-lg font-semibold text-[#38B6FF]">
//             Screen Campaign Details
//           </h2>
//           <button onClick={onClose}>
//             <X className="w-5 h-5 text-slate-300 hover:text-red-400" />
//           </button>
//         </div>

//         <div className="space-y-8">
//           {/* Customer Info */}
//           <section>
//             <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
//               Customer Information
//             </h3>
//             <div className="space-y-1 text-sm">
//               <p>
//                 <span className="text-slate-400">Name:</span>{" "}
//                 {customer?.first_name} {customer?.last_name}
//               </p>
//               <p>
//                 <span className="text-slate-400">Email:</span> {customer?.email}
//               </p>
//             </div>
//           </section>

//           {/* Campaign Info */}
//           <section>
//             <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
//               Campaign Information
//             </h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p>
//                 <span className="text-slate-400">Start Date:</span>{" "}
//                 {new Date(startDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="text-slate-400">End Date:</span>{" "}
//                 {new Date(endDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="text-slate-400">Status:</span> {status}
//               </p>
//               <p>
//                 <span className="text-slate-400">Payment:</span> $
//                 {payment?.amount ?? 0} ({payment?.status ?? "Unpaid"})
//               </p>
//             </div>
//           </section>

//           {/* Contents Info */}
//           <section>
//             <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
//               Contents Information ({contents?.length ?? 0})
//             </h3>
//             <div className="grid gap-6">
//               {contents?.map((content: any, index: number) => {
//                 const screen = content.screen;
//                 return (
//                   <div
//                     key={content.id}
//                     className="p-4 border border-slate-700 rounded-lg"
//                   >
//                     <h4 className="text-sm font-semibold mb-3">
//                       Content #{index + 1}
//                     </h4>

//                     {/* Media */}
//                     <div className="mb-4">
//                       {isVideo(content.url) ? (
//                         <video
//                           src={content.url}
//                           controls
//                           className="w-full max-h-64 rounded-lg"
//                         />
//                       ) : (
//                         <img
//                           src={content.url}
//                           alt={`Content ${index + 1}`}
//                           className="w-full max-h-64 object-cover rounded-lg"
//                         />
//                       )}
//                     </div>

//                     {/* Screen Info */}
//                     {screen && (
//                       <div className="grid grid-cols-2 gap-3 text-sm">
//                         <p>
//                           <span className="text-slate-400">Screen:</span>{" "}
//                           {screen.screen_name}
//                         </p>
//                         <p>
//                           <span className="text-slate-400">Size:</span>{" "}
//                           {screen.screen_size}
//                         </p>
//                         <p>
//                           <span className="text-slate-400">Resolution:</span>{" "}
//                           {screen.resolution}
//                         </p>
//                         <p>
//                           <span className="text-slate-400">Location:</span>{" "}
//                           {screen.location}
//                         </p>
//                         <p>
//                           <span className="text-slate-400">Price:</span> $
//                           {screen.price} Per Day
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         </div>

   
//       </div>
//     </div>
//   );
// }


import { X } from "lucide-react";

interface ScreenCampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

export default function ScreenCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: ScreenCampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  const {
    customer,
    startDate,
    endDate,
    status,
    CustomPayment,
    screens,
    contentUrls,
  } = campaign;

  const payment = CustomPayment?.[0];

  const isVideo = (url: string) =>
    url?.endsWith(".mp4") || url?.includes("video");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
          <h2 className="text-lg font-semibold text-[#38B6FF]">
            Screen Campaign Details
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

          {/* Campaign Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Campaign Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>
                <span className="text-slate-400">Start Date:</span>{" "}
                {new Date(startDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">End Date:</span>{" "}
                {new Date(endDate).toLocaleDateString()}
              </p>
              <p>
                <span className="text-slate-400">Status:</span> {status}
              </p>
              <p>
                <span className="text-slate-400">Payment:</span> $
                {payment?.amount ?? 0} ({payment?.status ?? "Unpaid"})
              </p>
            </div>
          </section>

          {/* Contents Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Contents Information ({contentUrls?.length ?? 0})
            </h3>
            <div className="grid gap-6">
              {contentUrls?.map((url: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="p-4 border border-slate-700 rounded-lg"
                  >
                    <h4 className="text-sm font-semibold mb-3">
                      Content #{index + 1}
                    </h4>

                    {/* Media */}
                    <div className="mb-4">
                      {isVideo(url) ? (
                        <video
                          src={url}
                          controls
                          className="w-full max-h-64 rounded-lg"
                        />
                      ) : (
                        <img
                          src={url}
                          alt={`Content ${index + 1}`}
                          className="w-full max-h-64 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Screen Info */}
          <section>
            <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
              Screen Information ({screens?.length ?? 0})
            </h3>
            <div className="grid gap-6">
              {screens?.map((screen: any) => (
                <div
                  key={screen.id}
                  className="p-4 border border-slate-700 rounded-lg"
                >
                  <h4 className="text-sm font-semibold mb-3">
                    {screen.screen_name}
                  </h4>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <p>
                      <span className="text-slate-400">Screen Size:</span>{" "}
                      {screen.screen_size}
                    </p>
                    <p>
                      <span className="text-slate-400">Resolution:</span>{" "}
                      {screen.resolution}
                    </p>
                    <p>
                      <span className="text-slate-400">Location:</span>{" "}
                      {screen.location}
                    </p>
                    <p>
                      <span className="text-slate-400">Price:</span> $
                      {screen.price} Per Day
                    </p>
                  </div>

                  <div className="mt-4">
                    <img
                      src={screen.img_url}
                      alt={`Screen ${screen.screen_name}`}
                      className="w-full max-h-48 object-cover rounded-lg"
                    />
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
