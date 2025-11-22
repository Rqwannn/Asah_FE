import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Data {
	id: number;
	icon: string;
	title: string;
	description?: string;
}

const RecomendationCard = ({
	data,
	onChange,
	isChecked,
}: {
	data: Data;
	onChange: (title: string, checked: boolean) => void;
	isChecked: boolean;
}) => {
	const [checked, setChecked] = useState<boolean>(isChecked);

	useEffect(() => {
		setChecked(isChecked);
	}, [isChecked]);

	const toggle = (next: boolean) => {
		setChecked(next);
		onChange(data.title, next);
	};

	const handleContainerClick = () => {
		toggle(!checked);
	};

	const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggle(!checked);
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			className={`relative cursor-pointer flex flex-col items-center gap-1 py-5 px-3 rounded-2xl border-[1.5px]  ${
				checked ? "border-[#285F3E] " : "border-gray-200"
			}`}
			onClick={handleContainerClick}
			onKeyDown={handleKeyDown}>
			{/* small circle top-right (uses the uploaded image as example) */}

			<Checkbox
				checked={checked}
				onCheckedChange={(val) => toggle(Boolean(val))}
				onClick={(e) => e.stopPropagation()}
				className="size-6 rounded-full absolute right-4 top-4 object-cover border border-[#E3E3E3]  cursor-pointer data-[state=checked]:bg-[#285F3E] data-[state=checked]:border-[#285F3E]"
			/>

			{/* center icon */}
			<div className="">
				<div className="flex items-center justify-center">
					<div
						className="w-14 h-14 flex items-center justify-center rounded-full text-[30px]"
						dangerouslySetInnerHTML={{ __html: data.icon }}></div>
				</div>

				<h3 className="text-[13px] font-semibold text-center">{data.title}</h3>
				<p className="text-center text-[10px] text-gray-600 max-w-xl">
					{data.description}
				</p>
			</div>
		</div>
	);
};

export default RecomendationCard;
