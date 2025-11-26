import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { useJourneyDetailFactory } from "@/App/Factories/useJourneyFactory";

const CourseLearningPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: journey, isLoading } = useJourneyDetailFactory(id || "");

	// Mock Data for Nested Lessons (Still mock for now as API doesn't seem to provide lessons structure yet)
	const courseContent = [
		{
			id: 1,
			title: "Chapter 1: Introduction",
			subLessons: [
				{ id: 101, title: "Welcome to the Course", duration: "2:30", isCompleted: true, isLocked: false },
				{ id: 102, title: "What is UI/UX?", duration: "5:00", isCompleted: true, isLocked: false },
				{ id: 103, title: "Course Overview", duration: "3:15", isCompleted: false, isLocked: false },
			]
		},
	];

	const [expandedLessons, setExpandedLessons] = React.useState<number[]>([1]);
	const [currentSubLessonId, setCurrentSubLessonId] = React.useState<number>(103);

	const toggleLesson = (id: number) => {
		setExpandedLessons(prev => 
			prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
		);
	};

	if (isLoading) {
		return <div className="flex h-screen items-center justify-center">Loading...</div>;
	}

	if (!journey) {
		return <div className="flex h-screen items-center justify-center">Journey not found</div>;
	}

	return (
		<div className="flex  h-screen overflow-hidden bg-gray-50 relative">
			{/* Main Content (Scrollable) */}
			<div className="flex-1 overflow-y-auto h-full mr-[350px]">
				<div className="px-13 bg-[#F4F2EC] py-6 w-full">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div>
							<h1 className="text-2xl font-bold text-[#1F2937]">{journey.name}</h1>
							<p className="text-gray-500">{journey.summary}</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex flex-col items-end">
								<span className="text-sm font-medium">Progress</span>
								<span className="text-xs text-gray-500">{journey.progress_info?.percentage || 0}% Completed</span>
							</div>
							<Progress value={journey.progress_info?.percentage || 0} className="w-[100px]" />
						</div>
					</div>

					<Separator className="mb-6" />

					{/* Dynamic Content Embed */}
					<Card className="min-h-[500px] bg-white shadow-sm border-none">
						<CardContent className="p-0">
							<div 
								className="prose max-w-none p-6"
								dangerouslySetInnerHTML={{ __html: journey.description }} 
							/>
						</CardContent>
					</Card>

					<div className="flex justify-between pt-8">
						<Button variant="outline"><i className="ri-arrow-left-s-line mr-2"></i> Previous Lesson</Button>
						<Button className="bg-[#285F3E] hover:bg-[#1e462e]">Next Lesson <i className="ri-arrow-right-s-line ml-2"></i></Button>
					</div>
				</div>
			</div>

			{/* Sidebar (Absolute & Fixed) */}
			<div className="w-[350px] absolute right-0 top-0 h-full bg-white border-l shadow-sm flex flex-col z-10">
				<div className="p-6 border-b">
					<h2 className="font-bold text-lg">Course Content</h2>
					<p className="text-sm text-gray-500">{journey.hours_to_study} Hours • {journey.difficulty}</p>
				</div>
				<div className="flex-1 overflow-y-auto">
					<div className="flex flex-col">
						{courseContent.map((lesson) => (
							<div key={lesson.id} className="border-b last:border-b-0">
								{/* Lesson Header (Accordion Trigger) */}
								<div 
									className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center transition-colors"
									onClick={() => toggleLesson(lesson.id)}
								>
									<div className="flex flex-col gap-1">
										<span className="font-bold text-sm text-gray-800">{lesson.title}</span>
										<span className="text-xs text-gray-500">{lesson.subLessons.length} Topics</span>
									</div>
									<i className={`ri-arrow-down-s-line text-xl text-gray-400 transition-transform duration-200 ${expandedLessons.includes(lesson.id) ? 'rotate-180' : ''}`}></i>
								</div>

								{/* Sub-lessons (Accordion Content) */}
								<div className={`bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${expandedLessons.includes(lesson.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
									{lesson.subLessons.map((sub, index) => (
										<div 
											key={sub.id} 
											className={`
												pl-8 pr-4 py-3 flex justify-between items-start cursor-pointer hover:bg-gray-100 border-l-4 transition-all
												${sub.id === currentSubLessonId ? 'border-l-[#285F3E] bg-white' : 'border-l-transparent'}
											`}
										>
											<div className="flex flex-col gap-1">
												<span className={`text-sm font-medium ${sub.id === currentSubLessonId ? 'text-[#285F3E]' : 'text-gray-600'}`}>
													{index + 1}. {sub.title}
												</span>
												<span className="text-xs text-gray-400">{sub.duration}</span>
											</div>
											{sub.isCompleted ? (
												<i className="ri-checkbox-circle-fill text-[#285F3E]"></i>
											) : sub.isLocked ? (
												<i className="ri-lock-line text-gray-400"></i>
											) : (
												<i className="ri-play-circle-line text-gray-400"></i>
											)}
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseLearningPage;
