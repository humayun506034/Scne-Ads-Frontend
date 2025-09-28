// import CommonCancelButton from "@/common/CommonCancelButton";
// import CommonDashboardButton from "@/common/CommonDashBoardButton";
// import CustomInput from "@/common/CommonDashboardInput";
// import CustomTextarea from "@/common/CommonDashboardTextArea";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { locationData } from "@/lib/Data";
// import { DialogTrigger } from "@radix-ui/react-dialog";
// import { motion } from "framer-motion";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";
// import AdminLocationCard from "./AdminLocationCard";
// import LocationMapModal from "./LocationMap";

// export default function AdminLocationTabs() {
//   const [tab, setTab] = useState("new");
//   const [open, setOpen] = useState(false);
//   const TabName = [
//     { tab: "new", label: "NEW ARRIVALS" },
//     { tab: "top", label: "TOP SALES" },
//     { tab: "fav", label: "FAVOURITES" },
//   ];
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [files, setFiles] = useState<File[]>([]);
//   const [openMap, setOpenMap] = useState(false);
//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const uploadedFiles = Array.from(e.target.files);
//       setFiles((prev) => [...prev, ...uploadedFiles]);
//     }
//   };

//   const handleClick = () => {
//     const fileInput = document.getElementById(
//       "file-upload"
//     ) as HTMLInputElement;
//     fileInput?.click();
//   };
//   const onSubmit = (data: FieldValues) => {
//     console.log("Form Data:", data);
//     reset();
//   };

