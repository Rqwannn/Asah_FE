import React from "react";

interface SettingsCardProps {
	children: React.ReactNode;
}

const SettingsCard = ({ children }: SettingsCardProps) => {
	return (
		<div className="relative mt-2"> 
			<div className="w-[720px] h-[640px] bg-white border border-[#E7E6E0] rounded-[18px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] overflow-hidden overflow-y-auto">
				{children}
			</div>
		</div>
	);
};

export default SettingsCard;
