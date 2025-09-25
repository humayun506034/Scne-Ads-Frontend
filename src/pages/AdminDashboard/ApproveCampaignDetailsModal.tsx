

// import { X } from "lucide-react";

// type ApproveCampaignDetailsModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   campaign: any;
// };

// export default function ApproveCampaignDetailsModal({
//   isOpen,
//   onClose,
//   campaign,
// }: ApproveCampaignDetailsModalProps) {
//   if (!isOpen || !campaign) return null;

//   const { customer, bundle, contents, startDate, endDate, status, payment } =
//     campaign;

//   const isVideo = (url: string) =>
//     url?.endsWith(".mp4") || url?.includes("video");

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black/70"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="relative bg-[#0B1120] text-white rounded-xl shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
//         {/* Header */}
//         <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
//           <h2 className="text-lg font-semibold">Campaign Details</h2>
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

//           {/* Bundle Info */}
//           <section>
//             <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
//               Bundle Information
//             </h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <p>
//                 <span className="text-slate-400">Name:</span>{" "}
//                 {bundle?.bundle_name}
//               </p>
//               <p>
//                 <span className="text-slate-400">Location:</span>{" "}
//                 {bundle?.location}
//               </p>
//               <p>
//                 <span className="text-slate-400">Duration:</span>{" "}
//                 {bundle?.duration}
//               </p>
//               <p>
//                 <span className="text-slate-400">Price:</span> ${bundle?.price}
//               </p>
//               <p>
//                 <span className="text-slate-400">Campaign Status:</span> {status}
//               </p>
//               <p>
//                 <span className="text-slate-400">Payment:</span> $
//                 {payment?.amount} ({payment?.status})
//               </p>
//               <p>
//                 <span className="text-slate-400">Start Date:</span>{" "}
//                 {new Date(startDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <span className="text-slate-400">End Date:</span>{" "}
//                 {new Date(endDate).toLocaleDateString()}
//               </p>
//             </div>
//           </section>

//           {/* Contents Info */}
//           <section>
//             <h3 className="text-md font-semibold text-[#38B6FF] mb-2">
//               Contents Information
//             </h3>
//             <div className="grid gap-6">
//               {contents?.map((content: any, index: number) => (
//                 <div
//                   key={content.id}
//                   className="p-4 border border-slate-700 rounded-lg"
//                 >
//                   <h4 className="text-sm font-semibold mb-3">
//                     Content #{index + 1}
//                   </h4>

//                   {/* Media */}
//                   <div className="mb-4">
//                     {isVideo(content.url) ? (
//                       <video
//                         src={content.url}
//                         controls
//                         className="w-full max-h-64 rounded-lg"
//                       />
//                     ) : (
//                       <img
//                         src={content.url}
//                         alt={`Content ${index + 1}`}
//                         className="w-full max-h-64 object-cover rounded-lg"
//                       />
//                     )}
//                   </div>

//                   {/* Screen Info */}
//                   <div className="grid grid-cols-2 gap-3 text-sm">
//                     <p>
//                       <span className="text-slate-400">Screen:</span>{" "}
//                       {content.screen?.screen_name}
//                     </p>
//                     <p>
//                       <span className="text-slate-400">Size:</span>{" "}
//                       {content.screen?.screen_size}
//                     </p>
//                     <p>
//                       <span className="text-slate-400">Resolution:</span>{" "}
//                       {content.screen?.resolution}
//                     </p>
//                     <p>
//                       <span className="text-slate-400">Location:</span>{" "}
//                       {content.screen?.location}
//                     </p>
//                     <p>
//                       <span className="text-slate-400">Price:</span> $
//                       {content.screen?.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }


// // 2nd


// // interface ApproveCampaignDetailsModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// //   campaign: any;
// // }

// // export default function ApproveCampaignDetailsModal({
// //   isOpen,
// //   onClose,
// //   campaign,
// // }: ApproveCampaignDetailsModalProps) {
// //   if (!isOpen || !campaign) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
// //       <div className="bg-bg-dashboard rounded-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] border border-slate-700">
// //         {/* Header */}
// //         <div className="flex justify-between items-center mb-6">
// //           <h2 className="text-lg font-semibold text-[#38B6FF]">
// //             Campaign Details
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-slate-400 hover:text-red-400 text-xl"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {/* Customer Info */}
// //         <div className="mb-6">
// //           <h3 className="text-sm font-medium text-slate-300 mb-2">
// //             Customer Info
// //           </h3>
// //           <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
// //             <p>
// //               <span className="text-slate-500">Name:</span>{" "}
// //               {campaign.customer?.first_name} {campaign.customer?.last_name}
// //             </p>
// //             <p>
// //               <span className="text-slate-500">Email:</span>{" "}
// //               {campaign.customer?.email}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Payment Info */}
// //         <div className="mb-6">
// //           <h3 className="text-sm font-medium text-slate-300 mb-2">
// //             Payment Info
// //           </h3>
// //           <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
// //             <p>
// //               <span className="text-slate-500">Amount:</span> $
// //               {campaign.CustomPayment?.[0]?.amount ?? 0}
// //             </p>
// //             <p>
// //               <span className="text-slate-500">Status:</span>{" "}
// //               {campaign.CustomPayment?.[0]?.status ?? "Unpaid"}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Campaign Info */}
// //         <div className="mb-6">
// //           <h3 className="text-sm font-medium text-slate-300 mb-2">
// //             Campaign Info
// //           </h3>
// //           <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
// //             <p>
// //               <span className="text-slate-500">Start Date:</span>{" "}
// //               {new Date(campaign.startDate).toLocaleDateString()}
// //             </p>
// //             <p>
// //               <span className="text-slate-500">End Date:</span>{" "}
// //               {new Date(campaign.endDate).toLocaleDateString()}
// //             </p>
// //             <p>
// //               <span className="text-slate-500">Status:</span>{" "}
// //               {campaign.status}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Screens Info */}
// //         <div className="mb-6">
// //           <h3 className="text-sm font-medium text-slate-300 mb-2">
// //             Screens ({campaign.screens?.length ?? 0})
// //           </h3>
// //           <div className="space-y-3">
// //             {campaign.screens?.map((screen: any) => (
// //               <div
// //                 key={screen.id}
// //                 className="p-3 border border-slate-700 rounded-lg text-sm text-slate-400 flex justify-between"
// //               >
// //                 <div>
// //                   <p className="text-slate-200 font-medium">
// //                     {screen.screen_name}
// //                   </p>
// //                   <p className="text-slate-500 text-xs">{screen.location}</p>
// //                 </div>
// //                 <p className="text-slate-300">${screen.price}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //        {/* Contents Info */}
// // <div className="mb-6">
// //   <h3 className="text-sm font-medium text-slate-300 mb-2">
// //     Contents ({campaign.contents?.length ?? 0})
// //   </h3>
// //   <div className="space-y-3">
// //     {campaign.contents?.map((content: any) => {
// //       const fileUrl = content.url;
// //       const fileName = fileUrl?.split("/").pop() ?? "Unknown File";
// //       const fileExt = fileUrl?.split(".").pop()?.toLowerCase();

// //       return (
// //         <div
// //           key={content.id}
// //           className="p-3 border border-slate-700 rounded-lg text-sm text-slate-400 space-y-2"
// //         >
// //           <p className="text-slate-200 font-medium break-all">{fileName}</p>
// //           <p className="text-slate-500 text-xs capitalize">{fileExt}</p>

// //           {/* Preview */}
// //           {fileExt === "mp4" ? (
// //             <video
// //               src={fileUrl}
// //               controls
// //               className="w-full h-auto rounded-lg border border-slate-600"
// //             />
// //           ) : fileExt === "jpg" ||
// //             fileExt === "jpeg" ||
// //             fileExt === "png" ||
// //             fileExt === "gif" ? (
// //             <img
// //               src={fileUrl}
// //               alt={fileName}
// //               className="w-full h-auto rounded-lg border border-slate-600"
// //             />
// //           ) : (
// //             <a
// //               href={fileUrl}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="text-blue-400 underline text-xs"
// //             >
// //               View File
// //             </a>
// //           )}
// //         </div>
// //       );
// //     })}
// //   </div>
// // </div>


// //         {/* Footer */}
// //         <div className="flex justify-end mt-6">
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
// //           >
// //             Close
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



interface ApproveCampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: any;
}