//   return (
//     <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
//       <TabsList className="bg-transparent mb-8">
//         {TabName.map((item) => (
//           <TabsTrigger
//             key={item.tab}
//             value={item.tab}
//             className={`text-white cursor-pointer text-sm font-semibold ${
//               tab === item.tab ? "font-semibold" : "font-normal"
//             }`}
//           >
//             <div className="flex items-center gap-2">
//               {item.label}
//               {/* Edit Icon */}
//               <div className="rounded-full p-1 cursor-pointer">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="10"
//                   height="10"
//                   viewBox="0 0 17 17"
//                   fill="none"
//                 >
//                   <g clip-path="url(#clip0_804_2381)">
//                     <path
//                       d="M8.6619 0C8.70036 0.0202068 8.73679 0.0424343 8.77524 0.0606205C9.0606 0.198027 9.21441 0.50315 9.14964 0.802211C9.08286 1.1134 8.81774 1.32759 8.49393 1.32759C7.33833 1.32759 6.18071 1.35992 5.02714 1.32153C3.25024 1.26091 1.7344 2.833 1.44702 4.07167C1.38024 4.36467 1.33369 4.67182 1.33167 4.9729C1.32155 7.32497 1.32357 9.67503 1.32762 12.0271C1.32762 12.9788 1.67369 13.7851 2.34357 14.4681C2.83333 14.9672 3.3656 15.3855 4.05369 15.5532C4.34714 15.6239 4.65274 15.6684 4.95429 15.6704C7.31607 15.6805 9.67786 15.6765 12.0396 15.6744C12.924 15.6744 13.6911 15.3673 14.3407 14.7692C14.8932 14.26 15.3688 13.6962 15.5408 12.9425C15.6117 12.6333 15.6562 12.31 15.6602 11.9927C15.6744 10.8309 15.6643 9.66896 15.6663 8.50707C15.6663 8.16962 15.9051 7.89076 16.2229 7.84429C16.5669 7.79579 16.8765 7.99584 16.9696 8.33329C16.9879 8.402 16.9919 8.47474 16.9919 8.54547C16.9919 9.72959 16.998 10.9137 16.9919 12.0978C16.9838 13.3749 16.5123 14.458 15.6258 15.3774C15.0248 15.9998 14.3589 16.515 13.5231 16.7717C13.2296 16.8626 12.922 16.905 12.6205 16.9717C12.584 16.9798 12.5476 16.9939 12.5112 17.004H4.48071C4.45036 16.9939 4.42 16.9778 4.38762 16.9737C3.3494 16.8626 2.47107 16.418 1.71012 15.7148C0.971429 15.0339 0.400714 14.2519 0.151786 13.2638C0.0890476 13.0152 0.0505952 12.7647 0 12.5181C0 9.8387 0 7.1613 0 4.48187C0.0384524 4.27778 0.0728571 4.07167 0.119405 3.86759C0.404762 2.5986 1.18393 1.66706 2.18369 0.897183C2.68357 0.511233 3.25024 0.254606 3.8675 0.115179C4.06988 0.0707239 4.27631 0.038393 4.48071 0C5.87512 0 7.26952 0 8.6619 0Z"
//                       fill="#EBF8FF"
//                     />
//                     <path
//                       d="M13.3754 0C13.4746 0.0262689 13.5758 0.0505171 13.675 0.0808273C14.0352 0.187923 14.357 0.365744 14.6241 0.632474C15.2009 1.20635 15.7777 1.7782 16.3484 2.35814C17.2166 3.24117 17.2166 4.6213 16.3423 5.50838C15.3487 6.5167 14.3428 7.5129 13.341 8.51516C11.9021 9.95388 10.4612 11.3926 9.02627 12.8354C8.83401 13.0294 8.62151 13.1183 8.3483 13.1163C7.12592 13.1102 5.90354 13.1041 4.68115 13.1243C4.18127 13.1324 3.90199 12.7707 3.91008 12.3605C3.9283 11.0935 3.9202 9.82658 3.91413 8.55961C3.91413 8.32723 3.99104 8.14335 4.15294 7.9817C6.58961 5.54677 9.02627 3.10983 11.4629 0.670867C11.8009 0.333413 12.2016 0.115179 12.6732 0.0323309C12.6975 0.0282896 12.7218 0.0101034 12.746 0C12.9565 0 13.167 0 13.3775 0L13.3754 0ZM10.4429 3.58469C10.4207 3.6049 10.4004 3.62308 10.3802 3.64127C8.69437 5.32652 7.01056 7.01177 5.32675 8.70106C5.2802 8.74955 5.2458 8.8324 5.2458 8.90111C5.23973 9.8185 5.24175 10.7379 5.24175 11.6553C5.24175 11.6977 5.24985 11.7402 5.25389 11.7826C5.28627 11.7846 5.30854 11.7887 5.32877 11.7887C6.24556 11.7887 7.16437 11.7887 8.08116 11.7806C8.15199 11.7806 8.23496 11.7301 8.28758 11.6775C9.9633 10.0064 11.637 8.33127 13.3087 6.65815C13.3451 6.62178 13.3815 6.58136 13.4058 6.55509C12.4101 5.5589 11.4306 4.57685 10.4389 3.58469H10.4429ZM14.3853 5.58315C14.7193 5.24973 15.0572 4.91834 15.3891 4.57887C15.7595 4.19898 15.7635 3.66552 15.3912 3.28563C14.8326 2.71782 14.27 2.15405 13.7033 1.59634C13.3329 1.23262 12.7966 1.23868 12.4243 1.60038C12.1106 1.9055 11.805 2.21669 11.4973 2.52585C11.467 2.55616 11.4407 2.59051 11.4204 2.61476C12.4081 3.6049 13.3896 4.58493 14.3873 5.58315H14.3853Z"
//                       fill="#EBF8FF"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_804_2381">
//                       <rect width="17" height="17" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </div>
//             </div>
//           </TabsTrigger>
//         ))}
//         <TabsTrigger className="w-full scale-150   h-full" value="new">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="60"
//             height="60"
//             viewBox="0 0 30 30"
//             fill="none"
//           >
//             <g clip-path="url(#clip0_804_2398)">
//               <path
//                 d="M30.0001 13.9389V16.0457C29.9385 16.5079 29.8884 16.9701 29.8075 17.4284C29.1218 21.2993 27.2536 24.4845 24.1295 26.8687C20.4662 29.6649 16.3252 30.5931 11.8221 29.6264C7.66575 28.7367 4.46082 26.4103 2.23046 22.8091C0.181156 19.5044 -0.439029 15.9032 0.30057 12.0824C0.932311 8.82398 2.51552 6.08936 4.96544 3.86699C7.08794 1.94505 9.56867 0.724098 12.3961 0.231095C12.9123 0.142509 13.4323 0.0770317 13.9523 0C14.6534 0 15.3584 0 16.0594 0C16.5409 0.065477 17.0224 0.115548 17.5001 0.200282C20.2582 0.681731 22.712 1.82565 24.8191 3.67056C27.4693 5.98922 29.1334 8.88176 29.7613 12.3559C29.8576 12.8797 29.9192 13.4112 29.9963 13.9389H30.0001ZM13.5941 16.4039C13.5941 16.558 13.5941 16.6735 13.5941 16.7891C13.5941 18.7996 13.5941 20.8101 13.5941 22.8206C13.5941 23.3021 13.7713 23.6988 14.1565 23.9838C14.611 24.3228 15.1157 24.3651 15.6203 24.1263C16.1403 23.8798 16.4177 23.4446 16.4177 22.8669C16.4254 20.8371 16.4177 18.8073 16.4177 16.7775C16.4177 16.662 16.4177 16.5503 16.4177 16.4039C16.5679 16.4039 16.6835 16.4039 16.7952 16.4039C18.806 16.4039 20.8167 16.4039 22.8275 16.4039C23.309 16.4039 23.7058 16.2306 23.9947 15.8454C24.3414 15.3832 24.3838 14.8671 24.1334 14.3549C23.8869 13.8503 23.4554 13.5807 22.8892 13.5768C20.8514 13.5691 18.8098 13.5768 16.7721 13.5768C16.6604 13.5768 16.5486 13.5768 16.4215 13.5768C16.4215 13.4189 16.4215 13.3111 16.4215 13.2032C16.4215 11.185 16.4215 9.16292 16.4215 7.14469C16.4215 6.65169 16.2289 6.25112 15.8283 5.96611C15.3661 5.64257 14.8614 5.60406 14.3607 5.85826C13.8599 6.11247 13.5941 6.53999 13.5941 7.11003C13.5941 9.13981 13.5941 11.1696 13.5941 13.1994C13.5941 13.3149 13.5941 13.4266 13.5941 13.573C13.4439 13.573 13.3283 13.573 13.2166 13.573C11.1981 13.573 9.17576 13.573 7.15727 13.573C6.54479 13.573 6.04402 13.9081 5.82445 14.4473C5.44695 15.3717 6.10951 16.3885 7.11105 16.3923C9.14109 16.4039 11.1711 16.3962 13.2012 16.3962C13.3167 16.3962 13.4323 16.3962 13.5979 16.3962L13.5941 16.4039Z"
//                 fill="#033579"
//               />
//               <path
//                 d="M13.594 16.4046C13.4284 16.4046 13.3128 16.4046 13.1973 16.4046C11.1672 16.4046 9.13718 16.4123 7.10713 16.4008C6.10559 16.3969 5.44689 15.3762 5.82054 14.4557C6.04011 13.9165 6.54088 13.5814 7.15336 13.5814C9.17185 13.5814 11.1942 13.5814 13.2127 13.5814C13.3282 13.5814 13.44 13.5814 13.5902 13.5814C13.5902 13.435 13.5902 13.3233 13.5902 13.2078C13.5902 11.178 13.5902 9.14822 13.5902 7.11843C13.5902 6.5484 13.856 6.12087 14.3567 5.86667C14.8575 5.61246 15.3621 5.64713 15.8244 5.97451C16.225 6.25568 16.4176 6.65624 16.4176 7.1531C16.4176 9.17133 16.4176 11.1934 16.4176 13.2116C16.4176 13.3195 16.4176 13.4235 16.4176 13.5852C16.5447 13.5852 16.6564 13.5852 16.7682 13.5852C18.8059 13.5852 20.8475 13.5852 22.8853 13.5852C23.4515 13.5852 23.8829 13.8587 24.1295 14.3633C24.3799 14.8755 24.3375 15.3916 23.9908 15.8538C23.7057 16.239 23.3051 16.4123 22.8236 16.4123C20.8128 16.4123 18.802 16.4123 16.7913 16.4123C16.6757 16.4123 16.564 16.4123 16.4138 16.4123C16.4138 16.5587 16.4138 16.6704 16.4138 16.7859C16.4138 18.8157 16.4138 20.8455 16.4138 22.8753C16.4138 23.453 16.1364 23.8882 15.6164 24.1347C15.1118 24.3735 14.6071 24.3312 14.1526 23.9922C13.7674 23.7072 13.5902 23.3105 13.5902 22.8291C13.5902 20.8185 13.5902 18.808 13.5902 16.7975C13.5902 16.6819 13.5902 16.5664 13.5902 16.4123L13.594 16.4046Z"
//                 fill="white"
//               />
//             </g>
//             <defs>
//               <clipPath id="clip0_804_2398">
//                 <rect width="30" height="30" fill="white" />
//               </clipPath>
//             </defs>
//           </svg>
//         </TabsTrigger>
//       </TabsList>

