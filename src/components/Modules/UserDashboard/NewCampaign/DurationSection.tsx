import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DurationSection() {
  const [openStart, setOpenStart] = React.useState(false);
  const [openFinish, setOpenFinish] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [finishDate, setFinishDate] = React.useState<Date | undefined>(
    undefined
  );

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
    <div className="my-20">
      <h1 className="text-2xl md:text-4xl ">Duration </h1>
      <h1 className="text-xl mt-8 md:text-2xl flex justify-start items-center gap-4 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="39"
          viewBox="0 0 35 39"
          fill="none"
        >
          <path
            d="M10.166 1V6.5"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.834 1V6.5"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.91602 13.998H33.0827"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M34 12.9167V28.5C34 34 31.25 37.6667 24.8333 37.6667H10.1667C3.75 37.6667 1 34 1 28.5V12.9167C1 7.41667 3.75 3.75 10.1667 3.75H24.8333C31.25 3.75 34 7.41667 34 12.9167Z"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.2738 22.4499H24.2903"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.2738 27.9499H24.2903"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.4916 22.4499H17.508"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.4916 27.9499H17.508"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.7064 22.4499H10.7229"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.7064 27.9499H10.7229"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Set Dates{" "}
      </h1>
      <div className="flex flex-col justify-between  md:flex-row gap-3 mt-12">
        <Popover open={openStart} onOpenChange={setOpenStart}>
          <PopoverTrigger asChild>
            <button
              id="start-date"
              className="w-48 p-6 bg-dashboard-card-bg rounded-full   font-normal text-lg md:w-72 lg:w-96 flex justify-between cursor-pointer items-center"
            >
              {startDate ? startDate.toLocaleDateString() : "Select Start Date"}
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
                captionLayout="dropdown"
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
            </div>
          </PopoverContent>
        </Popover>

        <div className="hidden md:flex items-center justify-center text-xl font-medium text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41"
            height="16"
            viewBox="0 0 41 16"
            fill="none"
          >
            <path
              d="M40.7071 8.37312C41.0976 7.9826 41.0976 7.34943 40.7071 6.95891L34.3431 0.594948C33.9526 0.204423 33.3195 0.204423 32.9289 0.594948C32.5384 0.985472 32.5384 1.61864 32.9289 2.00916L38.5858 7.66602L32.9289 13.3229C32.5384 13.7134 32.5384 14.3466 32.9289 14.7371C33.3195 15.1276 33.9526 15.1276 34.3431 14.7371L40.7071 8.37312ZM0 7.66602V8.66602H40V7.66602V6.66602H0V7.66602Z"
              fill="white"
            />
          </svg>
        </div>

        <Popover open={openFinish} onOpenChange={setOpenFinish}>
          <PopoverTrigger asChild>
            <button
              id="finish-date"
              className="w-48 p-6 bg-dashboard-card-bg rounded-full  font-normal text-lg md:w-72 lg:w-96 flex justify-between cursor-pointer items-center"
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
            <Calendar mode="single" captionLayout="dropdown" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
