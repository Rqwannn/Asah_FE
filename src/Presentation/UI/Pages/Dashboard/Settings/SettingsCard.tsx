import React from "react";

interface SettingsCardProps {
  children: React.ReactNode;
}

const SettingsCard = ({ children }: SettingsCardProps) => {
  return (
    <div className="h-[748px] w-full overflow-hidden overflow-y-auto rounded-[18px] border border-[#E7E6E0] bg-white shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
      {children}
    </div>
  );
};

export default SettingsCard;
