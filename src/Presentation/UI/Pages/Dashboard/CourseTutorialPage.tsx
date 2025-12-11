import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";
import { useJourneyDetailFactory } from "@/App/Factories/useJourneyFactory";
import { useTutorialFactory } from "@/App/Factories/useTutorialFactory";
import {
  useJourneyTrackingsFactory,
  usePostJourneyTrackingFactory,
} from "@/App/Factories/useJourneyTrackingFactory";
import { usePostLearningAnalysisFactory } from "@/App/Factories/useLearningAnalysisFactory";
import { useJourneyCompletionFactory } from "@/App/Factories/useJourneyCompletionFactory";
import {
  CheckCircle2,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Clock,
  BarChart,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CourseTutorialPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: journey, isLoading: isJourneyLoading } =
    useJourneyDetailFactory(id || "");
  const { data: tutorials, isLoading: isTutorialsLoading } = useTutorialFactory(
    id || "",
  );
  const { data: trackings } = useJourneyTrackingsFactory(id || "");
  const { mutate: markComplete, isPending: isMarkingComplete } =
    usePostJourneyTrackingFactory();
  const { mutate: postLearningAnalysis } = usePostLearningAnalysisFactory();
  const { data: completion } = useJourneyCompletionFactory(id || "");
  const { toast } = useToast();

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

  // Calculate Progress
  const completedTutorialIds = React.useMemo(() => {
    return new Set(
      trackings
        ?.filter((t) => {
          const s = t.status;
          return s === true || s === "true" || s === 1 || s === "1";
        })
        .map((t) => t.tutorialId),
    );
  }, [trackings]);

  const progressPercentage = React.useMemo(() => {
    if (!tutorials || tutorials.length === 0) return 0;
    return Math.round((completedTutorialIds.size / tutorials.length) * 100);
  }, [tutorials, completedTutorialIds]);

  const handleNext = () => {
    if (selectedTutorial) {
      const isCompleted = completedTutorialIds.has(selectedTutorial.id);
      const isLastTutorial =
        tutorials && selectedIndex === tutorials.length - 1;

      if (isCompleted) {
        // If already completed, just check if we need to trigger AI analysis (if last tutorial and maybe not triggered before?
        // For now user just said "don't fetch api" for tracking.
        // But if it's the last tutorial, we might want to ensure completion logic runs if it hasn't?
        // User said "if tracked done, but wants to learn again & next lesson, don't fetch api".
        // This implies just navigation.

        // However, we should probably still check if it's the last tutorial to allow "Complete Course" behavior if needed,
        // effectively just navigating or showing completion state.
        // But strictly following "don't fetch api":
        proceedToNext();
      } else {
        // Not completed, mark as complete
        if (journey) {
          markComplete(
            {
              journeyId: Number(journey.id),
              tutorialId: selectedTutorial.id,
              status: 1,
            },
            {
              onSuccess: () => {
                toast("Progress saved!", "success");

                if (isLastTutorial) {
                  const now = new Date();
                  const formatDate = (date: Date) => {
                    const mm = String(date.getMonth() + 1).padStart(2, "0");
                    const dd = String(date.getDate()).padStart(2, "0");
                    const yyyy = date.getFullYear();
                    const HH = String(date.getHours()).padStart(2, "0");
                    const MM = String(date.getMinutes()).padStart(2, "0");
                    const SS = String(date.getSeconds()).padStart(2, "0");
                    return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
                  };

                  const enrollmentTime = completion?.createdAt
                    ? new Date(completion.createdAt)
                    : now;

                  const studyDuration = Math.max(
                    0,
                    (now.getTime() - enrollmentTime.getTime()) / 1000 / 60,
                  );

                  postLearningAnalysis({
                    tracking_status: 1,
                    tracking_first_opened_at: formatDate(enrollmentTime),
                    tracking_completed_at: formatDate(now),
                    completion_created_at: formatDate(enrollmentTime),
                    completion_enrolling_times: 1.0,
                    completion_study_duration: studyDuration,
                    completion_avg_submission_rating: 5.0,
                    submission_status: 1.0,
                    submission_created_at: formatDate(now),
                    submission_duration: 300.0,
                    submission_ended_review_at: formatDate(now),
                    submission_rating: 5.0,
                  });
                }

                proceedToNext();
              },
              onError: () => {
                toast("Failed to save progress", "error");
                proceedToNext();
              },
            },
          );
        }
      }
    } else {
      proceedToNext();
    }
  };

  const proceedToNext = () => {
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
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#285F3E]"></div>
          <p className="font-medium text-gray-500">Loading your course...</p>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900">Journey not found</h2>
          <p className="mt-2 text-gray-500">
            The course you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Main Content Area */}
      <div className="relative mr-0 flex h-full flex-1 flex-col overflow-hidden pt-14 md:pt-0 lg:mr-[350px] xl:mr-[400px]">
        {/* Top Navigation Bar */}
        <header className="z-10 shrink-0 border-b bg-[#F4F2EC] px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="line-clamp-2 text-base font-bold text-gray-900 sm:text-lg lg:line-clamp-1 lg:text-xl">
                {journey.name}
              </h1>
              <p className="mt-1 line-clamp-2 text-xs text-gray-500 sm:text-sm lg:line-clamp-1">
                {journey.summary}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4 lg:gap-6">
              <div className="flex w-full flex-col items-start lg:min-w-[140px] lg:items-end">
                <div className="mb-1.5 flex w-full justify-between">
                  <span className="text-xs font-semibold text-gray-700">
                    Course Progress
                  </span>
                  <span className="ml-2 text-xs font-bold text-[#285F3E]">
                    {progressPercentage}%
                  </span>
                </div>
                <Progress
                  value={progressPercentage}
                  className="h-2 w-full bg-gray-100 [&>div]:bg-[#285F3E]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main
          ref={mainContentRef}
          className="flex-1 overflow-y-auto bg-[#F4F2EC] px-4 pb-[111px]! lg:px-8"
        >
          <Card className="w-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <CardContent className="p-0">
              {selectedTutorial ? (
                <div className="p-8 md:p-10">
                  <div className="mb-6 border-b border-gray-100 pb-6">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[#285F3E]">
                      <span className="rounded-full bg-[#EDFCF2] px-2.5 py-0.5">
                        Lesson {selectedIndex + 1}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs tracking-wide text-gray-500 uppercase">
                        {selectedTutorial.type}
                      </span>
                    </div>
                  </div>

                  <div
                    className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mb-4 prose-h3:mt-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-0 prose-a:text-[#285F3E] prose-img:rounded-xl prose-strong:text-gray-900 max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedTutorial.content,
                    }}
                  />
                </div>
              ) : (
                <div className="p-20 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select a lesson
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Choose a tutorial from the sidebar to start learning.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Navigation Buttons (Absolute Bottom) */}
        <div className="absolute right-0 bottom-0 left-0 z-30 border-t border-gray-200 bg-[#F4F2EC] p-4">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={selectedIndex === 0}
              className="h-12 border-gray-200 px-6 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 hover:text-gray-900"
            >
              <ChevronLeft className="mr-2 h-5 w-5" /> Previous Lesson
            </Button>

            <Button
              onClick={handleNext}
              disabled={
                !tutorials ||
                (selectedIndex === tutorials.length - 1 &&
                  completedTutorialIds.has(selectedTutorial?.id || 0)) ||
                isMarkingComplete
              }
              className="h-12 bg-[#285F3E] px-6 text-base font-medium text-white shadow-md transition-all hover:bg-[#1e462e] hover:shadow-lg disabled:opacity-50 disabled:shadow-none"
            >
              {isMarkingComplete ? (
                "Saving..."
              ) : (
                <>
                  {tutorials && selectedIndex === tutorials.length - 1
                    ? "Complete Course"
                    : "Next Lesson"}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Sidebar (Fixed Right) */}
      <aside className="absolute top-0 right-0 z-20 hidden h-full w-full flex-col border-l border-gray-200 bg-white shadow-xl shadow-gray-200/50 lg:flex lg:w-[350px] xl:w-[400px]">
        <div className="border-b border-gray-100 bg-gray-50/50 p-6">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <BookOpen className="h-5 w-5 text-[#285F3E]" />
            Course Content
          </h2>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{journey.hours_to_study} Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart className="h-4 w-4" />
              <span>{journey.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <div className="py-2">
            {tutorials?.map((tutorial, index) => {
              const isActive = tutorial.id === selectedTutorialId;
              const isCompleted = completedTutorialIds.has(tutorial.id);

              return (
                <div
                  key={tutorial.id}
                  onClick={() => setSelectedTutorialId(tutorial.id)}
                  className={`group relative cursor-pointer border-l-[3px] px-6 py-4 transition-all duration-200 ${
                    isActive
                      ? "border-[#285F3E] bg-[#F0FDF4]"
                      : "border-transparent bg-white hover:bg-gray-50"
                  } `}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-[#285F3E]" />
                      ) : isActive ? (
                        <PlayCircle className="h-5 w-5 fill-[#EDFCF2] text-[#285F3E]" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300 transition-colors group-hover:border-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`mb-1 text-sm leading-snug font-semibold transition-colors ${
                          isActive
                            ? "text-[#1F2937]"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {index + 1}. {tutorial.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium tracking-wider text-gray-400 uppercase">
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
        <div className="border-t border-gray-100 bg-gray-50 p-4 text-center">
          <p className="text-xs text-gray-400">© 2025 Asah Platform</p>
        </div>
      </aside>
    </div>
  );
};

export default CourseTutorialPage;
