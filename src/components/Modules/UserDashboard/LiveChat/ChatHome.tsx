import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/Slices/AuthSlice/authSlice";
import { motion } from 'framer-motion';
import { ChevronRight } from "lucide-react";
 
import type { User } from ".";
import p3 from "../../../../assets/Dashboard/person3.png";
import logo from "../../../../assets/logo.png";

interface ChatHomeProps {

  userName: string;
  admins?: User[];
  onSelectAdmin?: (id: string) => void;
}

export function ChatHome({  userName, admins, onSelectAdmin }: ChatHomeProps) {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-bg-dashboard text-white p-4 relative">
        <div className="flex items-center justify-between mb-4 mr-10">
          <div className=" rounded-full w-fit h-[60px] p-2">
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
          {user?.role !== 'admin' && (
            <div className="flex gap-1">
              {admins?.slice(0, 3).map((a) => (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  key={a.id}
                  type="button"
                  onClick={() => onSelectAdmin?.(a.id)}
                  className="w-10 h-10 rounded-full border-2  overflow-hidden cursor-pointer "
                  title={`${a.first_name} ${a.last_name}`}
                >
                  <img
                    src={a.image || p3}
                    alt={`${a.first_name} ${a.last_name}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">Hey {userName}</h2>
          <p className="text-title-color">Need a hand (or two) ?</p>
        </div>
      </div>
         {user?.role !== 'admin' && (
           <div className="flex-1 p-4 space-y-4">
        <div
          onClick={() => onSelectAdmin?.("")}
          className="bg-bg-dashboard text-white rounded-lg p-4 cursor-pointer hover:bg-[#202E58] transition-colors"
        >
          <div>
            <h3 className="font-medium mb-2">Have Any Queries ?</h3>
            <div className="flex items-center gap-4">
              <div className="w-fit h-10  rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-title-color">Click on the  Icons to Chat</p>
                <p className="text-xs text-white mt-2">
                 Admins Are Here to Help! 
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
  <Button
          onClick={() => onSelectAdmin?.("")}
          className="w-full bg-bg-dashboard hover:bg-[#202E58] text-white cursor-pointer flex justify-start items-start rounded-lg p-4 h-auto"
        >
          <div className="  w-full text-start">
            <h3 className="font-medium">Ask a question</h3>
            <div className="flex w-full justify-between items-center mt-2">
                <div className="flex gap-1">
            {
              admins?.map((a) => (
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  key={a.id}
                  type="button"
                  onClick={() => onSelectAdmin?.(a.id)}
                  className="w-10 h-10 rounded-full border-2  overflow-hidden cursor-pointer "
                  title={`${a.first_name} ${a.last_name}`}
                >
                  <img
                    src={a.image || p3}
                    alt={`${a.first_name} ${a.last_name}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))
            }
          </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
              >
                <path
                  d="M7.41176 16L7.20588 13.6H7C5.05098 13.6 3.39706 12.94 2.03824 11.62C0.679412 10.3 0 8.69333 0 6.8C0 4.90667 0.679412 3.3 2.03824 1.98C3.39706 0.66 5.05098 0 7 0C7.97451 0 8.88382 0.176667 9.72794 0.53C10.5721 0.883333 11.3132 1.37 11.9515 1.99C12.5897 2.61 13.0907 3.33 13.4544 4.15C13.8181 4.97 14 5.85333 14 6.8C14 7.8 13.8319 8.76 13.4956 9.68C13.1593 10.6 12.6995 11.4533 12.1162 12.24C11.5328 13.0267 10.8397 13.74 10.0368 14.38C9.23382 15.02 8.35882 15.56 7.41176 16ZM9.05882 13.08C10.0333 12.28 10.826 11.3433 11.4368 10.27C12.0475 9.19667 12.3529 8.04 12.3529 6.8C12.3529 5.34667 11.8348 4.11667 10.7985 3.11C9.76225 2.10333 8.49608 1.6 7 1.6C5.50392 1.6 4.23775 2.10333 3.20147 3.11C2.1652 4.11667 1.64706 5.34667 1.64706 6.8C1.64706 8.25333 2.1652 9.48333 3.20147 10.49C4.23775 11.4967 5.50392 12 7 12H9.05882V13.08ZM6.97941 11.18C7.21275 11.18 7.41176 11.1 7.57647 10.94C7.74118 10.78 7.82353 10.5867 7.82353 10.36C7.82353 10.1333 7.74118 9.94 7.57647 9.78C7.41176 9.62 7.21275 9.54 6.97941 9.54C6.74608 9.54 6.54706 9.62 6.38235 9.78C6.21765 9.94 6.13529 10.1333 6.13529 10.36C6.13529 10.5867 6.21765 10.78 6.38235 10.94C6.54706 11.1 6.74608 11.18 6.97941 11.18ZM6.38235 8.64H7.61765C7.61765 8.24 7.65882 7.96 7.74118 7.8C7.82353 7.64 8.08431 7.34667 8.52353 6.92C8.77059 6.68 8.97647 6.42 9.14118 6.14C9.30588 5.86 9.38824 5.56 9.38824 5.24C9.38824 4.56 9.15147 4.05 8.67794 3.71C8.20441 3.37 7.6451 3.2 7 3.2C6.39608 3.2 5.88824 3.36333 5.47647 3.69C5.06471 4.01667 4.77647 4.41333 4.61176 4.88L5.76471 5.32C5.83333 5.09333 5.96373 4.87 6.15588 4.65C6.34804 4.43 6.62941 4.32 7 4.32C7.37059 4.32 7.64853 4.42 7.83382 4.62C8.01912 4.82 8.11176 5.04 8.11176 5.28C8.11176 5.50667 8.04314 5.71 7.90588 5.89C7.76863 6.07 7.60392 6.25333 7.41176 6.44C6.93137 6.84 6.63971 7.15667 6.53676 7.39C6.43382 7.62333 6.38235 8.04 6.38235 8.64Z"
                  fill="#14CA74"
                />
              </svg>
            </div>
          </div>
        </Button>
        </div>
         )}
         {
            user?.role === 'admin' && ( <div
          
          className="bg-bg-dashboard text-white  mt-6 mx-2 p-4 rounded-lg flex items-center gap-4  hover:bg-[#202E58] transition-colors"
        >
          <div>
            <h3 className="font-medium mb-2">Users are in thirst of help</h3>
            <div className="flex items-center gap-4">
              <div className="w-fit h-10  rounded-full flex items-center justify-center">
                <img src={logo} alt="logo" className="w-full h-full" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-title-color">Guide our users to the right path</p>
                <p className="text-xs text-white mt-2">
                  Assist Users with Their Queries! 
                </p>
              </div>
             
            </div>
          </div>
        </div>)
         }
   
    </div>
   
  );
}
