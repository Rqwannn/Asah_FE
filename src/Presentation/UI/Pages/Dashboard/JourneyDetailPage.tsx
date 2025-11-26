import React from "react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useJourneyDetailFactory } from "@/App/Factories/useJourneyFactory";
import { Separator } from "@/components/ui/separator";
import JourneyImage from "../../Components/JourneyImage";


const JourneyDetailPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { data: journey, isLoading } = useJourneyDetailFactory(id || "");

	if (isLoading) {
		return <div className="flex h-screen items-center justify-center">Loading...</div>;
	}

	if (!journey) {
		return <div className="flex h-screen items-center justify-center">Journey not found</div>;
	}

	return (
		<>
			<div className="px-13 py-6 w-full overflow-y-auto h-screen bg-[#F4F2EC]">
				{/* Back Button */}
				<div className="mb-6">
					<Button 
						variant="ghost" 
						onClick={() => navigate("/course")}
						className="pl-0 hover:bg-transparent hover:text-[#285F3E] transition-colors"
					>
						<i className="ri-arrow-left-line mr-2"></i> Back to Courses
					</Button>
				</div>

				{/* Hero Section */}
				<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
					{/* Background Decoration */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-[#285F3E]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

					<div className="flex flex-col md:flex-row gap-10 relative z-10">
						{/* Image */}
						<div className="w-full md:w-[320px] h-[220px] rounded-2xl overflow-hidden bg-gray-100 shadow-md shrink-0">
							{journey.image_path ? (
								<JourneyImage
									src={journey.image_path}
									alt={journey.name}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
									<i className="ri-image-line text-5xl"></i>
								</div>
							)}
						</div>

						{/* Info */}
						<div className="flex-1 flex flex-col justify-between py-1">
							<div>
								<div className="flex items-center gap-3 mb-4">
									<span className="px-3 py-1 bg-[#285F3E] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
										{journey.difficulty}
									</span>
									<div className="flex items-center gap-1.5 text-gray-500 text-sm">
										<i className="ri-time-line"></i>
										<span>{journey.hours_to_study} Hours</span>
									</div>
									<div className="flex items-center gap-1.5 text-gray-500 text-sm">
										<i className="ri-medal-line"></i>
										<span>{journey.xp} XP</span>
									</div>
								</div>
								
								<h1 className="text-3xl md:text-4xl font-bold text-[#202020] mb-4 leading-tight">
									{journey.name}
								</h1>
								<p className="text-gray-600 leading-relaxed text-lg max-w-2xl">
									{journey.summary}
								</p>
							</div>

							<div className="flex items-center gap-4 mt-8">
								<Button 
									className="bg-[#285F3E] hover:bg-[#1e462e] px-8 py-6 text-base font-semibold rounded-full shadow-lg shadow-[#285F3E]/20 hover:shadow-xl hover:shadow-[#285F3E]/30 transition-all transform hover:-translate-y-0.5"
									onClick={() => navigate(`/course/learning/${journey.id}`)}
								>
									{journey.progress_info?.percentage > 0 ? "Continue Learning" : "Enroll Now"}
									<i className="ri-arrow-right-line ml-2 text-lg"></i>
								</Button>
								{journey.progress_info?.percentage > 0 && (
									<div className="flex flex-col ml-4">
										<span className="text-xs text-gray-500 font-medium mb-1">Your Progress</span>
										<div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
											<div 
												className="h-full bg-[#285F3E] rounded-full transition-all duration-1000"
												style={{ width: `${journey.progress_info.percentage}%` }}
											></div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-12 gap-8">
					{/* Main Description */}
					<div className="col-span-12 lg:col-span-8">
						<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-[#285F3E]/10 rounded-lg text-[#285F3E]">
									<i className="ri-book-open-line text-xl"></i>
								</div>
								<h2 className="text-xl font-bold text-[#202020]">About this Course</h2>
							</div>
							
							<div 
								className="prose prose-lg max-w-none text-gray-600 
									prose-headings:text-[#202020] prose-headings:font-bold 
									prose-a:text-[#285F3E] prose-a:no-underline hover:prose-a:underline
									prose-strong:text-[#202020] prose-strong:font-semibold
									prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-[#285F3E]
									prose-img:rounded-xl prose-img:shadow-sm"
								dangerouslySetInnerHTML={{ __html: journey.description }} 
							/>
						</div>
					</div>

					{/* Sidebar Info */}
					<div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
						{/* What you'll learn */}
						<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
							<div className="flex items-center gap-3 mb-6">
								<div className="p-2 bg-[#285F3E]/10 rounded-lg text-[#285F3E]">
									<i className="ri-lightbulb-line text-xl"></i>
								</div>
								<h3 className="text-xl font-bold text-[#202020]">What you'll learn</h3>
							</div>
							
							<div 
								className="prose prose-sm max-w-none text-gray-600 
									prose-ul:list-disc prose-ul:pl-5 
									prose-li:marker:text-[#285F3E] prose-li:mb-1
									prose-p:m-0
									[&_ul]:my-2 [&_li]:pl-1
									[&_ul_ul]:mt-1 [&_ul_ul]:mb-2 [&_ul_ul]:list-[circle]"
								dangerouslySetInnerHTML={{ 
									__html: Array.isArray(journey.teaching_methods) 
										? journey.teaching_methods.join('') 
										: journey.teaching_methods 
								}} 
							/>
						</div>

						{/* Course Details Card */}
						<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
							<h3 className="text-xl font-bold text-[#202020] mb-6">Course Details</h3>
							<div className="space-y-5">
								<div className="flex justify-between items-center group">
									<div className="flex items-center gap-3 text-gray-500">
										<i className="ri-bar-chart-line text-lg group-hover:text-[#285F3E] transition-colors"></i>
										<span className="text-sm">Level</span>
									</div>
									<span className="font-semibold text-[#202020]">{journey.difficulty}</span>
								</div>
								<Separator className="bg-gray-100" />
								<div className="flex justify-between items-center group">
									<div className="flex items-center gap-3 text-gray-500">
										<i className="ri-time-line text-lg group-hover:text-[#285F3E] transition-colors"></i>
										<span className="text-sm">Duration</span>
									</div>
									<span className="font-semibold text-[#202020]">{journey.hours_to_study} Hours</span>
								</div>
								<Separator className="bg-gray-100" />
								<div className="flex justify-between items-center group">
									<div className="flex items-center gap-3 text-gray-500">
										<i className="ri-medal-line text-lg group-hover:text-[#285F3E] transition-colors"></i>
										<span className="text-sm">XP Points</span>
									</div>
									<span className="font-semibold text-[#202020]">{journey.xp} XP</span>
								</div>
								<Separator className="bg-gray-100" />
								<div className="flex justify-between items-center group">
									<div className="flex items-center gap-3 text-gray-500">
										<i className="ri-calendar-line text-lg group-hover:text-[#285F3E] transition-colors"></i>
										<span className="text-sm">Updated</span>
									</div>
									<span className="font-semibold text-[#202020]">
										{new Date(journey.updatedAt).toLocaleDateString()}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default JourneyDetailPage;