//       <TabsContent value={tab}>
//         <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
//           {locationData
//             .filter((location) => location.category === tab)
//             .map((location, index) => (
//               <>
//                 {index === 0 && (
//                   <Dialog key={index} open={open} onOpenChange={setOpen}>
//                     {" "}
//                     <DialogTrigger asChild>
//                       <motion.div
//                         whileTap={{ scale: 0.8 }}
//                         whileHover={{ scale: 1.1 }}
//                         className="w-full  h-full  flex items-center justify-center rounded-lg shadow-lg"
//                       >
//                         <div className="bg-secondary-color w-20 h-20 rounded-full flex items-center justify-center cursor-pointer">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="45"
//                             height="45"
//                             viewBox="0 0 45 45"
//                             fill="none"
//                           >
//                             <path
//                               d="M18.4665 26.4165H0V18.4665H18.4665V0H26.4165V18.4665H44.883V26.4165H26.4165V44.883H18.4665V26.4165Z"
//                               fill="#033579"
//                             />
//                           </svg>
//                         </div>
//                       </motion.div>
//                     </DialogTrigger>
//                     <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
//                       <DialogHeader>
//                         <DialogTitle className="flex justify-between items-center">
//                           <p className=" md:text-2xl mb-4">Add Screen</p>
//                           <div>
//                             <LocationMapModal
//                               open={openMap}
//                               setOpenMap={setOpenMap}
//                             />
//                           </div>
//                         </DialogTitle>
//                       </DialogHeader>
//                       <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="mb-4">
//                           <label className=" ">Screen Name</label>
//                           <CustomInput
//                             register={register("title")}
//                             placeholder={"Enter screen name"}
//                             isError={!!errors.screenName}
//                           />
//                         </div>

