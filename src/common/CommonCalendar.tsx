import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function CommonCalendar({date,handleStartDateChange}) {
  return (
    <div> 
   
  
      <Dialog >
      <DialogTrigger asChild>
        <button
       
          className="w-full px-10 py-4 cursor-pointer mt-1 rounded-full bg-title-color text-black border-bg-border "
        >
          {date
            ? date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Select Date"}
        </button>
      </DialogTrigger>
      <DialogContent className="bg-[#081028] flex justify-center items-center w-fit border-white/10 text-white p-2">
      <Calendar
      mode="single"
   
      selected={date}
    
      onSelect={handleStartDateChange}
      classNames={{
        selected:
          "hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-white rounded-full",
        day: "text-white cursor-pointer",
        head_cell: "text-black p-4 m-2",
        nav_button_previous: "text-white",
        nav_button_next: "text-white",
        month: "text-white cursor-pointer",
        dropdown_year:
          "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
        dropdown_month:
          "bg-[#081028] p-2 text-white hover:bg-[#1e293b] rounded-md",
      }}
    />
      </DialogContent>
    </Dialog>
   

  </div>
  )
}
