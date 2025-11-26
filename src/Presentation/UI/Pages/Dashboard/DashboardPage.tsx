import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ProfileImg from "@/assets/profile.svg";
import StarsImage from "@/assets/stars.svg";
import ProfileSidebar from "../../Components/ProfileSidebar";

const DashboardPage = () => {
	// Dummy data
	const stats = [
		{ label: "Courses in Progress", value: "3", icon: "ri-book-open-line", color: "text-blue-600", bg: "bg-blue-100" },
		{ label: "Completed Courses", value: "11", icon: "ri-checkbox-circle-line", color: "text-green-600", bg: "bg-green-100" },
		{ label: "Certificates Earned", value: "8", icon: "ri-award-line", color: "text-yellow-600", bg: "bg-yellow-100" },
	];

	const currentCourses = [
		{ title: "Advanced React Patterns", instructor: "Sarah Drasner", progress: 75, image: "bg-blue-200" },
		{ title: "Figma to Code Workflow", instructor: "Gary Simon", progress: 45, image: "bg-purple-200" },
		{ title: "Node.js Microservices", instructor: "Fernando Doglio", progress: 10, image: "bg-green-200" },
	];

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Main Content */}
			<div className="flex-1 px-13 py-8 overflow-y-auto mr-[310px]">
				{/* Welcome Banner */}
				<div className="relative w-full bg-[#285F3E] rounded-xl overflow-hidden p-8 mb-8 flex items-center justify-between">
					<img
						src={StarsImage}
						alt=""
						className="absolute right-0 top-0 h-full opacity-20 pointer-events-none select-none"
					/>
					<div className="relative z-10 text-white">
						<h1 className="text-3xl font-bold mb-2">Welcome back, Jane! 👋</h1>
						<p className="text-white/80">You've learned 80% more this week. Keep it up!</p>
					</div>
                    <Button className="relative z-10 bg-white text-[#285F3E] hover:bg-gray-100">
                        View Report
                    </Button>
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-3 gap-6 mb-8">
					{stats.map((stat, index) => (
						<Card key={index} className="border-none shadow-sm">
							<CardContent className="p-6 flex items-center gap-4">
								<div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
									<i className={`${stat.icon} text-2xl`}></i>
								</div>
								<div>
									<p className="text-sm text-gray-500 font-medium">{stat.label}</p>
									<h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* My Learning Section */}
				<div className="mb-8">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-bold text-gray-900">My Learning</h2>
						<Button variant="link" className="text-[#285F3E]">See all</Button>
					</div>
					<div className="grid grid-cols-1 gap-4">
						{currentCourses.map((course, index) => (
							<Card key={index} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
								<CardContent className="p-4 flex items-center gap-4">
									<div className={`w-16 h-16 rounded-lg ${course.image} flex-shrink-0`}></div>
									<div className="flex-1">
										<h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
										<p className="text-xs text-gray-500 mb-2">by {course.instructor}</p>
										<div className="flex items-center gap-3">
											<Progress value={course.progress} className="h-2" />
											<span className="text-xs font-medium text-gray-600">{course.progress}%</span>
										</div>
									</div>
									<Button size="icon" variant="ghost">
										<i className="ri-arrow-right-s-line text-xl"></i>
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>

			{/* Right Sidebar (Fixed) */}
			<ProfileSidebar />
		</div>
	);
};

export default DashboardPage;
