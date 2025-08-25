import React from "react";
import UserPanelNavbar from "./UserPanelNavbar";

const UserInvoice: React.FC = () => {
  return (
    <div className="bg-bg-dashboard">
      <UserPanelNavbar />
      <div className="px-10 py-4 mx-auto italic flex items-center justify-center">
        <div className="w-full rounded-3xl gap-3 px-14 py-2 flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-[#C3CEE9] text-3xl">No invoices found.</h1>
          <p className="text-[#C3CEE9] text-xl">
            Looks like you don’t have an invoice yet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInvoice;
