import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [open, setOpen] = useState(true);  

  return (
    <div className="flex ">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Content */}
      <div  className={`
          flex-1 min-h-screen bg-[#F0F0F0] 
          transition-all duration-300
          ${open ? "ml-55" : "ml-20"}
        `}>
        <Header setOpen={setOpen} />
        <div className="mt-5 mx-5 ">
         <Outlet/>
      </div>
      </div>
     
    </div>
  );
};

export default Layout;



