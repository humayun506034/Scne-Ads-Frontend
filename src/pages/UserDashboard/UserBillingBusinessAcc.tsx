import React from "react";
import UserPanelNavbar from "./UserPanelNavbar";

const UserPanel: React.FC = () => {

  return (
    <div className=" bg-bg-dashboard ">
      <UserPanelNavbar />
      <div >
        <main className="flex flex-col mx-auto items-center justify-center">
           {/* Form Section */} 
              <div className="w-full max-w-5xl mt-24 p-6 flex flex-col items-center justify-center">
<h1 className="text-[#E4E7EC] text-4xl pb-20">Please enter your Business Account details</h1>
        {/* Form */}


        <p className="text-[#B1C0D5] pt-9 hover:text-white underline cursor-pointer">Switch to a personal account</p>
      </div>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;
