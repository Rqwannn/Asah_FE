import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className="relative min-h-screen ">
			<Navbar />
			<Outlet />
		</div>
	);
};

export default DashboardLayout;
