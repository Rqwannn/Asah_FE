import React from "react";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";
import { Link } from "react-router-dom";

const ProfileSidebar = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	return (
		<div className="bg-[#FFFFFF] h-full w-[310px] absolute right-0 top-0 px-6 py-8 border-l border-gray-100 flex flex-col gap-6 overflow-y-auto">
			<div className="flex flex-col items-center gap-4">
				<div>
					<img
						src={ProfileImg}
						alt="Profile"
						className="rounded-full size-[72px] shrink-0 object-cover border-4 border-white shadow-sm"
					/>
				</div>

				<div className="flex flex-col gap-1 items-center w-full">
					<h1 className="text-[16px] font-bold leading-8 text-gray-900">{user.username || "Guest User"}</h1>

					<div className="w-full bg-[#F4F2EC] rounded-lg overflow-hidden py-1">
						<span className="text-[12px] whitespace-nowrap inline-block w-full animate-marquee font-medium text-[#000000] text-center">
							SI CEPAT PAHAM
						</span>
					</div>
				</div>

				<div className="flex w-full gap-4">
					<div className="bg-[#F4F2EC] rounded-lg w-full flex flex-col items-center justify-center gap-1 p-3">
						<span className="text-[24px] text-[#285F3E] font-bold leading-none">
							11
						</span>
						<span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
							Courses Completed
						</span>
					</div>
					<div className="bg-[#F4F2EC] rounded-lg w-full flex flex-col items-center justify-center gap-1 p-3">
						<span className="text-[24px] text-[#C34F21] font-bold leading-none">
							4
						</span>
						<span className="text-[10px] text-gray-600 font-medium text-center leading-tight">
							Certificates Earned
						</span>
					</div>
				</div>

				<Link to="/daily-checkin" className="w-full">
					<Button
						variant={null}
						className="w-full flex items-center justify-center gap-2 cursor-pointer mt-2 bg-white border border-gray-100 hover:bg-gray-50 py-6 rounded-xl shadow-sm transition-all">
						<div className="relative">
							<i className="ri-notification-3-fill text-[24px] text-[#285F3E]"></i>
							<span className="size-2.5 rounded-full animate-ping bg-[#F45B5B] absolute right-0 top-0"></span>
							<span className="absolute inline-flex size-2.5 rounded-full bg-[#F45B5B] top-0 right-0 border-2 border-white"></span>
						</div>
						<span className="text-[14px] font-semibold text-gray-700">
							Daily Check-in
						</span>
					</Button>
				</Link>

				<div className="w-full flex flex-col gap-4 mt-2">
					<div className="flex items-center justify-between">
						<span className="font-bold text-[14px] text-gray-900">Your Courses</span>
						<span className="text-[12px] text-[#285F3E] font-medium cursor-pointer hover:underline">See all</span>
					</div>
					
					{/* Course List */}
					<div className="flex flex-col gap-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="flex flex-col gap-3">
								<div className="flex items-center w-full gap-3">
									<div className="size-10 rounded-lg flex items-center justify-center bg-[#F4F2EC] text-[#285F3E] shrink-0">
										<i className="ri-figma-fill text-xl"></i>
									</div>
									<div className="flex flex-col flex-1 min-w-0">
										<span className="text-[12px] font-bold text-gray-900 truncate">
											Advanced Figma
										</span>
										<span className="text-[10px] text-gray-500 truncate">
											by Prashant Kumar
										</span>
									</div>
									<Button
										variant={null}
										className="bg-[#285F3E] hover:bg-[#1e462e] rounded-full text-white px-4 py-1 h-7 shrink-0 transition-colors">
										<span className="text-[10px] font-medium">Continue</span>
									</Button>
								</div>
								{i < 2 && <div className="w-full h-px bg-gray-100"></div>}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSidebar;
