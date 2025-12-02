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
				isSameDay(parseISO(c.date), today)
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
				<div className="h-full px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 pt-20 lg:pt-6 mr-0 lg:mr-[280px] xl:mr-[310px] overflow-y-auto">
					<div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
						{/* Header */}
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl sm:text-3xl lg:text-[32px] leading-tight font-bold text-[#202020]">
								Daily Check-in
							</h1>
							<p className="text-sm text-gray-500">
								Track your mood and thoughts to maintain a healthy learning
								balance.
							</p>
						</div>

						{/* Full Calendar */}
						<Card className="border-none shadow-sm bg-white flex flex-col rounded-xl lg:rounded-2xl">
							<CardHeader className="pb-2 pt-4 sm:pt-5 lg:pt-6 px-4 sm:px-6 lg:px-8">
								<CardTitle className="flex justify-between items-center text-[24px] font-semibold text-[#202020]">
									<span>{format(today, "MMMM yyyy")}</span>
									<div className="flex gap-1">
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 hover:bg-gray-50 text-gray-400"
											disabled>
											<i className="ri-arrow-left-s-line text-xl"></i>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 hover:bg-gray-50 text-gray-400"
											disabled>
											<i className="ri-arrow-right-s-line text-xl"></i>
										</Button>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
								<div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 text-center mb-3 sm:mb-4">
									{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
										(day) => (
											<div
												key={day}
												className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
												{day}
											</div>
										)
									)}
								</div>
								<div className="grid grid-cols-7 gap-2 sm:gap-3 lg:gap-4 xl:gap-6">
									{/* Empty slots for start of month */}
									{Array.from({ length: currentMonthStart.getDay() }).map(
										(_, i) => (
											<div key={`empty-${i}`} className="aspect-square"></div>
										)
									)}

									{daysInMonth.map((date: Date, i: number) => {
										const checkin = checkins?.find((c) =>
											isSameDay(parseISO(c.date), date)
										);
										const isToday = isSameDay(date, today);
										const disabled = isDateDisabled(date);

										return (
											<div key={i} className="aspect-square relative group">
												<button
													onClick={() => !disabled && handleDateClick(date)}
													disabled={disabled}
													className={`
                                                    w-full h-full rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300
                                                    ${
																											isToday && !checkin
																												? "border-2 border-[#285F3E] text-[#285F3E] font-bold"
																												: ""
																										}
                                                    ${
																											checkin
																												? "bg-[#285F3E] text-white shadow-md shadow-[#285F3E]/25 hover:scale-[1.05] hover:shadow-lg"
																												: disabled
																												? "bg-gray-50 text-gray-300 cursor-not-allowed"
																												: "bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200 hover:shadow-sm"
																										}
                                                `}>
													<span className="text-base font-semibold">
														{format(date, "d")}
													</span>
													{checkin && (
														<div className="flex items-center justify-center mt-0.5">
															<i
																className={`${
																	moods.find((m) => m.value === checkin.mood)
																		?.icon
																} text-lg`}></i>
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
							<DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl">
								<DialogHeader className="p-6 pb-2">
									<DialogTitle className="text-2xl font-bold text-[#202020]">
										{viewMode === "details"
											? `Entry for ${format(selectedDate, "MMM do")}`
											: "How are you feeling?"}
									</DialogTitle>
								</DialogHeader>

								<div className="p-6 pt-2 flex flex-col gap-6">
									{viewMode === "details" && selectedCheckin ? (
										<div className="flex flex-col gap-5">
											{/* Mood Display - Centered */}
											<div className="flex flex-col items-center gap-3 py-2">
												<div
													className={`p-5 rounded-full ${
														moods.find((m) => m.value === selectedCheckin.mood)
															?.bg || "bg-gray-100"
													} flex items-center justify-center aspect-square`}>
													<i
														className={`${
															moods.find(
																(m) => m.value === selectedCheckin.mood
															)?.icon || "ri-emotion-normal-line"
														} text-[40px] ${
															moods.find(
																(m) => m.value === selectedCheckin.mood
															)?.color || "text-gray-500"
														}`}></i>
												</div>
												<span
													className={`text-xl font-bold capitalize ${
														moods.find((m) => m.value === selectedCheckin.mood)
															?.color
													}`}>
													{
														moods.find((m) => m.value === selectedCheckin.mood)
															?.label
													}
												</span>
											</div>

											{/* Description */}
											<div className="flex flex-col gap-2">
												<span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
													Your Thoughts
												</span>
												<div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
													<p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
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
														className={`
                                                        aspect-square rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1
                                                        ${
																													selectedMood ===
																													m.value
																														? `${m.bg} ${m.ring} ring-2 ring-offset-2 scale-105 shadow-sm`
																														: "hover:bg-gray-50 grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
																												}
                                                    `}
														title={m.label}>
														<i
															className={`${m.icon} text-[32px] ${m.color}`}></i>
													</button>
												))}
											</div>

											<div className="flex flex-col gap-2">
												<Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
													Thoughts (Optional)
												</Label>
												<Textarea
													placeholder="What made you feel this way?"
													className="min-h-[120px] resize-none bg-gray-50 border-gray-100 focus:bg-white focus:border-[#285F3E] transition-all rounded-xl text-sm p-4"
													value={note}
													onChange={(
														e: React.ChangeEvent<HTMLTextAreaElement>
													) => setNote(e.target.value)}
												/>
											</div>

											<Button
												className="w-full text-[18px] bg-[#285F3E] hover:bg-[#1e462e] text-white font-semibold h-14 rounded-xl shadow-lg shadow-[#285F3E]/20 transition-all active:scale-[0.98]"
												disabled={!selectedMood || isCreating}
												onClick={handleSubmit}>
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
