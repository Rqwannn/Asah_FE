import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-[#F4F2EC] md:pl-[84px]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
