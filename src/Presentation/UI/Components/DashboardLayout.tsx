import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className="relative h-screen bg-[#F4F2EC]  lg:pl-[152px] overflow-hidden">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
