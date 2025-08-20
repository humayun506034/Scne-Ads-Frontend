import React from "react";
import UserPanelNavbar from "./UserPanelNavbar";
import CommonDashboardButton from "@/common/CommonDashBoardButton";
import { Link } from "react-router-dom";

const UserPanel: React.FC = () => {
  return (
    <div className=" bg-bg-dashboard ">
      <UserPanelNavbar />

      <div className="w-full mt-24 p-6 flex items-center justify-center">
        <div className=" w-md rounded-3xl bg-[#0B1739] px-14 py-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <div className="p-1 gap-4">
            <h3 className="text-xl mb-3 text-center font-normal text-[ #E4E7EC]">
              You Have no payment methods.
            </h3>
            <p className="text-sm text-center text-[#C3CEE9]">
              In order to create a campaign you must add a primary payment
              method.
            </p>
          </div>
          <div className="mt-4 ">
            <Link to="">
              {" "}
              <CommonDashboardButton
                title="Add Payment Method"
                className="px-10 py-2 mt-4 text-xl font-semibold"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
