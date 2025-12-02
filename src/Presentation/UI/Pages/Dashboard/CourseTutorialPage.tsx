import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";
import { useJourneyDetailFactory } from "@/App/Factories/useJourneyFactory";
import { useTutorialFactory } from "@/App/Factories/useTutorialFactory";
import { TutorialModel } from "@/Domain/Tutorial/Models/Tutorial";
import {
	CheckCircle2,
	Lock,
	PlayCircle,
	ChevronLeft,
	ChevronRight,
	BookOpen,
	Clock,
	BarChart,
} from "lucide-react";

const CourseTutorialPage = () => {
	const { id } = useParams<{ id: string }>();
	const { data: journey, isLoading: isJourneyLoading } =
		useJourneyDetailFactory(id || "");
	const { data: tutorials, isLoading: isTutorialsLoading } = useTutorialFactory(
		id || ""
	);

	const [selectedTutorialId, setSelectedTutorialId] = React.useState<
		number | null
	>(null);

	const mainContentRef = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (tutorials && tutorials.length > 0 && !selectedTutorialId) {
			setSelectedTutorialId(tutorials[0].id);
		}
	}, [tutorials, selectedTutorialId]);

	React.useEffect(() => {
		if (mainContentRef.current) {
			mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [selectedTutorialId]);

	const selectedTutorial = tutorials?.find((t) => t.id === selectedTutorialId);
	const selectedIndex =
		tutorials?.findIndex((t) => t.id === selectedTutorialId) ?? 0;

	const handleNext = () => {
		if (tutorials && selectedIndex < tutorials.length - 1) {
			setSelectedTutorialId(tutorials[selectedIndex + 1].id);
		}
	};

	const handlePrevious = () => {
		if (tutorials && selectedIndex > 0) {
			setSelectedTutorialId(tutorials[selectedIndex - 1].id);
		}
	};

	if (isJourneyLoading || isTutorialsLoading) {
		return (
			<div className="flex h-screen items-center justify-center bg-gray-50">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#285F3E]"></div>
					<p className="text-gray-500 font-medium">Loading your course...</p>
				</div>
			</div>
		);
	}

	if (!journey) {
		return (
			<div className="flex h-screen items-center justify-center bg-gray-50">
				<div className="text-center">
					<h2 className="text-xl font-bold text-gray-900">Journey not found</h2>
					<p className="text-gray-500 mt-2">
						The course you are looking for does not exist.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
			{/* Main Content Area */}
			<div className="flex-1 flex flex-col h-full overflow-hidden mr-0 lg:mr-[350px] xl:mr-[400px] pt-14 lg:pt-0">
				{/* Top Navigation Bar */}
				<header className="bg-white border-b px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shrink-0 z-10">
					<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-6">
						<div className="min-w-0 flex-1">
							<h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 line-clamp-2 lg:line-clamp-1">
								{journey.name}
							</h1>
							<p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2 lg:line-clamp-1">
								{journey.summary}
							</p>
						</div>
						<div className="flex items-center gap-4 lg:gap-6 shrink-0">
							<div className="flex flex-col items-start lg:items-end w-full lg:min-w-[140px]">
								<div className="flex justify-between w-full mb-1.5">
									<span className="text-xs font-semibold text-gray-700">
										Course Progress
									</span>
									<span className="text-xs font-bold text-[#285F3E] ml-2">
										{journey.progress_info?.percentage || 0}%
									</span>
								</div>
								<Progress
									value={journey.progress_info?.percentage || 0}
									className="h-2 w-full bg-gray-100 [&>div]:bg-[#285F3E]"
								/>
							</div>
						</div>
					</div>
				</header>

				{/* Scrollable Content */}
				<main
					ref={mainContentRef}
					className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#F9FAFB]">
					<div className="max-w-4xl mx-auto">
						<Card className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
							<CardContent className="p-0">
								{selectedTutorial ? (
									<div className="p-8 md:p-10">
										<div className="mb-8 pb-6 border-b border-gray-100">
											<div className="flex items-center gap-2 text-sm text-[#285F3E] font-medium mb-3">
												<span className="bg-[#EDFCF2] px-2.5 py-0.5 rounded-full">
													Lesson {selectedIndex + 1}
												</span>
												<span className="text-gray-400">•</span>
												<span className="text-gray-500 uppercase tracking-wide text-xs">
													{selectedTutorial.type}
												</span>
											</div>
											<h2 className="text-3xl font-bold text-gray-900 leading-tight">
												{selectedTutorial.title}
											</h2>
										</div>

										<div
											className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-h3:mt-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-0 prose-a:text-[#285F3E] prose-img:rounded-xl prose-strong:text-gray-900"
											dangerouslySetInnerHTML={{
												__html: selectedTutorial.content,
											}}
										/>
									</div>
								) : (
									<div className="p-20 text-center">
										<div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
											<BookOpen className="w-8 h-8 text-gray-400" />
										</div>
										<h3 className="text-lg font-semibold text-gray-900">
											Select a lesson
										</h3>
										<p className="text-gray-500 mt-2">
											Choose a tutorial from the sidebar to start learning.
										</p>
									</div>
								)}
							</CardContent>
						</Card>

						{/* Navigation Buttons */}
						<div className="flex justify-between items-center mt-8 ">
							<Button
								variant="outline"
								onClick={handlePrevious}
								disabled={selectedIndex === 0}
								className="border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-6 h-12 text-base font-medium transition-all disabled:opacity-50">
								<ChevronLeft className="w-5 h-5 mr-2" /> Previous Lesson
							</Button>

							<Button
								onClick={handleNext}
								disabled={!tutorials || selectedIndex === tutorials.length - 1}
								className="bg-[#285F3E] hover:bg-[#1e462e] text-white px-6 h-12 text-base font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:shadow-none">
								Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
							</Button>
						</div>
					</div>
				</main>
			</div>

			{/* Sidebar (Fixed Right) */}
			<aside className="w-full lg:w-[350px] xl:w-[400px] absolute right-0 top-0 h-full bg-white border-l border-gray-200 hidden lg:flex flex-col z-20 shadow-xl shadow-gray-200/50">
				<div className="p-6 border-b border-gray-100 bg-gray-50/50">
					<h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
						<BookOpen className="w-5 h-5 text-[#285F3E]" />
						Course Content
					</h2>
					<div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
						<div className="flex items-center gap-1.5">
							<Clock className="w-4 h-4" />
							<span>{journey.hours_to_study} Hours</span>
						</div>
						<div className="flex items-center gap-1.5">
							<BarChart className="w-4 h-4" />
							<span>{journey.difficulty}</span>
						</div>
					</div>
				</div>

				<div className="flex-1 overflow-y-auto custom-scrollbar">
					<div className="py-2">
						{tutorials?.map((tutorial, index) => {
							const isActive = tutorial.id === selectedTutorialId;
							const isCompleted = tutorial.status === "1";

							return (
								<div
									key={tutorial.id}
									onClick={() => setSelectedTutorialId(tutorial.id)}
									className={`
                                        group relative px-6 py-4 cursor-pointer transition-all duration-200 border-l-[3px]
                                        ${
																					isActive
																						? "bg-[#F0FDF4] border-[#285F3E]"
																						: "bg-white border-transparent hover:bg-gray-50"
																				}
                                    `}>
									<div className="flex items-start gap-4">
										<div className="mt-0.5 shrink-0">
											{isCompleted ? (
												<CheckCircle2 className="w-5 h-5 text-[#285F3E]" />
											) : isActive ? (
												<PlayCircle className="w-5 h-5 text-[#285F3E] fill-[#EDFCF2]" />
											) : (
												<div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-400 transition-colors" />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p
												className={`text-sm font-semibold leading-snug mb-1 transition-colors ${
													isActive
														? "text-[#1F2937]"
														: "text-gray-600 group-hover:text-gray-900"
												}`}>
												{index + 1}. {tutorial.title}
											</p>
											<div className="flex items-center gap-2">
												<span className="text-[10px] uppercase tracking-wider font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
													{tutorial.type}
												</span>
												{/* Add duration if available in future */}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Optional: Sidebar Footer */}
				<div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
					<p className="text-xs text-gray-400">© 2025 Asah Platform</p>
				</div>
			</aside>
		</div>
	);
};

export default CourseTutorialPage;
