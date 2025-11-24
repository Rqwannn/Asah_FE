import React from "react";
import StarsImage from "@/assets/stars.svg";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";

const DashboardPage = () => {
	return (
		<>
			<div className="px-13 py-8 mr-[310px] overflow-y-auto">
				<div className="p-6 relative w-full h-[180px] bg-[#285F3E] rounded-xl">
					<img src={StarsImage} alt="" className="absolute right-0 top-0" />

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

			<div className="bg-[#FFFFFF] h-full w-[310px] absolute right-0 top-0 px-6 py-8">
				<div className="flex flex-col items-center gap-4">
					<div>
						<img src={ProfileImg} alt="" />
					</div>

					<h1 className="text-[16px] font-medium leading-8 ">Jane Doe</h1>

					<div className="flex w-full gap-4">
						<div className="bg-[#F5F5F7] rounded-lg w-full flex items-center justify-center gap-2 px-4 py-2">
							<span className="text-[36px] text-[#285F3E] font-bold leading-5">
								11
							</span>
							<span className="text-[10px] text-black font-medium leading-4">
								Courses completed
							</span>
						</div>
						<div className="bg-[#F5F5F7] rounded-lg w-full flex items-center justify-center gap-2 p-2">
							<span className="text-[36px] text-[#C34F21] font-bold leading-5 ">
								4
							</span>
							<span className="text-[10px] text-black font-medium leading-4">
								Courses completed
							</span>
						</div>
					</div>

					<Button
						variant={null}
						className="flex items-center gap-1 cursor-pointer mt-2">
						<div className="relative">
							<i className="ri-notification-3-fill text-[36px]"></i>
							<span className="size-3 rounded-full animate-ping bg-[#F45B5B] absolute right-1 top-2"></span>
							<span className="absolute inline-flex size-3 rounded-full bg-[#F45B5B] top-2 right-1"></span>
						</div>
						<span className="text-[14px] font-medium text-black ">
							Daily check-in
						</span>
					</Button>

					<div className="w-full flex flex-col gap-3">
						<span className="font-medium text-[14px] ">Your Courses</span>
						{Array.from({ length: 5 }).map(() => (
							<div className="flex flex-col items-center gap-4">
								<div className="flex items-center w-full gap-2">
									<div className="px-2 py-1 rounded flex items-center  bg-[#1C1D1D]/5  rouded-full text-black ">
										<i className="ri-figma-line"></i>
									</div>
									<div className="flex flex-col w-full">
										<span className="text-[12px] font-medium leading-5">
											Prashant Kumar singh
										</span>
										<span className="text-[9px] font-medium">
											Prashant Kumar singh
										</span>
									</div>
									<Button
										variant={null}
										className="bg-[#285F3E] rounded-xl text-white px-3 py-2 h-fit ">
										<span className="text-[8px] font-medium">Continue</span>
									</Button>
								</div>

								<div className="w-full h-px bg-[#D8D8D8]"></div>
							</div>
						))}
						<Button
							variant={null}
							className="bg-[#285F3E]/20 rounded-xl border border-[#285F3E] text-[#285F3E] cursor-pointer">
							See all
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