//                         <div className="mb-4">
//                           <label className="">Screen Location</label>
//                           <CustomInput
//                             register={register("location")}
//                             placeholder={"Enter screen location"}
//                             isError={!!errors.location}
//                           />
//                         </div>

//                         <div className="mb-4">
//                           <label className="">Description</label>
//                           <CustomTextarea
//                             register={register("description")}
//                             placeholder={"Enter screen description"}
//                             isError={!!errors.description}
//                           />
//                         </div>

//                         <div className="mb-4">
//                           <label className="">Screen Resolution</label>
//                           <CustomInput
//                             register={register("location")}
//                             placeholder={"Enter screen size"}
//                           />
//                         </div>

//                         <div className="mb-4">
//                           <label className=" mb-2">Tier Level</label>
//                           <div className="flex flex-row flex-wrap gap-4 my-2">
//                             <label className="flex items-center gap-2">
//                               <input
//                                 type="radio"
//                                 value="Basic"
//                                 {...register("tierLevel", { required: true })}
//                                 className="accent-secondary-color cursor-pointer"
//                               />
//                               <span>Basic</span>
//                             </label>

//                             <label className="flex items-center gap-2">
//                               <input
//                                 type="radio"
//                                 value="Standard"
//                                 {...register("tierLevel", { required: true })}
//                                 className="accent-secondary-color cursor-pointer"
//                               />
//                               <span>Standard</span>
//                             </label>

//                             <label className="flex items-center gap-2">
//                               <input
//                                 type="radio"
//                                 value="Premium"
//                                 {...register("tierLevel", { required: true })}
//                                 className="accent-secondary-color cursor-pointer"
//                               />
//                               <span>Premium</span>
//                             </label>
//                           </div>

//                           {errors.tierLevel && (
//                             <p className="text-red-500 text-sm">
//                               Please select a tier
//                             </p>
//                           )}
//                         </div>

//                         <div className="mb-4">
//                           <label className="">Screen Thumbnail</label>
//                           <div className="flex items-start  gap-4">
//                             {files && (
//                               <div className="flex my-2 flex-wrap gap-2 w-1/2">
//                                 {files.map((file, index) => (
//                                   <div key={index} className=" relative">
//                                     <img
//                                       src={URL.createObjectURL(file)}
//                                       alt="preview"
//                                       className="w-full max-h-40 h-full object-fill rounded-md"
//                                     />
//                                   </div>
//                                 ))}
//                               </div>
//                             )}

