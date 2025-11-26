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
import ProfileSidebar from "../../Components/ProfileSidebar";

const CoursePage = () => {
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

			<ProfileSidebar />
		</>
	);
};

export default CoursePage;