export default function ApproveCampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
}: ApproveCampaignDetailsModalProps) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-bg-dashboard rounded-xl w-full max-w-3xl p-6 overflow-y-auto max-h-[90vh] border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#38B6FF]">
            Campaign Details
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-400 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">
            Customer Info
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <p>
              <span className="text-slate-500">Name:</span>{" "}
              {campaign.customer?.first_name} {campaign.customer?.last_name}
            </p>
            <p>
              <span className="text-slate-500">Email:</span>{" "}
              {campaign.customer?.email}
            </p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">
            Payment Info
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <p>
              <span className="text-slate-500">Amount:</span> $
              {campaign.CustomPayment?.[0]?.amount ?? 0}
            </p>
            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {campaign.CustomPayment?.[0]?.status ?? "Unpaid"}
            </p>
          </div>
        </div>

        {/* Campaign Info */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">
            Campaign Info
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <p>
              <span className="text-slate-500">Start Date:</span>{" "}
              {new Date(campaign.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="text-slate-500">End Date:</span>{" "}
              {new Date(campaign.endDate).toLocaleDateString()}
            </p>
            <p>
              <span className="text-slate-500">Status:</span>{" "}
              {campaign.status}
            </p>
          </div>
        </div>

        {/* Screens Info */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-300 mb-2">
            Screens ({campaign.screens?.length ?? 0})
          </h3>
          <div className="space-y-3">
            {campaign.screens?.map((screen: any) => (
              <div
                key={screen.id}
                className="p-3 border border-slate-700 rounded-lg text-sm text-slate-400 flex justify-between"
              >
                <div>
                  <p className="text-slate-200 font-medium">
                    {screen.screen_name}
                  </p>
                  <p className="text-slate-500 text-xs">{screen.location}</p>
                </div>
                <p className="text-slate-300">${screen.price}</p>
              </div>
            ))}
          </div>
        </div>

       {/* Contents Info */}
<div className="mb-6">
  <h3 className="text-sm font-medium text-slate-300 mb-2">
    Contents ({campaign.contents?.length ?? 0})
  </h3>
  <div className="space-y-3">
    {campaign.contents?.map((content: any) => {
      const fileUrl = content.url;
      const fileName = fileUrl?.split("/").pop() ?? "Unknown File";
      const fileExt = fileUrl?.split(".").pop()?.toLowerCase();

      return (
        <div
          key={content.id}
          className="p-3 border border-slate-700 rounded-lg text-sm text-slate-400 space-y-2"
        >
          <p className="text-slate-200 font-medium break-all">{fileName}</p>
          <p className="text-slate-500 text-xs capitalize">{fileExt}</p>

          {/* Preview */}
          {fileExt === "mp4" ? (
            <video
              src={fileUrl}
              controls
              className="w-full h-auto rounded-lg border border-slate-600"
            />
          ) : fileExt === "jpg" ||
            fileExt === "jpeg" ||
            fileExt === "png" ||
            fileExt === "gif" ? (
            <img
              src={fileUrl}
              alt={fileName}
              className="w-full h-auto rounded-lg border border-slate-600"
            />
          ) : (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline text-xs"
            >
              View File
            </a>
          )}
        </div>
      );
    })}
  </div>
</div>


        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}



