import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";
import ProfileTab from "./Settings/ProfileTab";
import PersonalDataTab from "./Settings/PersonalDataTab";
import AcademyTab from "./Settings/AcademyTab";
import AccountTab from "./Settings/AccountTab";
import ProfileSidebar from "../../Components/ProfileSidebar";

type CourseStatus = "continue" | "done";

interface CourseItem {
  id: string;
  title: string;
  deadline: string;
  status: CourseStatus;
}

const courses: CourseItem[] = [
  {
    id: "course-1",
    title: "Belajar Dasar AI With AWS",
    deadline: "Deadline: 9 November 2025",
    status: "continue",
  },
  {
    id: "course-2",
    title: "Belajar Fundamental React",
    deadline: "Deadline: 8 November 2025",
    status: "continue",
  },
  {
    id: "course-3",
    title: "Belajar Fundamental Back-end",
    deadline: "Deadline: 12 November 2025",
    status: "continue",
  },
  {
    id: "course-4",
    title: "Belajar Fundamental Web",
    deadline: "Deadline: 1 November 2025",
    status: "done",
  },
];

const SettingsPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const displayName = user.username || "Jane Doe";
  const tabs = ["Profile", "Personal Data", "Account", "Academy"];
  const [activeTab, setActiveTab] = useState<string>("Profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab />;
      case "Personal Data":
        return <PersonalDataTab />;
      case "Academy":
        return <AcademyTab />;
      case "Account":
        return <AccountTab />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mr-0 h-full overflow-y-auto px-4 py-4 pt-20 sm:px-6 sm:py-5 lg:mr-[280px] lg:px-8 lg:py-6 lg:pt-6 xl:mr-[310px]">
        <h1 className="mb-5 text-center text-[26px] font-bold tracking-wide text-[#111827]">
          SETTINGS
        </h1>
        <div className="mb-2 flex w-full items-center justify-center gap-10">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex flex-col items-center gap-1 focus:outline-none"
              >
                <div className="flex items-center gap-2 text-[12px] font-semibold text-[#111827]">
                  <span className="inline-block h-3 w-3 rounded-full bg-[#C34F21]"></span>
                  <span className="text-[13px]">{tab}</span>
                </div>
                {isActive && (
                  <span className="block h-[2px] w-12 rounded-full bg-black"></span>
                )}
              </button>
            );
          })}
        </div>
        {renderTabContent()}
      </div>

      <ProfileSidebar />
    </div>
  );
};

export default SettingsPage;
