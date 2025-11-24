import { Button } from "@/components/ui/button";
import Icon from "@/assets/icon.svg";
import { Link } from "react-router-dom";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";

const Navbar = () => {
	const { useLogout } = useAuthFactory();
	const { logout } = useLogout();

	const handleLogout = async () => {
		await logout();
	};
	return (
		<div className="w-[132px] h-[852px] bg-[#285F3E] flex flex-col rounded-xl absolute left-5 top-5 bottom-5 justify-between p-11">
			<div className="">
				<img src={Icon} alt="" />
			</div>
			<div className="flex flex-col items-center gap-16">
				<Link to={"/dashboard"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className="text-[28px] text-[#FFFFFF] cursor-pointer">
						<i className="ri-home-4-fill"></i>
					</Button>
				</Link>
				<Link to={"/course"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className="text-[32px] text-[#FFFFFF] cursor-pointer ">
						<i className="ri-graduation-cap-fill"></i>
					</Button>
				</Link>
				<Link to={"/"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className="text-[32px] text-[#FFFFFF] cursor-pointer">
						<i className="ri-user-line"></i>
					</Button>
				</Link>
				<Link to={"/"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className="text-[32px] text-[#FFFFFF] cursor-pointer">
						<i className="ri-message-3-fill"></i>
					</Button>
				</Link>
				<Link to={"/"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className="text-[32px] text-[#FFFFFF] cursor-pointer">
						<i className="ri-settings-3-line"></i>
					</Button>
				</Link>
			</div>
			<div className="flex flex-col items-center ">
				<Button
					onClick={handleLogout}
					variant={"link"}
					size={"icon-lg"}
					className="text-[28px] text-[#FFFFFF] cursor-pointer">
					<i className="ri-logout-box-r-line"></i>
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
