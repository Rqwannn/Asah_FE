import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarsImage from "@/assets/stars.svg";
import ProfileSidebar from "../../Components/ProfileSidebar";
import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";

const DashboardPage = () => {
	const { data: journeys, isLoading } = useJourneysFactory();
	const user = JSON.parse(localStorage.getItem("user") || "{}");

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Main Content */}
			<div className="flex-1 px-8 py-6 overflow-y-auto mr-[310px]">
				{/* Compact Welcome Banner */}
				<div className="relative w-full bg-[#285F3E] rounded-xl overflow-hidden px-6 py-4 mb-5 flex items-center justify-between shadow-sm">
					<img
						src={StarsImage}
						alt=""
						className="absolute right-0 top-0 h-full opacity-20 pointer-events-none select-none"
					/>
					<div className="relative z-10 text-white flex items-center gap-4">
						<div className="size-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
							👋
						</div>
						<div>
							<h1 className="text-[32px] leading-8 font-bold">
								Welcome back, {user.username || "Learner"}!
							</h1>
							<p className="text-white/80">
								Your AI learning insights are ready.
							</p>
						</div>
					</div>
					<Button
						size="sm"
						variant="secondary"
						className="bg-white/10 text-white hover:bg-white/20 border-none h-8 text-xs">
						View Report
					</Button>
				</div>

				{/* 3-Column Grid for Stats */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
					{/* Weekly Focus */}
					<Card className="border-none shadow-sm bg-white">
						<CardHeader className="pb-2 pt-4 px-4">
							<CardTitle className="flex items-center gap-2 text-[16px] font-semibold text-[#285F3E]">
								<i className="ri-focus-3-line"></i> Weekly Focus
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 pb-4">
							<div className="flex flex-col gap-2">
								<div className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg border border-orange-100">
									<div className="p-1.5 bg-white rounded-md text-orange-500 shadow-sm shrink-0">
										<i className="ri-reactjs-line text-lg"></i>
									</div>
									<div className="min-w-0">
										<h4 className="font-medium text-[#202020] text-[12px] truncate">
											React Hooks
										</h4>
										<p className="text-[10px] text-gray-500 truncate">
											Review `useMemo`
										</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg border border-blue-100">
									<div className="p-1.5 bg-white rounded-md text-blue-500 shadow-sm shrink-0">
										<i className="ri-layout-grid-line text-lg"></i>
									</div>
									<div className="min-w-0">
										<h4 className="font-medium text-[#202020] text-[12px] truncate">
											CSS Grid
										</h4>
										<p className="text-[10px] text-gray-500 truncate">
											Complex layouts
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Learning Pattern */}
					<Card className="border-none shadow-sm bg-white">
						<CardHeader className="pb-2 pt-4 px-4">
							<CardTitle className="flex items-center gap-2 text-[16px] font-semibold text-[#285F3E]">
								<i className="ri-bar-chart-grouped-line"></i> Activity
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 pb-4">
							<p className="text-gray-500 text-[10px] mb-2">
								Most active:{" "}
								<span className="font-bold text-[#285F3E]">08:00 - 11:00</span>
							</p>
							<div className="h-20 flex items-end justify-between gap-1.5">
								{[40, 70, 30, 85, 50, 20, 60].map((h, i) => (
									<div
										key={i}
										className="w-full bg-green-50 rounded-t-sm relative group">
										<div
											className="absolute bottom-0 w-full bg-[#285F3E] rounded-t-sm transition-all duration-500 group-hover:bg-[#1e462e]"
											style={{ height: `${h}%` }}></div>
									</div>
								))}
							</div>
							<div className="flex justify-between mt-1 px-1">
								{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
									<span key={i} className="text-[8px] text-gray-400">
										{d}
									</span>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Skill Growth */}
					<Card className="border-none shadow-sm bg-white">
						<CardHeader className="pb-2 pt-4 px-4">
							<CardTitle className="flex items-center gap-2 text-[16px] font-semibold text-[#285F3E]">
								<i className="ri-line-chart-line"></i> Growth
							</CardTitle>
						</CardHeader>
						<CardContent className="px-4 pb-4 flex items-center gap-4">
							<div className="relative size-20 shrink-0 flex items-center justify-center">
								<div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
								<div className="absolute inset-0 border-4 border-[#285F3E] rounded-full border-l-transparent border-b-transparent rotate-45"></div>
								<span className="font-bold text-[#285F3E] text-sm">+12%</span>
							</div>
							<div>
								<p className="text-[12px] font-medium text-[#202020]">
									Frontend Master
								</p>
								<p className="text-[10px] text-gray-500 leading-tight mt-1">
									Your frontend skills are growing faster than backend.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* AI Recommendations - Horizontal */}
				<Card className="border-none shadow-sm bg-white mb-5">
					<CardHeader className="pb-2 pt-4 px-4">
						<CardTitle className="flex items-center gap-2 text-[16px] font-semibold text-[#285F3E]">
							<i className="ri-sparkling-fill"></i> Recommended for You
						</CardTitle>
					</CardHeader>
					<CardContent className="px-4 pb-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-3 rounded-lg bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 flex gap-3 items-center">
								<div className="p-2 bg-white rounded-md shadow-sm text-[#285F3E] shrink-0">
									<i className="ri-lightbulb-flash-line text-lg"></i>
								</div>
								<div className="flex-1 min-w-0">
									<h4 className="font-medium text-[#202020] text-[12px]">
										Quiz: React Performance
									</h4>
									<p className="text-[10px] text-gray-600 truncate">
										Test your knowledge of re-renders.
									</p>
								</div>
								<Button
									size="sm"
									className="h-7 text-xs bg-[#285F3E] hover:bg-[#1e462e] px-3">
									Start
								</Button>
							</div>

							<div className="p-3 rounded-lg bg-white border border-gray-100 flex gap-3 items-center hover:shadow-md transition-shadow cursor-pointer">
								<div className="p-2 bg-gray-50 rounded-md text-gray-600 shrink-0">
									<i className="ri-article-line text-lg"></i>
								</div>
								<div className="flex-1 min-w-0">
									<h4 className="font-medium text-[#202020] text-[12px]">
										Read: "Future of UI"
									</h4>
									<p className="text-[10px] text-gray-600 truncate">
										Curated for your Design Systems interest.
									</p>
								</div>
								<i className="ri-arrow-right-s-line text-gray-400"></i>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Right Sidebar (Fixed) */}
			<ProfileSidebar />
		</div>
	);
};

export default DashboardPage;
