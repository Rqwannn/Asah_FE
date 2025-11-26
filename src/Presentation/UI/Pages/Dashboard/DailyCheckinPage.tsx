import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDailyCheckinFactory } from "@/App/Factories/useDailyCheckinFactory";
import { useToast } from "@/components/ui/use-toast";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isAfter, startOfDay, parseISO, isBefore } from "date-fns";

const DailyCheckinPage = () => {
	const { checkins, createCheckin, isCreating } = useDailyCheckinFactory();
	const { toast } = useToast();

	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedMood, setSelectedMood] = useState<string | null>(null);
	const [note, setNote] = useState("");
	const [viewMode, setViewMode] = useState<'form' | 'details'>('form');
	const [selectedCheckin, setSelectedCheckin] = useState<any>(null);

	const moods = [
		{ value: "terrible", icon: "ri-emotion-unhappy-line", label: "Terrible", color: "text-red-500", bg: "bg-red-50", ring: "ring-red-200" },
		{ value: "bad", icon: "ri-emotion-sad-line", label: "Bad", color: "text-orange-500", bg: "bg-orange-50", ring: "ring-orange-200" },
		{ value: "neutral", icon: "ri-emotion-normal-line", label: "Neutral", color: "text-yellow-500", bg: "bg-yellow-50", ring: "ring-yellow-200" },
		{ value: "good", icon: "ri-emotion-happy-line", label: "Good", color: "text-blue-500", bg: "bg-blue-50", ring: "ring-blue-200" },
		{ value: "excellent", icon: "ri-emotion-laugh-line", label: "Excellent", color: "text-green-500", bg: "bg-green-50", ring: "ring-green-200" },
	];

	// Calendar Data
	const today = new Date();
	const currentMonthStart = startOfMonth(today);
	const currentMonthEnd = endOfMonth(today);
	const daysInMonth = eachDayOfInterval({ start: currentMonthStart, end: currentMonthEnd });

	// Check if checked in today on load
	useEffect(() => {
		if (checkins) {
			const todayCheckin = checkins.find(c => isSameDay(parseISO(c.date), today));
			if (todayCheckin && isSameDay(selectedDate, today)) {
				setViewMode('details');
				setSelectedCheckin(todayCheckin);
			}
		}
	}, [checkins]);

	// Effect to handle initial selection logic or updates
	useEffect(() => {
		handleDateClick(selectedDate);
	}, [checkins, selectedDate]);

	const handleDateClick = (date: Date) => {
		setSelectedDate(date);

		// Find checkin for this date
		const checkin = checkins?.find(c => isSameDay(parseISO(c.date), date));

		if (checkin) {
			setViewMode('details');
			setSelectedCheckin(checkin);
		} else {
			if (isSameDay(date, today)) {
				// If today and NO checkin, show form
				setViewMode('form');
				setSelectedCheckin(null);
				if (viewMode === 'details') {
					setSelectedMood(null);
					setNote("");
				}
			} else {
				// Future or past without checkin
				setViewMode('form');
				setSelectedCheckin(null);
			}
		}
	};

	const handleSubmit = async () => {
		if (!selectedMood) return;

		try {
			await createCheckin({
				mood: selectedMood,
				description: note
			});
			toast("Check-in submitted successfully!", "success");
			// The query invalidation will trigger a re-fetch, and the useEffect will update the view
		} catch (error: any) {
			if (error.response?.data?.message?.includes("sudah melakukan check-in")) {
				toast("You have already checked in today.", "info");
				// Force refresh or switch to details if we can find the checkin locally (optimistic)
			} else {
				toast("Failed to submit check-in.", "error");
			}
		}
	};

	const isDateDisabled = (date: Date) => {
		const isFuture = isAfter(startOfDay(date), startOfDay(today));
		const isPast = isBefore(startOfDay(date), startOfDay(today));
		const hasCheckin = checkins?.some(c => isSameDay(parseISO(c.date), date));
		
		// Disable if future OR (past AND no checkin)
		return isFuture || (isPast && !hasCheckin);
	};

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Main Content */}
			<div className="flex-1 px-8 py-6 overflow-y-auto w-full">
				<div className="flex flex-col gap-6 h-full">

					{/* Header */}
					<div className="flex flex-col gap-1">
						<h1 className="text-2xl font-bold text-[#202020]">Daily Check-in</h1>
						<p className="text-sm text-gray-500">Track your mood and thoughts to maintain a healthy learning balance.</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch w-full flex-1">
						{/* Left Column: Calendar */}
						<Card className="border-none shadow-sm bg-white flex flex-col rounded-2xl">
							<CardHeader className="pb-2 pt-5 px-5">
								<CardTitle className="flex justify-between items-center text-[15px] font-semibold text-[#202020]">
									<span>{format(today, 'MMMM yyyy')}</span>
									<div className="flex gap-1">
										<Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-gray-50 text-gray-400" disabled><i className="ri-arrow-left-s-line text-lg"></i></Button>
										<Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-gray-50 text-gray-400" disabled><i className="ri-arrow-right-s-line text-lg"></i></Button>
									</div>
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-1 px-5 pb-5">
								<div className="grid grid-cols-7 gap-1 text-center mb-2">
									{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
										<div key={day} className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{day}</div>
									))}
								</div>
								<div className="grid grid-cols-7 gap-1">
									{/* Empty slots for start of month */}
									{Array.from({ length: currentMonthStart.getDay() }).map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}

									{daysInMonth.map((date: Date, i: number) => {
										const checkin = checkins?.find(c => isSameDay(parseISO(c.date), date));
										const isToday = isSameDay(date, today);
										const isSelected = isSameDay(date, selectedDate);
										const disabled = isDateDisabled(date);

										return (
											<div key={i} className="flex flex-col items-center justify-start gap-1 aspect-square relative group">
												<button
													onClick={() => !disabled && handleDateClick(date)}
													disabled={disabled}
													className={`
                                                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300
                                                        ${isSelected ? 'ring-2 ring-offset-2 ring-[#285F3E] scale-105' : ''}
                                                        ${isToday && !checkin ? 'border border-[#285F3E] text-[#285F3E] font-bold' : ''}
                                                        ${checkin
															? 'bg-[#285F3E] text-white shadow-sm shadow-[#285F3E]/20 hover:scale-110'
															: disabled
																? 'bg-gray-50 text-gray-300 cursor-not-allowed'
																: 'bg-white border border-gray-100 text-gray-600 hover:bg-gray-50 hover:border-gray-200'}
                                                    `}
												>
													{format(date, 'd')}
												</button>
												{checkin && <div className="w-1 h-1 rounded-full bg-[#285F3E] mt-0.5"></div>}
											</div>
										);
									})}
								</div>
							</CardContent>
						</Card>

						{/* Right Column: Check-in Form or Details */}
						<Card className="border-none shadow-sm bg-white flex flex-col h-full rounded-2xl overflow-hidden">
							<CardHeader className="pb-2 pt-5 px-5 bg-gray-50/50 border-b border-gray-50">
								<CardTitle className="text-[15px] font-semibold text-[#202020]">
									{viewMode === 'details' ? `Entry for ${format(selectedDate, 'MMM do')}` : "How are you feeling?"}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-1 flex flex-col gap-4 p-5">
								{viewMode === 'details' && selectedCheckin ? (
									<div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300 h-full">
										<div className="flex flex-col items-center justify-center py-4 gap-2 flex-1">
											<div className={`p-4 rounded-full ${moods.find(m => m.value === selectedCheckin.mood)?.bg || 'bg-gray-100'} mb-1`}>
												<i className={`${moods.find(m => m.value === selectedCheckin.mood)?.icon || 'ri-emotion-normal-line'} text-4xl ${moods.find(m => m.value === selectedCheckin.mood)?.color || 'text-gray-500'}`}></i>
											</div>
											<span className={`text-xl font-bold capitalize ${moods.find(m => m.value === selectedCheckin.mood)?.color}`}>
												{moods.find(m => m.value === selectedCheckin.mood)?.label}
											</span>
										</div>
										<div className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative">
											<p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm relative z-10 px-2">
												{selectedCheckin.description || "No thoughts recorded."}
											</p>
										</div>
									</div>
								) : (
									<>
										{isDateDisabled(selectedDate) ? (
											<div className="flex flex-col items-center justify-center h-full text-gray-300 gap-2 py-8">
												<div className="p-3 bg-gray-50 rounded-full">
													<i className="ri-lock-line text-2xl"></i>
												</div>
												<p className="text-sm font-medium">Check-in unavailable</p>
											</div>
										) : (
											<div className="flex flex-col h-full">
												<div className="grid grid-cols-5 gap-2 mb-4">
													{moods.map((m) => (
														<button
															key={m.value}
															onClick={() => setSelectedMood(m.value)}
															className={`
                                                                aspect-square rounded-xl transition-all duration-300 flex flex-col items-center justify-center gap-1
                                                                ${selectedMood === m.value
																	? `${m.bg} ${m.ring} ring-2 ring-offset-2 scale-105 shadow-sm`
																	: 'hover:bg-gray-50 grayscale hover:grayscale-0 opacity-70 hover:opacity-100'}
                                                            `}
															title={m.label}
														>
															<i className={`${m.icon} text-2xl ${m.color}`}></i>
														</button>
													))}
												</div>

												<div className="flex flex-col gap-2 flex-1 mb-4">
													<Label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Thoughts (Optional)</Label>
													<Textarea
														placeholder="What made you feel this way?"
														className="flex-1 min-h-[100px] resize-none bg-gray-50 border-gray-100 focus:bg-white focus:border-[#285F3E] transition-all rounded-xl text-sm p-3"
														value={note}
														onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
													/>
												</div>

												<Button
													className="w-full bg-[#285F3E] hover:bg-[#1e462e] text-white font-semibold py-4 rounded-xl shadow-lg shadow-[#285F3E]/20 transition-all active:scale-[0.98]"
													disabled={!selectedMood || isCreating}
													onClick={handleSubmit}
												>
													{isCreating ? "Saving..." : "Save Check-in"}
												</Button>
											</div>
										)}
									</>
								)}
							</CardContent>
						</Card>
					</div>

				</div>
			</div>
		</div>
	);
};

export default DailyCheckinPage;
