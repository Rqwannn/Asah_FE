import React from "react";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";
import { Link } from "react-router-dom";
import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";
import { useEnrolledJourneys } from "@/App/Factories/useEnrolledJourneys";
import { useDailyCheckinFactory } from "@/App/Factories/useDailyCheckinFactory";
import { useUserCompletionsFactory } from "@/App/Factories/useJourneyCompletionFactory";
import JourneyImage from "./JourneyImage";

const ProfileSidebar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { data: journeys } = useJourneysFactory();
  const enrolledJourneys = useEnrolledJourneys(journeys);
  const { checkins } = useDailyCheckinFactory();
  const { data: userCompletions } = useUserCompletionsFactory();
  const learningAnalysisLabel = localStorage
    .getItem("learning_analysis_label")
    ?.toUpperCase();

  const displayedJourneys = enrolledJourneys.slice(0, 3);
  const completedCount = userCompletions?.length || 0;

  const hasCheckedInToday = React.useMemo(() => {
    if (!checkins) return false;
    const today = new Date();
    return checkins.some((c) => {
      const d = new Date(c.date);
      return (
        d.getDate() === today.getDate() &&
        d.getMonth() === today.getMonth() &&
        d.getFullYear() === today.getFullYear()
      );
    });
  }, [checkins]);

  return (
    <div className="scrollbar-hide fixed top-0 right-0 z-50 hidden h-full w-full flex-col gap-4 overflow-y-auto border-l border-gray-100 bg-[#FFFFFF] px-4 py-6 md:w-[280px] md:gap-5 md:px-5 md:py-6 lg:flex lg:w-[310px] lg:gap-6 lg:px-6 lg:py-8">
      <div className="flex flex-col items-center gap-4">
        <div>
          <img
            src={ProfileImg}
            alt="Profile"
            className="size-[72px] shrink-0 rounded-full border-4 border-white object-cover shadow-sm"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-1">
          <h1 className="text-[16px] leading-8 font-bold text-gray-900">
            {user.username || "Guest User"}
          </h1>

          {learningAnalysisLabel && (
            <div className="w-full overflow-hidden rounded-lg bg-[#F4F2EC] py-1">
              <span className="animate-marquee inline-block w-full text-center text-[12px] font-medium whitespace-nowrap text-[#000000]">
                {learningAnalysisLabel}
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-[#F4F2EC] p-3">
            <span className="text-[24px] leading-none font-bold text-[#285F3E]">
              {completedCount}
            </span>
            <span className="text-center text-[10px] leading-tight font-medium text-gray-600">
              Courses Completed
            </span>
          </div>
          {/* <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg bg-[#F4F2EC] p-3">
            <span className="text-[24px] leading-none font-bold text-[#C34F21]">
              4
            </span>
            <span className="text-center text-[10px] leading-tight font-medium text-gray-600">
              Certificates Earned
            </span>
          </div> */}
        </div>

        <Link to="/daily-checkin" className="w-full">
          <Button
            variant={null}
            className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white py-6 shadow-sm transition-all hover:bg-gray-50"
          >
            <div className="relative">
              <i className="ri-notification-3-fill text-[24px] text-[#285F3E]"></i>
              {!hasCheckedInToday && (
                <>
                  <span className="absolute top-0 right-0 size-2.5 animate-ping rounded-full bg-[#F45B5B]"></span>
                  <span className="absolute top-0 right-0 inline-flex size-2.5 rounded-full border-2 border-white bg-[#F45B5B]"></span>
                </>
              )}
            </div>
            <span className="text-[14px] font-semibold text-gray-700">
              Daily Check-in
            </span>
          </Button>
        </Link>

        <div className="mt-2 flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[14px] font-bold text-gray-900">
              Your Courses
            </span>
            <Link
              to="/course"
              className="cursor-pointer text-[12px] font-medium text-[#285F3E] hover:underline"
            >
              See all
            </Link>
          </div>

          {/* Course List */}
          <div className="flex flex-col gap-4">
            {displayedJourneys.length === 0 ? (
              <div className="py-4 text-center text-xs text-gray-500">
                No courses enrolled yet.
              </div>
            ) : (
              displayedJourneys.map((journey, i) => (
                <div key={journey.id} className="flex flex-col gap-3">
                  <div className="flex w-full items-center gap-3">
                    <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-[#F4F2EC]">
                      {journey.image_path ? (
                        <JourneyImage
                          src={journey.image_path}
                          alt={journey.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#285F3E]">
                          <i className="ri-book-open-line text-xl"></i>
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-[12px] font-bold text-gray-900">
                        {journey.name}
                      </span>
                      <span className="truncate text-[10px] text-gray-500">
                        Start learning
                      </span>
                    </div>
                    <Link
                      to={`/course/${journey.id}`}
                      className="flex h-7 shrink-0 items-center justify-center rounded-full bg-[#285F3E] px-4 py-1 text-white transition-colors hover:bg-[#1e462e]"
                    >
                      <span className="text-[10px] font-medium">Continue</span>
                    </Link>
                  </div>
                  {i < displayedJourneys.length - 1 && (
                    <div className="h-px w-full bg-gray-100"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
