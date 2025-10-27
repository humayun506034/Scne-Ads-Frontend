// "use client";

// import CommonDashboardButton from "@/common/CommonDashBoardButton";
// import CustomInput from "@/common/CommonDashboardInput";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Plus } from "lucide-react";
// import { useState } from "react";
// import { FieldValues, useForm } from "react-hook-form";

// export default function AddSpecialModal() {
//   const [open, setOpen] = useState(false);
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = (data: FieldValues) => {
//     console.log("New Special Added:", data);
//     reset();
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       {/* Trigger */}
//       <DialogTrigger asChild>
//         <div className="w-full h-[280px] flex items-center justify-center rounded-lg shadow-lg bg-[#132046] cursor-pointer hover:opacity-90">
//           <Plus size={40} className="text-white" />
//         </div>
//       </DialogTrigger>

//       {/* Modal Content */}
//       <DialogContent className="bg-[#081028] rounded-lg lg:p-10 lg:min-w-5xl mx-auto overflow-y-auto border-none max-h-[80vh] ">
//         <DialogHeader>
//           <DialogTitle className="flex justify-between items-center">
//             <p className=" md:text-2xl mb-4">Add Special</p>
//           </DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label>Title</label>
//             <CustomInput
//               register={register("title")}
//               placeholder="Enter special title"
//             />
//           </div>

//           <div className="mb-4">
//             <label>Price</label>
//             <CustomInput
//               register={register("price")}
//               placeholder="Enter price"
//             />
//           </div>

//           <div className="flex gap-4 mt-12 justify-end">
//             <CommonDashboardButton title="Add Special" Icon={Plus} />
//             <button
//               onClick={() => setOpen(false)}
//               type="button"
//               className="px-4 py-2 cursor-pointer rounded-md border-secondary-color border text-white"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
