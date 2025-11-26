import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const CourseLearningPage = () => {
	// Mock dynamic HTML content from backend
	const contentHtml = `
		<div style="padding: 20px; font-family: sans-serif;">
			<h2>Introduction to UI/UX Design</h2>
			<p>Welcome to the first lesson of the UI/UX Design course. In this video, we will cover the basics.</p>
			<div style="margin-top: 20px; aspect-ratio: 16/9; background-color: #000; display: flex; align-items: center; justify-content: center; color: white;">
				[Video Player Placeholder]
			</div>
			<h3 style="margin-top: 20px;">Key Concepts</h3>
			<ul>
				<li>User Interface (UI)</li>
				<li>User Experience (UX)</li>
				<li>Design Thinking</li>
			</ul>
			<p style="margin-top: 20px;">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<p>
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<p>
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
				eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
			</p>
		</div>
	`;

	// Mock Data for Nested Lessons
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
		{
			id: 2,
			title: "Chapter 2: Design Fundamentals",
			subLessons: [
				{ id: 201, title: "Color Theory", duration: "10:00", isCompleted: false, isLocked: true },
				{ id: 202, title: "Typography Basics", duration: "8:45", isCompleted: false, isLocked: true },
				{ id: 203, title: "Layout & Spacing", duration: "12:20", isCompleted: false, isLocked: true },
			]
		},
		{
			id: 3,
			title: "Chapter 3: Wireframing",
			subLessons: [
				{ id: 301, title: "Low-Fidelity Wireframes", duration: "15:00", isCompleted: false, isLocked: true },
				{ id: 302, title: "High-Fidelity Prototypes", duration: "20:00", isCompleted: false, isLocked: true },
			]
		}
	];

	const [expandedLessons, setExpandedLessons] = React.useState<number[]>([1]);
	const [currentSubLessonId, setCurrentSubLessonId] = React.useState<number>(103);

	const toggleLesson = (id: number) => {
		setExpandedLessons(prev => 
			prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
		);
	};

	return (
		<div className="flex  h-screen overflow-hidden bg-gray-50 relative">
			{/* Main Content (Scrollable) */}
			<div className="flex-1 overflow-y-auto h-full mr-[350px]">
				<div className="px-13 bg-[#F4F2EC] py-8 w-full">
					{/* Header */}
					<div className="flex justify-between items-center mb-6">
						<div>
							<h1 className="text-2xl font-bold text-[#1F2937]">Introduction to UI/UX Design</h1>
							<p className="text-gray-500">Chapter 1: Understanding the Basics</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex flex-col items-end">
								<span className="text-sm font-medium">Progress</span>
								<span className="text-xs text-gray-500">20% Completed</span>
							</div>
							<Progress value={20} className="w-[100px]" />
						</div>
					</div>

					<Separator className="mb-6" />

					{/* Dynamic Content Embed */}
					<Card className="min-h-[500px] bg-white shadow-sm border-none">
						<CardContent className="p-0">
							<div 
								className="prose max-w-none"
								dangerouslySetInnerHTML={{ __html: contentHtml }} 
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
					<p className="text-sm text-gray-500">5 Lessons • 1h 30m</p>
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
