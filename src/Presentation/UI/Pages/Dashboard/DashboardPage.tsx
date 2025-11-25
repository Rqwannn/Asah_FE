import StarsImage from "@/assets/stars.svg";
import { Button } from "@/components/ui/button";
import ProfileImg from "@/assets/profile.svg";
import { Progress } from "@/components/ui/progress";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const DashboardPage = () => {
	const slides = [
		{
			category: "FRONTEND",
			title: "Beginner's Guide to becoming a professional frontend developer",
			progress: 50,
		},
		{
			category: "BACKEND",
			title: "Build robust APIs with Node.js and Express",
			progress: 30,
		},
		{
			category: "UI/UX",
			title: "Design beautiful interfaces with practical principles",
			progress: 70,
		},
		{
			category: "DATABASE",
			title: "Master relational modeling with PostgreSQL",
			progress: 40,
		},
		{
			category: "DEVOPS",
			title: "Intro to CI/CD and deployment best practices",
			progress: 20,
		},
	];

	return (
		<>
			<div className="px-13 py-8 mr-[310px] overflow-y-auto">
				{/* heading */}
				<div className="p-6 relative w-full bg-[#285F3E] rounded-xl overflow-hidden min-h-[160px] md:min-h-[180px]">
					<img
						src={StarsImage}
						alt=""
						className="absolute right-0 top-0 w-32 md:w-48 pointer-events-none select-none"
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
							<div className="flex items-center gap-2">
								<CarouselPrevious className="static size-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs" />
								<CarouselNext className="static size-8 rounded-full bg-[#FFFFFF] border border-[#E5E7EB] shadow-xs" />
							</div>
						</div>
						<CarouselContent>
							{slides.map((s, i) => (
								<CarouselItem
									key={i}
									className="basis-full sm:basis-1/2 lg:basis-1/3 p-1">
									<div className="p-3 h-[240px] flex flex-col gap-3 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-xs">
										<div className="w-full h-[115px] rounded-lg bg-[#EAEAEA]"></div>
										<div className="px-3 py-0.5 bg-[#285F3E]/10 rounded-full w-fit flex items-center">
											<span className="text-[8px] font-normal text-[#285F3E] line-clamp-2">
												{s.category}
											</span>
										</div>
										<span className="text-[14px] font-medium text-[#202020] leading-5 line-clamp-2">
											{s.title}
										</span>
										<div className="flex items-center gap-2 mt-auto">
											<Progress value={s.progress} />
											<span className="text-[10px] text-[#202020]">
												{s.progress}%
											</span>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<div className="bg-[#FFFFFF] h-full w-[310px] absolute right-0 top-0 px-6 py-8">
				<div className="flex flex-col items-center gap-4">
					<div>
						<img
							src={ProfileImg}
							alt=""
							className="rounded-full size-[72px] shrink-0 "
						/>
					</div>

					<div className="flex flex-col gap-1 items-center">
						<h1 className="text-[16px] font-medium leading-8">Jane Doe</h1>

						<div className="w-full bg-[#F4F2EC] rounded-lg  overflow-hidden">
							<span className="text-[12px] whitespace-nowrap inline-block w-full animate-marquee font-medium text-[#000000] ">
								SI CEPAT PAHAM
							</span>
						</div>
					</div>

					<div className="flex w-full gap-4">
						<div className="bg-[#F4F2EC] rounded-lg w-full flex items-center justify-center gap-2 px-4 py-2">
							<span className="text-[36px] text-[#285F3E] font-bold leading-5">
								11
							</span>
							<span className="text-[10px] text-black font-medium leading-4">
								Courses completed
							</span>
						</div>
						<div className="bg-[#F4F2EC] rounded-lg w-full flex items-center justify-center gap-2 p-2">
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
