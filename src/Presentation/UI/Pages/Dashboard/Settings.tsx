import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";

type CourseStatus = "continue" | "done";

interface CourseItem {
	id: string;
	title: string;
	deadline: string;
	status: CourseStatus;
}

const courses: CourseItem[] = [
	{
		id: "course-1",
		title: "Belajar Dasar AI With AWS",
		deadline: "Deadline: 9 November 2025",
		status: "continue",
	},
	{
		id: "course-2",
		title: "Belajar Fundamental React",
		deadline: "Deadline: 8 November 2025",
		status: "continue",
	},
	{
		id: "course-3",
		title: "Belajar Fundamental Back-end",
		deadline: "Deadline: 12 November 2025",
		status: "continue",
	},
	{
		id: "course-4",
		title: "Belajar Fundamental Web",
		deadline: "Deadline: 1 November 2025",
		status: "done",
	},
];

const SettingsPage = () => {
	const user = JSON.parse(localStorage.getItem("user") || "{}");
	const displayName = user.username || "Jane Doe";
	const tabs = ["Profil", "Personal Data", "Account", "Academy"];
	const [activeTab, setActiveTab] = useState<string>("Profil");

	return (
		<div className="h-screen bg-[#F4F2EC] flex items-start justify-between pr-10 pl-[170px] pt-12 overflow-hidden">
			{/* Heading & tab buttons - ini untuk settings */}
			<div className="flex-1 flex flex-col items-center gap-5 transform -translate-x-10">
				<h1 className="text-[26px] font-bold tracking-wide text-[#111827]">SETTINGS</h1>
				<div className="flex items-center gap-10">
					{tabs.map((tab) => {
						const isActive = activeTab === tab;
						return (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className="flex flex-col items-center gap-1 focus:outline-none"
							>
								<div className="flex items-center gap-2 text-[12px] font-semibold text-[#111827]">
									<span className="w-3 h-3 rounded-full bg-[#C34F21] inline-block"></span>
									<span className="text-[13px]">{tab}</span>
								</div>
								{isActive && <span className="w-12 h-[2px] bg-black block rounded-full"></span>}
							</button>
						);
					})}
				</div>
				{activeTab === "Profil" && (
					<div className="relative mt-2">
						<div className="w-[720px] h-[640px] bg-white border border-[#E7E6E0] rounded-[16px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] overflow-y-auto">
						</div>
					</div>
				)}
			</div>

			<div className="w-[340px] bg-white rounded-[24px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] border border-gray-100">
				<div className="flex flex-col items-center gap-6 px-8 py-9">
					<div className="flex flex-col items-center gap-3">
						<p className="text-[12px] font-semibold text-[#1F2937]">Your Profile</p>
						<div className="relative">
							<div className="absolute inset-0 rounded-full border-4 border-[#285F3E] opacity-80"></div>
							<img
								src={ProfileImg}
								alt={displayName}
								className="size-[90px] rounded-full object-cover bg-gray-100 p-1"
							/>
						</div>
						<h2 className="text-lg font-semibold text-[#1F2937]">{displayName}</h2>
					</div>

					<div className="flex items-center justify-center gap-2 text-[10px] font-semibold text-[#1F2937]">
						<span className="px-2 py-1 rounded-md bg-[#F4F2EC]">Si Cepat Paham</span>
						<span className="px-2 py-1 rounded-md bg-[#F4F2EC]">Si Cepat Paham</span>
					</div>

					<div className="flex w-full items-center justify-between gap-3">
						<div className="flex-1 bg-[#F7F6F2] border border-[#e5e4df] rounded-xl px-4 py-3 text-left">
							<p className="text-2xl font-bold text-[#285F3E] leading-none">11</p>
							<p className="text-[11px] font-semibold text-[#4B5563] mt-1">Courses completed</p>
						</div>
						<div className="flex-1 bg-[#F7F6F2] border border-[#e5e4df] rounded-xl px-4 py-3 text-left">
							<p className="text-2xl font-bold text-[#C34F21] leading-none">4</p>
							<p className="text-[11px] font-semibold text-[#4B5563] mt-1">Courses in progress</p>
						</div>
					</div>

					<Button
						className="w-full h-11 rounded-full bg-[#2E6A46] hover:bg-[#25543a] text-white font-semibold text-sm shadow-sm"
					>
						<div className="relative mr-2">
							<i className="ri-notification-3-fill text-lg"></i>
							<span className="size-2.5 rounded-full animate-ping bg-[#F45B5B] absolute right-0 top-0"></span>
							<span className="absolute inline-flex size-2.5 rounded-full bg-[#F45B5B] top-0 right-0 border-2 border-white"></span>
						</div>
						Daily Check-in
					</Button>

					<div className="w-full flex flex-col gap-4">
						<p className="text-[12px] font-semibold text-[#1F2937]">Your Courses</p>
						<div className="flex flex-col gap-3">
							{courses.map((course) => (
								<div
									key={course.id}
									className="flex items-center justify-between rounded-xl border border-[#ECEBE5] bg-[#F7F6F2] px-3 py-3"
								>
									<div className="flex items-center gap-3">
										<div className="size-9 rounded-lg bg-white text-[#285F3E] flex items-center justify-center shadow-sm border border-[#E7E6E0]">
											<i className="ri-book-open-line text-lg"></i>
										</div>
										<div className="flex flex-col">
											<span className="text-[12px] font-semibold text-[#1F2937]">
												{course.title}
											</span>
											<span className="text-[10px] text-[#6B7280]">{course.deadline}</span>
										</div>
									</div>
									<Button
										variant="secondary"
										size="sm"
										className={`px-4 h-7 rounded-full text-[10px] font-semibold border-none ${
											course.status === "done"
												? "bg-[#285F3E] text-white hover:bg-[#1f5134]"
												: "bg-[#C34F21] text-white hover:bg-[#a4421c]"
										}`}
									>
										{course.status === "done" ? "Done" : "Continue"}
									</Button>
								</div>
							))}
						</div>
					</div>

					<Button
						variant="outline"
						className="w-full h-10 rounded-full border-[#285F3E] text-[#285F3E] hover:bg-white font-semibold text-sm"
					>
						See All
					</Button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
