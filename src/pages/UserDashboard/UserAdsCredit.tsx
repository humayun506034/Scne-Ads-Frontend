import React from "react";
import UserPanelNavbar from "./UserPanelNavbar";

const UserPanel: React.FC = () => {
  return (
    <div className="bg-bg-dashboard">
      <UserPanelNavbar />

      <div className="px-10 py-6 mx-auto  flex items-center justify-center">
        <div className="w-full rounded-3xl bg-[#0B1739] px-14 py-11 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-[#7987AF] italic text-3xl">
            There are no records to display
          </h1>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
