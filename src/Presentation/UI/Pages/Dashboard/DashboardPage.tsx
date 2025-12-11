import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarsImage from "@/assets/stars.svg";
import ProfileSidebar from "../../Components/ProfileSidebar";
import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";
import { useAgenticAI } from "@/Presentation/Hooks/useAgenticAI";
import ReactMarkdown from "react-markdown";

const DashboardPage = () => {
  const { data: journeys, isLoading } = useJourneysFactory();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const {
    response: aiInsight,
    limeVisualization,
    confidenceVisualization,
    isLoading: isAiLoading,
    error: aiError,
  } = useAgenticAI();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="mr-0 flex-1 overflow-y-auto px-4 py-4 pt-20 sm:px-6 sm:py-5 lg:mr-[310px] lg:px-8 lg:py-6 lg:pt-6">
        {/* Compact Welcome Banner */}
        <div className="relative mb-4 flex w-full flex-col items-start justify-between gap-3 overflow-hidden rounded-lg bg-[#285F3E] p-4 shadow-sm sm:mb-5 sm:flex-row sm:items-center sm:gap-0 sm:rounded-xl sm:p-6 lg:p-8">
          <img
            src={StarsImage}
            alt=""
            className="pointer-events-none absolute top-0 right-0 h-full opacity-20 select-none"
          />
          <div className="relative z-10 flex items-center gap-3 text-white sm:gap-4">
            <div className="flex size-8 items-center justify-center rounded-full bg-white/20 text-lg sm:size-10 sm:text-xl">
              👋
            </div>
            <div>
              <h1 className="text-xl leading-tight font-bold sm:text-2xl lg:text-[32px]">
                Welcome back, {user.username || "Learner"}!
              </h1>
              <p className="text-white/80">
                Your AI learning insights are ready.
              </p>
            </div>
          </div>
          {/* <Button
            size="sm"
            variant="secondary"
            className="h-8 border-none bg-white/10 text-xs text-white hover:bg-white/20"
          >
            View Report
          </Button> */}
        </div>

        {/* AI Learning Mentor Insight */}
        <Card className="mb-4 border-none bg-linear-to-r from-[#285F3E]/5 to-[#285F3E]/10 shadow-sm sm:mb-5">
          <CardHeader className="px-3 pt-3 pb-2 sm:px-4 sm:pt-4">
            <CardTitle className="flex items-center gap-2 text-[16px] font-semibold text-[#285F3E]">
              <i className="ri-robot-2-line"></i> AI Learning Mentor
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            {aiInsight ? (
              <div className="prose prose-sm prose-p:text-gray-700 prose-headings:text-[#285F3E] prose-strong:text-[#285F3E] max-w-none">
                <ReactMarkdown>{aiInsight}</ReactMarkdown>
                {limeVisualization && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-[#285F3E]">
                      Explanation Visualization
                    </h4>
                    <img
                      src={`data:image/png;base64,${limeVisualization}`}
                      alt="LIME Visualization"
                      className="w-full rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                {confidenceVisualization && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-[#285F3E]">
                      Confidence Visualization
                    </h4>
                    <img
                      src={`data:image/png;base64,${confidenceVisualization}`}
                      alt="Confidence Visualization"
                      className="w-full rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                {aiError && (
                  <p className="mt-2 text-xs text-red-400">
                    Connection interrupted.
                  </p>
                )}
              </div>
            ) : isAiLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <i className="ri-loader-4-line animate-spin"></i> Analyzing your
                learning patterns...
              </div>
            ) : aiError ? (
              <div className="text-sm text-red-500">
                Unable to connect to AI Mentor.
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                No insights available yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar (Fixed) */}
      <ProfileSidebar />
    </div>
  );
};

export default DashboardPage;
