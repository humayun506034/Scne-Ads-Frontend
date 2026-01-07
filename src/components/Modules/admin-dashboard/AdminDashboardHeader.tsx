import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';
import { logout, selectCurrentUser } from '@/store/Slices/AuthSlice/authSlice';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { motion } from 'framer-motion';
import { ChevronDown, LogOut, User } from "lucide-react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import { LiveChatSystem } from "../UserDashboard/LiveChat/LiveChatSystem";
const AdminDashboardHeader = () => {
    const user = useAppSelector(selectCurrentUser);
      const dispatch = useDispatch();
  return (
    
  <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className=" hidden md:flex justify-between items-start sm:items-center mb-8 gap-4"
        >
          <h1 className="text-4xl font-semibold text-white">
            Hey, <span className="text-secondary-color">{user?.first_name } {user?.last_name}</span>
          </h1>
          <div className="flex items-center gap-3 sm:gap-4">
            <LiveChatSystem />
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
            
       
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 text-white px-4 py-3 focus:ring-0 focus:outline-none focus:border-none border-none ring-0 rounded-full cursor-pointer transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] rounded-full flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="hidden sm:inline font-medium">{user?.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-full bg-[#1A2342] border-none flex items-center shadow-[0_0_12px_rgba(9,72,157,0.9)]  justify-center flex-col"
                  >
                    <DropdownMenuItem className="cursor-pointer py-2 hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] text-secondary-color hover:text-white px-5 w-full">
                      <Link
                        to="/admin-dashboard/adminBasicInfo"
                        className="flex items-center w-full"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem  onClick={() => {
                      dispatch(logout());
                      toast.success("Logout successful");
                    }} className="cursor-pointer py-2 px-5 flex items-center justify-between hover:bg-[linear-gradient(291deg,_#38B6FF_-45.64%,_#09489D_69.04%)] w-full text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
             
            </div>
         
          </div>
        </motion.div>

  );
};

export default AdminDashboardHeader;
