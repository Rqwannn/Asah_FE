import StarsImage from "@/assets/stars.svg";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileSidebar from "../../Components/ProfileSidebar";

import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";
import { useState } from "react";
import JourneyImage from "../../Components/JourneyImage";

const CoursePage = () => {
	const { data: journeys, isLoading } = useJourneysFactory();
	const [searchQuery, setSearchQuery] = useState("");

	// Dummy data for Continue Learning
	const continueLearningData = [
		{
			id: "dummy-1",
			name: "Advanced React Patterns",
			image_path: "/images/react-patterns.jpg", // Placeholder, will fallback
			difficulty: "Advanced",
			progress: 65,
			last_accessed: "2 hours ago",
		},
		{
			id: "dummy-2",
			name: "Node.js Microservices",
			image_path: "/images/node-micro.jpg",
			difficulty: "Intermediate",
			progress: 32,
			last_accessed: "1 day ago",
		},
		{
			id: "dummy-3",
			name: "UI/UX Design Fundamentals",
			image_path: "/images/ui-ux.jpg",
			difficulty: "Beginner",
			progress: 88,
			last_accessed: "3 days ago",
		},
	];

	const filteredJourneys = journeys?.filter((journey) =>
		journey.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<>
			<div className="h-full px-8 py-6 mr-[310px] overflow-y-auto">
				{/* Heading */}
				<div className="p-8 relative w-full bg-[#285F3E] rounded-2xl overflow-hidden min-h-[180px] flex items-center shadow-lg shadow-[#285F3E]/20">
					<img
						src={StarsImage}
						alt=""
						className="absolute right-0 top-0 h-full w-auto object-cover opacity-80 pointer-events-none select-none mix-blend-overlay"
					/>

					<div className="w-full md:w-3/4 gap-3 flex flex-col relative z-10">
						<div className="flex items-center gap-2">
							<span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm">
								Online Course
							</span>
						</div>
						<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
							Sharpen Your Skills With <br /> Professional Online Courses
						</h1>

						<Button
							variant={"secondary"}
							className="w-fit rounded-full mt-2 bg-white text-[#285F3E] hover:bg-gray-100 font-semibold shadow-md">
							<span>Join now</span>
							<i className="ri-play-circle-fill text-xl"></i>
						</Button>
					</div>
				</div>

				{/* Continue Learning Section (Dummy Data) */}
				<div className="mt-8 flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<h2 className="text-xl font-bold text-[#202020]">
							Continue Learning
						</h2>
						<div className="flex items-center gap-2">
							{/* Carousel controls can be custom if needed, or rely on default */}
						</div>
					</div>
					<Carousel className="w-full">
						<CarouselContent className="-ml-4">
							{continueLearningData.map((item) => (
								<CarouselItem
									key={item.id}
									className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
									<div className="group bg-white rounded-2xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer h-full flex flex-col gap-3">
										<div className="w-full h-32 rounded-xl bg-gray-100 relative overflow-hidden">
											{/* Placeholder for dummy images */}
											<div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
												<i className="ri-book-open-line text-4xl opacity-50"></i>
											</div>
											<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-[#285F3E] shadow-sm">
												{item.difficulty}
											</div>
										</div>
										<div className="flex flex-col gap-1 px-1">
											<h3 className="font-bold text-[#202020] line-clamp-1 group-hover:text-[#285F3E] transition-colors">
												{item.name}
											</h3>
											<p className="text-xs text-gray-500">
												Last accessed {item.last_accessed}
											</p>
										</div>
										<div className="mt-auto px-1 flex flex-col gap-1.5">
											<div className="flex justify-between text-[10px] font-medium text-gray-500">
												<span>Progress</span>
												<span>{item.progress}%</span>
											</div>
											<Progress
												value={item.progress}
												className="h-1.5 bg-gray-100"
												indicatorClassName="bg-[#285F3E]"
											/>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="flex justify-end gap-2 mt-2">
							<CarouselPrevious className="static translate-y-0 h-8 w-8 border-gray-200 hover:bg-gray-50" />
							<CarouselNext className="static translate-y-0 h-8 w-8 border-gray-200 hover:bg-gray-50" />
						</div>
					</Carousel>
				</div>

				{/* All Journeys Section */}
				<div className="mt-8 flex flex-col gap-6">
					<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
						<h2 className="text-xl font-bold text-[#202020]">All Journeys</h2>
						<div className="relative w-full md:w-72">
							<i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
							<Input
								placeholder="Search courses..."
								className="pl-9 bg-white border-gray-200 rounded-full focus-visible:ring-[#285F3E]"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>

					{isLoading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="h-[280px] bg-gray-100 rounded-2xl animate-pulse"></div>
							))}
						</div>
					) : filteredJourneys?.length === 0 ? (
						<div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
							<i className="ri-search-2-line text-4xl mb-2 block opacity-30"></i>
							<p>No courses found matching "{searchQuery}"</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
							{filteredJourneys?.map((journey) => (
								<div
									key={journey.id}
									className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
									onClick={() =>
										(window.location.href = `/course/${journey.id}`)
									}>
									<div className="w-full h-40 bg-gray-100 relative overflow-hidden">
										{journey.image_path ? (
											<JourneyImage
												src={journey.image_path}
												alt={journey.name}
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
												<i className="ri-image-line text-4xl"></i>
											</div>
										)}
										<div className="absolute top-3 right-3">
											<span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-[#285F3E] shadow-sm uppercase tracking-wide">
												{journey.difficulty}
											</span>
										</div>
									</div>

									<div className="p-5 flex flex-col gap-3 flex-1">
										<div className="flex flex-col gap-1">
											<h3 className="text-lg font-bold text-[#202020] leading-snug line-clamp-2 group-hover:text-[#285F3E] transition-colors">
												{journey.name}
											</h3>
											<p className="text-sm text-gray-500 line-clamp-2">
												{journey.summary ||
													"Master the fundamentals and advanced concepts in this comprehensive course."}
											</p>
										</div>

										<div className="mt-auto pt-2 flex items-center justify-between">
											<div className="flex items-center gap-2 text-xs font-medium text-gray-500">
												<i className="ri-book-open-line text-[#285F3E]"></i>
												<span>
													{journey.teaching_methods?.length || 0} Modules
												</span>
											</div>
											<Button
												size="sm"
												variant="ghost"
												className="h-8 rounded-full text-[#285F3E] hover:text-[#285F3E] hover:bg-[#285F3E]/10 px-3 text-xs font-bold">
												Start Learning{" "}
												<i className="ri-arrow-right-line ml-1"></i>
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<ProfileSidebar />
		</>
	);
};

export default CoursePage;
