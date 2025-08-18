import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
interface CampaignTableProps {
  activeStatus: string;
  setActiveStatus: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  finishDate: Date | undefined;
  setFinishDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  openFinish: boolean;
  setOpenFinish: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenStart: React.Dispatch<React.SetStateAction<boolean>>;
  openStart: boolean;
  activeDay: string;
  setActiveDay: React.Dispatch<React.SetStateAction<string>>;
}
export function CampaignFilterTable({
  activeStatus,
  setActiveStatus,
  activeDay,
  setActiveDay,
  openStart,
  setOpenStart,
  openFinish,
  setOpenFinish,
  startDate,
  setFinishDate,
  setStartDate,
  finishDate,
}: CampaignTableProps) {
  const activeStatusItems = ["Paused", "Active", "Had Delivery", "No Delivery"];
  const selectedDays = ["Today", "1D", "7D", "1 Mo"];
  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    console.log("Start Date:", date);
    setOpenStart(false);
  };

  const handleFinishDateChange = (date: Date | undefined) => {
    setFinishDate(date);
    console.log("Finish Date:", date);
    setOpenFinish(false);
  };
  return (
    <div className="  w-full   rounded-xl ">
      <div className="flex flex-col xl:flex-row items-center  justify-between gap-4">
        {" "}
        <div className="w-full px-4 py-3 rounded-xl font-normal flex justify-start items-start  border bg-dashboard-card-bg border-[#343B4F] text-white  border-r ">
          <span className="text-gray-400">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search  for a campaign"
            className="focus:outline-none w-full  px-4 border-[#343B4F]"
          />
        </div>
        <div className="flex items-center md:flex-nowrap flex-wrap gap-2">
          {activeStatusItems.map((status, idx) => (
            <Button
              key={idx}
              onClick={() => setActiveStatus(status)}
              className={`bg-[#1B284A] cursor-pointer rounded-full text-white px-4 py-2 ${
                activeStatus === status
                  ? "bg-gradient-to-r to-[#38B6FF] from-[#09489D]"
                  : ""
              }`}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between  xl:flex-row gap-3 mt-12 md:mt-20 w-full">
        <div className="flex items-center gap-4 bg-[#1B284A] rounded-lg px-4 py-1 text-white">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                d="M13.8333 1.66602V4.99935M7.16667 1.66602V4.99935M3 8.33268H18M4.66667 3.33268H16.3333C17.2538 3.33268 18 4.07887 18 4.99935V16.666C18 17.5865 17.2538 18.3327 16.3333 18.3327H4.66667C3.74619 18.3327 3 17.5865 3 16.666V4.99935C3 4.07887 3.74619 3.33268 4.66667 3.33268Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-title-color py-3 md:py-auto md:text-xl">
            Dates
          </span>
        </div>
        <div className="flex items-center w-full justify-center gap-4 ">
          <Popover open={openStart} onOpenChange={setOpenStart}>
            <PopoverTrigger asChild>
              <button
                id="start-date"
                className=" px-4 w-full py-4 bg-[#16294E] rounded-lg  font-normal text-lg gap-4 xl:w-96 flex justify-between cursor-pointer items-center"
              >
                {startDate
                  ? startDate.toLocaleDateString()
                  : "Select Start Date"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="27"
                  viewBox="0 0 26 27"
                  fill="none"
                >
                  <path
                    d="M17.3333 2.83203V7.16536M8.66667 2.83203V7.16536M3.25 11.4987H22.75M5.41667 4.9987H20.5833C21.7799 4.9987 22.75 5.96875 22.75 7.16536V22.332C22.75 23.5286 21.7799 24.4987 20.5833 24.4987H5.41667C4.22005 24.4987 3.25 23.5286 3.25 22.332V7.16536C3.25 5.96875 4.22005 4.9987 5.41667 4.9987Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto z-50 overflow-hidden p-0"
              align="start"
              side="bottom"
            >
              <div className="bg-[#081028] border-none">
                <Calendar
                  mode="single"
                  className="border-none"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  captionLayout="dropdown"
                  classNames={{
                    selected:
                      "hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)]  text-white rounded-full",
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
              </div>
            </PopoverContent>
          </Popover>

          <Popover open={openFinish} onOpenChange={setOpenFinish}>
            <PopoverTrigger asChild>
              <button
                id="finish-date"
                className=" px-4 py-4  w-full bg-[#16294E] rounded-lg font-normal text-lg gap-4 xl:w-96 flex justify-between cursor-pointer items-center"
              >
                {finishDate
                  ? finishDate.toLocaleDateString()
                  : "Optional - Set Finish Date"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="27"
                  viewBox="0 0 26 27"
                  fill="none"
                >
                  <path
                    d="M17.3333 2.83203V7.16536M8.66667 2.83203V7.16536M3.25 11.4987H22.75M5.41667 4.9987H20.5833C21.7799 4.9987 22.75 5.96875 22.75 7.16536V22.332C22.75 23.5286 21.7799 24.4987 20.5833 24.4987H5.41667C4.22005 24.4987 3.25 23.5286 3.25 22.332V7.16536C3.25 5.96875 4.22005 4.9987 5.41667 4.9987Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
              side="bottom"
            >
              {" "}
              <div className="bg-[#081028] border-none">
                <Calendar
                  mode="single"
                  className="border-none"
                  selected={finishDate}
                  captionLayout="dropdown"
                  onSelect={handleFinishDateChange}
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
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center justify-center  gap-2">
          {selectedDays.map((day, idx) => (
            <Button
              onClick={() => setActiveDay(day)}
              key={idx}
              className={`bg-[#1B284A] cursor-pointer  md:text-lg md:font-semibold rounded-full text-white px-6 py-3 ${
                activeDay === day
                  ? "bg-gradient-to-r from-[#38B6FF] to-[#09489D]"
                  : ""
              }`}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
