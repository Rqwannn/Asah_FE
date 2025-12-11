import React from "react";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useJourneyDetailFactory } from "@/App/Factories/useJourneyFactory";
import {
  useJourneyCompletionFactory,
  usePostJourneyCompletionFactory,
} from "@/App/Factories/useJourneyCompletionFactory";
import { useJourneyTrackingsFactory } from "@/App/Factories/useJourneyFactory";
import { Separator } from "@/components/ui/separator";
import JourneyImage from "../../Components/JourneyImage";

const JourneyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: journey, isLoading } = useJourneyDetailFactory(id || "");
  const { data: completion, isLoading: isCompletionLoading } =
    useJourneyCompletionFactory(id || "");
  const { mutate: enroll, isPending: isEnrolling } =
    usePostJourneyCompletionFactory();
  const { data: trackings, isLoading: isTrackingsLoading } =
    useJourneyTrackingsFactory(id || "");

  const totalTutorials =
    journey?.tutorials?.length || journey?.teaching_methods?.length || 0; // Fallback to teaching_methods if tutorials missing
  const completedCount = trackings?.length || 0;
  // Calculate percentage. Cap at 100.
  const rawPercentage =
    totalTutorials > 0 ? (completedCount / totalTutorials) * 100 : 0;
  const percentage = Math.round(Math.min(rawPercentage, 100));

  const showProgress = completion || percentage > 0;

  const handleAction = () => {
    if (completion) {
      navigate(`/course/learning/${journey?.id}`);
    } else {
      if (journey) {
        enroll(
          {
            journeyId: Number(journey.id),
            rating: 0,
            duration: 0,
          },
          {
            onSuccess: () => {
              navigate(`/course/learning/${journey.id}`);
            },
          },
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="flex h-screen items-center justify-center">
        Journey not found
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full overflow-y-auto bg-[#F4F2EC] px-4 py-4 pt-16 sm:px-8 sm:py-5 lg:px-8 lg:py-6 lg:pt-6">
        {/* Back Button */}
        <div className="my-4 sm:my-5 lg:my-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/course")}
            className="pl-0 transition-colors hover:bg-transparent hover:text-[#285F3E]"
          >
            <i className="ri-arrow-left-line mr-2"></i> Back to Courses
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:mb-8 sm:p-6 lg:rounded-3xl lg:p-8">
          {/* Background Decoration */}
          <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-[#285F3E]/5 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-6 sm:gap-8 md:flex-row lg:gap-10">
            {/* Image */}
            <div className="h-[220px] w-full shrink-0 overflow-hidden rounded-2xl bg-gray-100 shadow-md md:w-[320px]">
              {journey.image_path ? (
                <JourneyImage
                  src={journey.image_path}
                  alt={journey.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-50 text-gray-400">
                  <i className="ri-image-line text-5xl"></i>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-between py-1">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-[#285F3E] px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase">
                    {journey.difficulty}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <i className="ri-time-line"></i>
                    <span>{journey.hours_to_study} Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500">
                    <i className="ri-medal-line"></i>
                    <span>{journey.xp} XP</span>
                  </div>
                </div>

                <h1 className="mb-4 text-3xl leading-tight font-bold text-[#202020] md:text-4xl">
                  {journey.name}
                </h1>
                <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                  {journey.summary}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button
                  className="transform rounded-full bg-[#285F3E] px-8 py-6 text-base font-semibold shadow-lg shadow-[#285F3E]/20 transition-all hover:-translate-y-0.5 hover:bg-[#1e462e] hover:shadow-xl hover:shadow-[#285F3E]/30"
                  onClick={handleAction}
                  disabled={isCompletionLoading || isEnrolling}
                >
                  {isCompletionLoading || isEnrolling
                    ? "Loading..."
                    : completion || percentage > 0
                      ? "Continue Learning"
                      : "Enroll Now"}
                  <i className="ri-arrow-right-line ml-2 text-lg"></i>
                </Button>
                {showProgress && (
                  <div className="ml-4 flex flex-col">
                    <span className="mb-1 text-xs font-medium text-gray-500">
                      Your Progress
                    </span>
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#285F3E] transition-all duration-1000"
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Description */}
          <div className="col-span-12 lg:col-span-8">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:rounded-3xl lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#285F3E]/10 p-2 text-[#285F3E]">
                  <i className="ri-book-open-line text-xl"></i>
                </div>
                <h2 className="text-xl font-bold text-[#202020]">
                  About this Course
                </h2>
              </div>

              <div
                className="prose prose-lg prose-headings:text-[#202020] prose-headings:font-bold prose-a:text-[#285F3E] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#202020] prose-strong:font-semibold prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-[#285F3E] prose-img:rounded-xl prose-img:shadow-sm max-w-none text-gray-600"
                dangerouslySetInnerHTML={{ __html: journey.description }}
              />
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="col-span-12 flex flex-col gap-4 sm:gap-5 lg:col-span-4 lg:gap-6">
            {/* What you'll learn */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:rounded-3xl lg:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-lg bg-[#285F3E]/10 p-2 text-[#285F3E]">
                  <i className="ri-lightbulb-line text-xl"></i>
                </div>
                <h3 className="text-xl font-bold text-[#202020]">
                  What you'll learn
                </h3>
              </div>

              <div
                className="prose prose-sm prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-[#285F3E] prose-li:mb-1 prose-p:m-0 max-w-none text-gray-600 [&_li]:pl-1 [&_ul]:my-2 [&_ul_ul]:mt-1 [&_ul_ul]:mb-2 [&_ul_ul]:list-[circle]"
                dangerouslySetInnerHTML={{
                  __html: Array.isArray(journey.teaching_methods)
                    ? journey.teaching_methods.join("")
                    : journey.teaching_methods,
                }}
              />
            </div>

            {/* Course Details Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:rounded-3xl lg:p-8">
              <h3 className="mb-6 text-xl font-bold text-[#202020]">
                Course Details
              </h3>
              <div className="space-y-5">
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-500">
                    <i className="ri-bar-chart-line text-lg transition-colors group-hover:text-[#285F3E]"></i>
                    <span className="text-sm">Level</span>
                  </div>
                  <span className="font-semibold text-[#202020]">
                    {journey.difficulty}
                  </span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-500">
                    <i className="ri-time-line text-lg transition-colors group-hover:text-[#285F3E]"></i>
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-semibold text-[#202020]">
                    {journey.hours_to_study} Hours
                  </span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-500">
                    <i className="ri-medal-line text-lg transition-colors group-hover:text-[#285F3E]"></i>
                    <span className="text-sm">XP Points</span>
                  </div>
                  <span className="font-semibold text-[#202020]">
                    {journey.xp} XP
                  </span>
                </div>
                <Separator className="bg-gray-100" />
                <div className="group flex items-center justify-between">
                  <div className="flex items-center gap-3 text-gray-500">
                    <i className="ri-calendar-line text-lg transition-colors group-hover:text-[#285F3E]"></i>
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
