import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming we might need to create this or use basic textarea




const DailyCheckinPage = () => {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [note, setNote] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const moods = [
        { value: "terrible", icon: "ri-emotion-unhappy-line", label: "Terrible", color: "text-red-500", bg: "bg-red-100" },
        { value: "bad", icon: "ri-emotion-sad-line", label: "Bad", color: "text-orange-500", bg: "bg-orange-100" },
        { value: "neutral", icon: "ri-emotion-normal-line", label: "Neutral", color: "text-yellow-500", bg: "bg-yellow-100" },
        { value: "good", icon: "ri-emotion-happy-line", label: "Good", color: "text-blue-500", bg: "bg-blue-100" },
        { value: "excellent", icon: "ri-emotion-laugh-line", label: "Excellent", color: "text-green-500", bg: "bg-green-100" },
    ];

    const handleSubmit = () => {
        setIsSubmitted(true);
        // Here you would typically save the data
    };

    // Mock Calendar Data
    const daysInMonth = 30;
    const currentDay = 26;
    const checkins = [1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 14, 15, 16, 19, 20, 21, 22, 23];

    return (
        <div className="flex h-screen overflow-hidden bg-[#F4F2EC] relative">
            {/* Main Content */}
            <div className="flex-1 px-13 py-6 overflow-y-auto w-full transition-all duration-300">
                <div className="flex flex-col gap-6 md:gap-8">
                    
                    {/* Header */}
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#285F3E]">Daily Check-in</h1>
                        <p className="text-sm md:text-base text-gray-600">Track your mood and thoughts to maintain a healthy learning balance.</p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
                        {/* Left Column: Calendar */}
                        <Card className="xl:col-span-2 border-none shadow-sm bg-white flex flex-col">
                            <CardHeader className="pb-2">
                                <CardTitle className="flex justify-between items-center text-lg md:text-xl">
                                    <span>November 2025</span>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100"><i className="ri-arrow-left-s-line text-lg"></i></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100"><i className="ri-arrow-right-s-line text-lg"></i></Button>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="grid grid-cols-7 gap-2 md:gap-4 text-center mb-4">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">{day}</div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-7 gap-2 md:gap-4">
                                    {/* Empty slots for start of month (mock) */}
                                    {Array.from({ length: 5 }).map((_, i) => <div key={`empty-${i}`} className="aspect-square"></div>)}
                                    
                                    {Array.from({ length: daysInMonth }).map((_, i) => {
                                        const day = i + 1;
                                        const isCheckedIn = checkins.includes(day);
                                        const isToday = day === currentDay;
                                        
                                        return (
                                            <div key={day} className="flex flex-col items-center justify-start gap-1 aspect-square relative group cursor-pointer">
                                                <div 
                                                    className={`
                                                        w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200
                                                        ${isToday ? 'border-2 border-[#285F3E] text-[#285F3E] font-bold' : ''}
                                                        ${isCheckedIn ? 'bg-[#285F3E] text-white shadow-md transform group-hover:scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                                                    `}
                                                >
                                                    {day}
                                                </div>
                                                {isCheckedIn && <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#285F3E]/80"></div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Right Column: Check-in Form */}
                        <Card className="border-none shadow-sm bg-white flex flex-col h-full">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg md:text-xl">Today's Mood</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-6">
                                {!isSubmitted ? (
                                    <>
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-sm font-medium text-gray-700">How are you feeling?</Label>
                                            <div className="flex justify-between gap-1 md:gap-2">
                                                {moods.map((m) => (
                                                    <button
                                                        key={m.value}
                                                        onClick={() => setSelectedMood(m.value)}
                                                        className={`
                                                            flex-1 p-2 md:p-3 rounded-xl transition-all duration-200 flex flex-col items-center gap-2
                                                            ${selectedMood === m.value ? `${m.bg} ring-2 ring-offset-1 ring-${m.color.split('-')[1]}-500 shadow-sm scale-105` : 'hover:bg-gray-50 grayscale hover:grayscale-0'}
                                                        `}
                                                        title={m.label}
                                                    >
                                                        <i className={`${m.icon} text-2xl md:text-3xl ${m.color}`}></i>
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="h-6 text-center">
                                                {selectedMood && (
                                                    <span className={`text-sm font-bold animate-in fade-in slide-in-from-bottom-1 ${moods.find(m => m.value === selectedMood)?.color}`}>
                                                        {moods.find(m => m.value === selectedMood)?.label}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 flex-1">
                                            <Label className="text-sm font-medium text-gray-700">What's on your mind?</Label>
                                            <Textarea 
                                                placeholder="Write about your learning progress, challenges, or just how your day went..." 
                                                className="flex-1 min-h-[120px] resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                                                value={note}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
                                            />
                                        </div>

                                        <Button 
                                            className="w-full bg-[#285F3E] hover:bg-[#1e462e] text-white font-medium py-6 rounded-xl shadow-lg shadow-[#285F3E]/20 transition-all active:scale-[0.98]"
                                            disabled={!selectedMood}
                                            onClick={handleSubmit}
                                        >
                                            Check In
                                        </Button>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full py-8 gap-6 text-center animate-in zoom-in-95 duration-300">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                                            <i className="ri-check-line text-5xl"></i>
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">Checked In!</h3>
                                            <p className="text-gray-500 mt-1">You've maintained your 5-day streak.</p>
                                        </div>
                                        <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
                                            Edit Entry
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Entries */}
                    <div className="mt-2">
                        <h2 className="text-xl font-bold text-[#285F3E] mb-4">Recent Entries</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-default bg-white">
                                    <CardContent className="p-5 flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                            <i className="ri-emotion-happy-line text-2xl"></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-gray-900">Yesterday</span>
                                                <span className="text-xs text-gray-400 font-medium">10:30 AM</span>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                                Finally understood how React Context works! It was a bit confusing at first but the tutorial really helped.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DailyCheckinPage;
