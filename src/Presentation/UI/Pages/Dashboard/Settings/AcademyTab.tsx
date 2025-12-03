import React from "react";
import SettingsCard from "./SettingsCard";

const AcademyTab = () => {
	return (
		<SettingsCard>
			<div className="p-8 flex flex-col gap-6">
				{/* Header */}
				<div className="flex flex-col gap-3">
					<h2 className="text-xl font-bold text-[#111827]">Academy</h2>
					<div className="h-px w-full bg-[#D1D5DB]"></div>
				</div>

				
				<div className="bg-white border border-[#E7E6E0] rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.08)] px-5 py-5 flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<h3 className="text-[16px] font-semibold text-[#111827]">Certificate Name Verification</h3>
						<div className="h-px w-full bg-[#E5E7EB]"></div>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-[13px] font-semibold">Full Name</label>
						<div className="bg-[#FFF2CC] text-[#6B5B28] text-[12px] font-normal px-3 py-2 rounded-[4px] border border-[#F0E0A6]">
							Your name has been verified and cannot be changed. If you believe there is an error and need to update it, please <span className="font-semibold">contact us</span> with valid ID documentation.
						</div>
						<input
							type="text"
							defaultValue="Ichwan Indrawan"
							className="h-[36px] border border-[#D1D5DB] rounded-[4px] px-3 text-[13px] font-normal focus:outline-none bg-[#E9EEF2]"
							readOnly
						/>
					</div>
				</div>

				
				<div className="bg-white border border-[#E7E6E0] rounded-[12px] shadow-[0_6px_14px_rgba(0,0,0,0.08)] px-5 py-5 flex flex-col gap-3">
					<div className="flex items-center gap-2">
						<div className="relative">
							<i className="ri-notification-3-fill text-[#C34F21] text-[18px]"></i>
							<span className="size-2.5 rounded-full animate-ping bg-[#F45B5B] absolute -right-1 -top-1"></span>
							<span className="absolute inline-flex size-2.5 rounded-full bg-[#F45B5B] -right-1 -top-1 border-2 border-white"></span>
						</div>
						<span className="text-[13px] font-semibold text-[#111827]">Your Learning Path Now :</span>
						<span
							className="text-[15px] font-semibold tracking-tight text-[#285F3E] uppercase"
							style={{ fontFamily: '"Trebuchet MS", sans-serif' }}
						>
							React &amp; Back-End with AI
						</span> 
					</div>
				</div>
			</div>
		</SettingsCard>
	);
};

export default AcademyTab;
