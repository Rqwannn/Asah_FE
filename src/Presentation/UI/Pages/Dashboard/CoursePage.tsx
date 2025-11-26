import StarsImage from "@/assets/stars.svg";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ProfileSidebar from "../../Components/ProfileSidebar";

import { useJourneysFactory } from "@/App/Factories/useJourneyFactory";

const CoursePage = () => {
	const { data: journeys, isLoading } = useJourneysFactory();
	const { VITE_DICODING_ASSETS_URL } = import.meta.env;



	return (
		<>
			<div className="px-13 py-6 mr-[310px] overflow-y-auto">
				{/* heading */}
				<div className="p-6 relative w-full bg-[#285F3E] rounded-xl overflow-hidden min-h-[160px] md:min-h-[180px]">
					<img
						src={StarsImage}
						alt=""
						className="absolute right-0 top-0 w-32 h-full md:w-48 pointer-events-none select-none"
					/>

					<div className="w-full md:w-2/3 gap-2 flex flex-col">
						<p className="font-normal text-[11px] md:text-[12px] leading-5 text-[#FFFFFF]">
							ONLINE COURSE
						</p>
						<h1 className="text-[20px] md:text-[28px] lg:text-[32px] font-bold leading-6 md:leading-8 text-[#FFFFFF]">
							Sharpen Your Skills With Professional Online Courses
						</h1>

						<Button variant={"default"} className="w-fit rounded-full">
							<span>Join now</span>
							<i className="ri-play-circle-fill ri-lg"></i>
						</Button>
					</div>
				</div>

				{/* content */}
				<div className="mt-[35px] flex flex-col gap-3">
					<Carousel className="w-full">
						<div className="flex items-center justify-between">
							<h1 className="text-[18px] font-semibold">Continue Learning</h1>
							<div className="flex items-center gap-2 ">
								<CarouselPrevious
									placement="inline"
									className="size-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs"
								/>
								<CarouselNext
									placement="inline"
									className="size-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs"
								/>
							</div>
						</div>
						<CarouselContent>
							{isLoading ? (
								<div className="p-4 w-full text-center">Loading courses...</div>
							) : journeys?.map((journey) => (
								<CarouselItem
									key={journey.id}
									className="basis-full sm:basis-1/2 lg:basis-1/3 p-1">
									<div className="p-3 h-[240px] flex flex-col gap-3 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-xs cursor-pointer hover:shadow-md transition-shadow"
										onClick={() => window.location.href = `/course/${journey.id}`}
									>
										<div className="w-full h-[115px] rounded-lg bg-[#EAEAEA] overflow-hidden">
											{journey.image_path ? (
												<img src={VITE_DICODING_ASSETS_URL + journey.image_path} alt={journey.name} className="w-full h-full object-cover" />
											) : (
												<div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
													<i className="ri-image-line text-2xl"></i>
												</div>
											)}
										</div>
										<div className="px-3 py-0.5 bg-[#285F3E]/10 rounded-full w-fit flex items-center">
											<span className="text-[8px] font-normal text-[#285F3E] line-clamp-2">
												{journey.difficulty}
											</span>
										</div>
										<span className="text-[14px] font-medium text-[#202020] leading-5 line-clamp-2">
											{journey.name}
										</span>
										<div className="flex items-center gap-2 mt-auto">
											<Progress value={journey.progress_info?.percentage || 0} />
											<span className="text-[10px] text-[#202020]">
												{journey.progress_info?.percentage || 0}%
											</span>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<ProfileSidebar />
		</>
	);
};

export default CoursePage;
