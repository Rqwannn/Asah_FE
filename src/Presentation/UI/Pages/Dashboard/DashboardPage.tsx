import React from "react";
import StarsImage from "@/assets/stars.svg";
import { Button } from "@/components/ui/button";

const DashboardPage = () => {
	return (
		<>
			<div className="px-13 py-8 mr-[310px] overflow-y-auto">
				<div className="p-6 relative w-full h-[180px] bg-[#285F3E] rounded-xl">
					<img src={StarsImage} alt="" className="absolute right-0" />

					<div className="w-2/3 gap-2 flex flex-col">
						<p className="font-normal text-[12px] leading-5 text-[#FFFFFF]">
							ONLINE COURSE
						</p>
						<h1 className="text-[32px] font-bold leading-8 text-[#FFFFFF]">
							Sharpen Your Skills With Professional Online Courses
						</h1>

						<Button variant={"default"} className="w-fit rounded-full">
							<span>Join now</span>
							<i className="ri-play-circle-fill ri-lg"></i>
						</Button>
					</div>
				</div>
			</div>

			<div className="bg-[#FFFFFF] h-full w-[310px] absolute right-0 top-0">
                
            </div>
		</>
	);
};

export default DashboardPage;
