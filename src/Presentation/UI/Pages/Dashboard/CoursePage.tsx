import React from "react";
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

import {
  useJourneyCompletionFactory,
  usePostJourneyCompletionFactory,
} from "@/App/Factories/useJourneyCompletionFactory";
import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";
import { useState } from "react";
import JourneyImage from "../../Components/JourneyImage";
import { JourneyDTO as Journey } from "@/Data/DTOs/JourneyDTO";

const JourneyCard = ({ journey }: { journey: Journey }) => {
  const { data: completion, isLoading } = useJourneyCompletionFactory(
    journey.id.toString(),
  );
  const { mutate: enroll, isPending: isEnrolling } =
    usePostJourneyCompletionFactory();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isReviewer = user.role === "reviewer";

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isReviewer) {
      window.location.href = `/journeys/${journey.id}/submissions`;
      return;
    }

    if (completion) {
      window.location.href = `/course/learning/${journey.id}`;
    } else {
      enroll(
        {
          journeyId: Number(journey.id),
          rating: 0,
          duration: 0,
        },
        {
          onSuccess: () => {
            window.location.href = `/course/learning/${journey.id}`;
          },
        },
      );
    }
  };

  return (
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      onClick={() =>
        (window.location.href = isReviewer
          ? `/journeys/${journey.id}/submissions`
          : `/course/${journey.id}`)
      }
    >
      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
        {journey.image_path ? (
          <JourneyImage
            src={journey.image_path}
            alt={journey.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-300">
            <i className="ri-image-line text-4xl"></i>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#285F3E] uppercase shadow-sm backdrop-blur-md">
            {journey.difficulty}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-lg leading-snug font-bold text-[#202020] transition-colors group-hover:text-[#285F3E]">
            {journey.name}
          </h3>
          <p className="line-clamp-2 text-sm text-gray-500">
            {journey.summary ||
              "Master the fundamentals and advanced concepts in this comprehensive course."}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <i className="ri-book-open-line text-[#285F3E]"></i>
            <span>{journey.teaching_methods?.length || 0} Modules</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleAction}
            className={`h-8 rounded-full px-3 text-xs font-bold ${
              isReviewer
                ? "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                : completion || isEnrolling
                  ? "text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                  : "text-[#285F3E] hover:bg-[#285F3E]/10 hover:text-[#285F3E]"
            }`}
          >
            {isReviewer ? (
              <>
                Review Submissions
                <i className={`ri-file-list-3-line ml-1`}></i>
              </>
            ) : (
              <>
                {isLoading || isEnrolling
                  ? "Loading..."
                  : completion
                    ? "Continue Learning"
                    : "Start Learning"}
                <i className={`ri-arrow-right-line ml-1`}></i>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Custom hook import
import { useEnrolledJourneys } from "@/App/Factories/useEnrolledJourneys";
import {
  useJourneyDetailFactory,
  useJourneyTrackingsFactory,
} from "@/App/Factories/useJourneyFactory";

const EnrolledJourneyCard = ({ journey }: { journey: Journey }) => {
  // Fetch detail to get tutorials for total count
  const { data: detail, isLoading } = useJourneyDetailFactory(
    journey.id.toString(),
  );
  const { data: trackings, isLoading: isTrackingsLoading } =
    useJourneyTrackingsFactory(journey.id.toString());

  const totalTutorials =
    detail?.tutorials?.length || detail?.teaching_methods?.length || 0;
  const completedCount = trackings?.length || 0;
  const rawPercentage =
    totalTutorials > 0 ? (completedCount / totalTutorials) * 100 : 0;
  const percentage = Math.round(Math.min(rawPercentage, 100));

  return (
    <div
      className="group flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-all hover:shadow-md"
      onClick={() => (window.location.href = `/course/${journey.id}`)}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-xl bg-gray-100">
        {journey.image_path ? (
          <JourneyImage
            src={journey.image_path}
            alt={journey.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 text-gray-400">
            <i className="ri-book-open-line text-4xl opacity-50"></i>
          </div>
        )}
        <div className="absolute top-2 right-2 rounded-lg bg-white/90 px-2 py-1 text-[10px] font-bold text-[#285F3E] shadow-sm backdrop-blur-sm">
          {journey.difficulty}
        </div>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-1 font-bold text-[#202020] transition-colors group-hover:text-[#285F3E]">
          {journey.name}
        </h3>
        <p className="text-xs text-gray-500">
          {journey.summary || "Continue your progress"}
        </p>
      </div>
      <div className="mt-auto flex flex-col gap-1.5 px-1">
        <div className="flex justify-between text-[10px] font-medium text-gray-500">
          <span>Progress</span>
          <span>{isLoading || isTrackingsLoading ? "..." : percentage}%</span>
        </div>
        <Progress
          value={percentage}
          className="h-1.5 bg-gray-100"
          indicatorClassName="bg-[#285F3E]"
        />
      </div>
    </div>
  );
};

const CoursePage = () => {
  const { data: journeys, isLoading } = useJourneysFactory();
  const enrolledJourneys = useEnrolledJourneys(journeys);
  const [searchQuery, setSearchQuery] = useState("");

  // Use enrolledJourneys from hook
  const continueLearningJourneys = enrolledJourneys;

  const filteredJourneys = journeys?.filter((journey) =>
    journey.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="mr-0 h-full overflow-y-auto px-4 py-4 pt-20 sm:px-6 sm:py-5 lg:mr-[310px] lg:px-8 lg:py-6 lg:pt-6">
        {/* Heading */}
        <div className="relative flex min-h-[140px] w-full items-center overflow-hidden rounded-xl bg-[#285F3E] p-4 shadow-lg shadow-[#285F3E]/20 sm:min-h-[160px] sm:p-6 lg:min-h-[180px] lg:rounded-2xl lg:p-8">
          <img
            src={StarsImage}
            alt=""
            className="pointer-events-none absolute top-0 right-0 h-full w-auto object-cover opacity-80 mix-blend-overlay select-none"
          />

          <div className="relative z-10 flex w-full flex-col gap-2 sm:gap-3 md:w-3/4">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase backdrop-blur-sm sm:text-[10px]">
                Online Course
              </span>
            </div>
            <h1 className="text-xl leading-tight font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
              Sharpen Your Skills With <br /> Professional Online Courses
            </h1>

            <Button
              variant={"secondary"}
              size="sm"
              className="mt-1 w-fit rounded-full bg-white text-xs font-semibold text-[#285F3E] shadow-md hover:bg-gray-100 sm:mt-2 sm:text-sm"
            >
              <span>Join now</span>
              <i className="ri-play-circle-fill text-xl"></i>
            </Button>
          </div>
        </div>

        {/* Continue Learning Section */}
        {continueLearningJourneys.length > 0 && (
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#202020] sm:text-xl">
                Continue Learning
              </h2>
              <div className="flex items-center gap-2">
                {/* Carousel controls can be custom if needed, or rely on default */}
              </div>
            </div>
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {continueLearningJourneys.map((journey) => (
                  <CarouselItem
                    key={journey.id}
                    className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <EnrolledJourneyCard journey={journey} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-2 flex justify-end gap-2">
                <CarouselPrevious className="static h-8 w-8 translate-y-0 border-gray-200 hover:bg-gray-50" />
                <CarouselNext className="static h-8 w-8 translate-y-0 border-gray-200 hover:bg-gray-50" />
              </div>
            </Carousel>
          </div>
        )}

        {/* All Journeys Section */}
        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-6">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-lg font-bold text-[#202020] sm:text-xl">
              All Journeys
            </h2>
            <div className="relative w-full md:w-72">
              <i className="ri-search-line absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"></i>
              <Input
                placeholder="Search courses..."
                className="rounded-full border-gray-200 bg-white pl-9 focus-visible:ring-[#285F3E]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-[280px] animate-pulse rounded-2xl bg-gray-100"
                ></div>
              ))}
            </div>
          ) : filteredJourneys?.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center text-gray-500">
              <i className="ri-search-2-line mb-2 block text-4xl opacity-30"></i>
              <p>No courses found matching "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {filteredJourneys?.map((journey) => (
                <JourneyCard key={journey.id} journey={journey} />
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
