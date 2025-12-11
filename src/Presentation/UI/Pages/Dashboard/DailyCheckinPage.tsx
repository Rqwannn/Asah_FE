import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDailyCheckinFactory } from "@/App/Factories/useDailyCheckinFactory";
import { useToast } from "@/components/ui/use-toast";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isAfter,
  startOfDay,
  parseISO,
  isBefore,
} from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileSidebar from "../../Components/ProfileSidebar";

const DailyCheckinPage = () => {
  const { checkins, createCheckin, isCreating } = useDailyCheckinFactory();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [viewMode, setViewMode] = useState<"form" | "details">("form");
  const [selectedCheckin, setSelectedCheckin] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const moods = [
    {
      value: "terrible",
      icon: "ri-emotion-unhappy-line",
      label: "Terrible",
      color: "text-red-500",
      bg: "bg-red-50",
      ring: "ring-red-200",
    },
    {
      value: "bad",
      icon: "ri-emotion-sad-line",
      label: "Bad",
      color: "text-orange-500",
      bg: "bg-orange-50",
      ring: "ring-orange-200",
    },
    {
      value: "neutral",
      icon: "ri-emotion-normal-line",
      label: "Neutral",
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      ring: "ring-yellow-200",
    },
    {
      value: "good",
      icon: "ri-emotion-happy-line",
      label: "Good",
      color: "text-blue-500",
      bg: "bg-blue-50",
      ring: "ring-blue-200",
    },
    {
      value: "excellent",
      icon: "ri-emotion-laugh-line",
      label: "Excellent",
      color: "text-green-500",
      bg: "bg-green-50",
      ring: "ring-green-200",
    },
  ];

  // Calendar Data
  const today = new Date();
  const currentMonthStart = startOfMonth(today);
  const currentMonthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({
    start: currentMonthStart,
    end: currentMonthEnd,
  });

  // Check if checked in today on load
  useEffect(() => {
    if (checkins) {
      const todayCheckin = checkins.find((c) =>
        isSameDay(parseISO(c.date), today),
      );
      if (todayCheckin && isSameDay(selectedDate, today)) {
        // We don't auto-open the modal on load, just set state
        setViewMode("details");
        setSelectedCheckin(todayCheckin);
      }
    }
  }, [checkins]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);

    // Find checkin for this date
    const checkin = checkins?.find((c) => isSameDay(parseISO(c.date), date));

    if (checkin) {
      setViewMode("details");
      setSelectedCheckin(checkin);
      setIsDialogOpen(true);
    } else {
      if (isSameDay(date, today)) {
        // If today and NO checkin, show form
        setViewMode("form");
        setSelectedCheckin(null);
        setSelectedMood(null);
        setNote("");
        setIsDialogOpen(true);
      } else {
        // Future or past without checkin - do nothing (button disabled)
      }
    }
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    try {
      await createCheckin({
        mood: selectedMood,
        description: note,
      });
      toast("Check-in submitted successfully!", "success");
      setIsDialogOpen(false);
    } catch (error: any) {
      if (error.response?.data?.message?.includes("sudah melakukan check-in")) {
        toast("You have already checked in today.", "info");
        setIsDialogOpen(false);
      } else {
        toast("Failed to submit check-in.", "error");
      }
    }
  };

  const isDateDisabled = (date: Date) => {
    const isFuture = isAfter(startOfDay(date), startOfDay(today));
    const isPast = isBefore(startOfDay(date), startOfDay(today));
    const hasCheckin = checkins?.some((c) => isSameDay(parseISO(c.date), date));

    // Disable if future OR (past AND no checkin)
    return isFuture || (isPast && !hasCheckin);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1">
        <div className="mr-0 h-full overflow-y-auto px-4 py-4 pt-20 sm:px-6 sm:py-5 lg:mr-[310px] lg:px-8 lg:py-6 lg:pt-6">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl leading-tight font-bold text-[#202020] sm:text-3xl lg:text-[32px]">
                Daily Check-in
              </h1>
              <p className="text-sm text-gray-500">
                Track your mood and thoughts to maintain a healthy learning
                balance.
              </p>
            </div>

            {/* Full Calendar */}
            <Card className="flex flex-col rounded-xl border-none bg-white shadow-sm lg:rounded-2xl">
              <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
                <CardTitle className="flex items-center justify-between text-[24px] font-semibold text-[#202020]">
                  <span>{format(today, "MMMM yyyy")}</span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:bg-gray-50"
                      disabled
                    >
                      <i className="ri-arrow-left-s-line text-xl"></i>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:bg-gray-50"
                      disabled
                    >
                      <i className="ri-arrow-right-s-line text-xl"></i>
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
                <div className="mb-3 grid grid-cols-7 gap-2 text-center sm:mb-4 sm:gap-3 lg:gap-4 xl:gap-6">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-[11px] font-bold tracking-wider text-gray-400 uppercase"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
                  {/* Empty slots for start of month */}
                  {Array.from({ length: currentMonthStart.getDay() }).map(
                    (_, i) => (
                      <div key={`empty-${i}`} className="aspect-square"></div>
                    ),
                  )}

                  {daysInMonth.map((date: Date, i: number) => {
                    const checkin = checkins?.find((c) =>
                      isSameDay(parseISO(c.date), date),
                    );
                    const isToday = isSameDay(date, today);
                    const disabled = isDateDisabled(date);

                    return (
                      <div key={i} className="group relative aspect-square">
                        <button
                          onClick={() => !disabled && handleDateClick(date)}
                          disabled={disabled}
                          className={`flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-300 ${
                            isToday && !checkin
                              ? "border-2 border-[#285F3E] font-bold text-[#285F3E]"
                              : ""
                          } ${
                            checkin
                              ? "bg-[#285F3E] text-white shadow-md shadow-[#285F3E]/25 hover:scale-[1.05] hover:shadow-lg"
                              : disabled
                                ? "cursor-not-allowed bg-gray-50 text-gray-300"
                                : "border border-gray-100 bg-white text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm"
                          } `}
                        >
                          <span className="text-base font-semibold">
                            {format(date, "d")}
                          </span>
                          {checkin && (
                            <div className="mt-0.5 flex items-center justify-center">
                              <i
                                className={`${
                                  moods.find((m) => m.value === checkin.mood)
                                    ?.icon
                                } text-lg`}
                              ></i>
                            </div>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Interaction Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="overflow-hidden rounded-2xl p-0 sm:max-w-[500px]">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle className="text-2xl font-bold text-[#202020]">
                    {viewMode === "details"
                      ? `Entry for ${format(selectedDate, "MMM do")}`
                      : "How are you feeling?"}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-6 p-6 pt-2">
                  {viewMode === "details" && selectedCheckin ? (
                    <div className="flex flex-col gap-5">
                      {/* Mood Display - Centered */}
                      <div className="flex flex-col items-center gap-3 py-2">
                        <div
                          className={`rounded-full p-5 ${
                            moods.find((m) => m.value === selectedCheckin.mood)
                              ?.bg || "bg-gray-100"
                          } flex aspect-square items-center justify-center`}
                        >
                          <i
                            className={`${
                              moods.find(
                                (m) => m.value === selectedCheckin.mood,
                              )?.icon || "ri-emotion-normal-line"
                            } text-[40px] ${
                              moods.find(
                                (m) => m.value === selectedCheckin.mood,
                              )?.color || "text-gray-500"
                            }`}
                          ></i>
                        </div>
                        <span
                          className={`text-xl font-bold capitalize ${
                            moods.find((m) => m.value === selectedCheckin.mood)
                              ?.color
                          }`}
                        >
                          {
                            moods.find((m) => m.value === selectedCheckin.mood)
                              ?.label
                          }
                        </span>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Your Thoughts
                        </span>
                        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                            {selectedCheckin.description ||
                              "No thoughts recorded."}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-5 gap-3">
                        {moods.map((m) => (
                          <button
                            key={m.value}
                            onClick={() => setSelectedMood(m.value)}
                            className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl transition-all duration-300 ${
                              selectedMood === m.value
                                ? `${m.bg} ${m.ring} scale-105 shadow-sm ring-2 ring-offset-2`
                                : "opacity-70 grayscale hover:bg-gray-50 hover:opacity-100 hover:grayscale-0"
                            } `}
                            title={m.label}
                          >
                            <i
                              className={`${m.icon} text-[32px] ${m.color}`}
                            ></i>
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Label className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                          Thoughts (Optional)
                        </Label>
                        <Textarea
                          placeholder="What made you feel this way?"
                          className="min-h-[120px] resize-none rounded-xl border-gray-100 bg-gray-50 p-4 text-sm transition-all focus:border-[#285F3E] focus:bg-white"
                          value={note}
                          onChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>,
                          ) => setNote(e.target.value)}
                        />
                      </div>

                      <Button
                        className="h-14 w-full rounded-xl bg-[#285F3E] text-[18px] font-semibold text-white shadow-lg shadow-[#285F3E]/20 transition-all hover:bg-[#1e462e] active:scale-[0.98]"
                        disabled={!selectedMood || isCreating}
                        onClick={handleSubmit}
                      >
                        {isCreating ? "Saving..." : "Save Check-in"}
                      </Button>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Right Sidebar (Fixed) */}
      <ProfileSidebar />
    </div>
  );
};

export default DailyCheckinPage;