//                             <div
//                               className="border-dashed  bg-[#132C51] p-6 rounded-md flex items-center justify-center cursor-pointer w-1/2 h-32"
//                               onClick={handleClick}
//                             >
//                               <input
//                                 id="file-upload"
//                                 type="file"
//                                 accept="image/*"
//                                 multiple
//                                 onChange={handleFileUpload}
//                                 className="hidden"
//                               />
//                               <span className="text-sm md:text-base">
//                                 {files.length > 0 ? (
//                                   "Upload More Images"
//                                 ) : (
//                                   <div className="flex flex-col items-center justify-center">
//                                     {" "}
//                                     <svg
//                                       xmlns="http://www.w3.org/2000/svg"
//                                       width="54"
//                                       height="54"
//                                       viewBox="0 0 54 54"
//                                       fill="none"
//                                     >
//                                       <path
//                                         d="M47.25 33.75V42.75C47.25 43.9435 46.7759 45.0881 45.932 45.932C45.0881 46.7759 43.9435 47.25 42.75 47.25H11.25C10.0565 47.25 8.91193 46.7759 8.06802 45.932C7.22411 45.0881 6.75 43.9435 6.75 42.75V33.75M38.25 18L27 6.75M27 6.75L15.75 18M27 6.75V33.75"
//                                         stroke="white"
//                                         stroke-width="2.5"
//                                         stroke-linecap="round"
//                                         stroke-linejoin="round"
//                                       />
//                                     </svg>
//                                   </div>
//                                 )}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="mb-4">
//                           <label className="">Cost Per Play</label>
//                           <CustomInput
//                             type="number"
//                             {...register("costPerPlay")}
//                             placeholder={"Enter cost per play"}
//                           />
//                         </div>

//                         <div className="flex gap-4  mt-12 justify-end">
//                           <CommonDashboardButton
//                             title="Add Screen"
//                             Icon={Plus}
//                           />
//                           <CommonCancelButton
//                             onClick={() => {
//                               reset();
//                               setOpen(false);
//                             }}
//                             title="Cancel"
//                           />
//                         </div>
//                       </form>
//                     </DialogContent>
//                   </Dialog>
//                 )}
//                 <AdminLocationCard edit={true} location={location} />
//               </>
//             ))}
//         </div>
//       </TabsContent>
//     </Tabs>
//   );
// }


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// RTK Query hooks


// demo data (new arrivals এর জন্য)
import { locationData } from "@/lib/Data";
import { useGetMySelfFavouriteScreensQuery, useGetTopSalesScreenQuery } from "@/store/api/Screen/screenApi";
import AdminLocationCard from "./AdminLocationCard";

export default function AdminLocationTabs() {
  const [tab, setTab] = useState("new");

  // RTK Query calls
  const {
    data: topSalesData,
    isLoading: topSalesLoading,
    error: topSalesError,
  } = useGetTopSalesScreenQuery(undefined, {
    skip: tab !== "top",
  });

  const {
    data: favData,
    isLoading: favLoading,
    error: favError,
  } = useGetMySelfFavouriteScreensQuery(undefined, {
    skip: tab !== "fav",
  });

  const TabName = [
    { tab: "new", label: "NEW ARRIVALS" },
    { tab: "top", label: "TOP SALES" },
    // { tab: "fav", label: "FAVOURITES" },
  ];

  // কোন ট্যাবে কোন ডেটা আসবে
  let screenData: any[] = [];
  let loading = false;

  if (tab === "new") {
    screenData = locationData.filter((location) => location.category === "new");
  } else if (tab === "top") {
    screenData = topSalesData?.data || [];
    loading = topSalesLoading;
  } else if (tab === "fav") {
    screenData =
      favData?.data?.map((item: any) => ({
        id: item.screen.id,
        title: item.screen.screen_name,
        description: item.screen.description,
        screenSize: item.screen.screen_size,
        resolution: item.screen.resolution,
        image: item.screen.img_url,
        price: item.screen.price,
        lat: item.screen.lat,
        lng: item.screen.lng,
        location: item.screen.location,
      })) || [];
    loading = favLoading;
  }

  console.log(screenData)

  return (
    <Tabs value={tab} onValueChange={setTab} className="w-full mt-20">
      {/* Tabs Header */}
      <TabsList className="bg-transparent mb-8">
        {TabName.map((item) => (
          <TabsTrigger
            key={item.tab}
            value={item.tab}
            className={`text-white cursor-pointer text-sm font-semibold ${
              tab === item.tab ? "font-semibold" : "font-normal"
            }`}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value={tab}>
        {loading ? (
          <p className="text-white">Loading...</p>
        ) : screenData.length === 0 ? (
          <p className="text-white">No screens found</p>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {screenData.map((location, index) => (
              <AdminLocationCard
                key={location.id || index}
                edit={true}
                location={location}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
