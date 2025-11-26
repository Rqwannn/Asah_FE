import { Button } from "@/components/ui/button";
import Icon from "@/assets/icon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
	const { useLogout } = useAuthFactory();
	const { logout } = useLogout();
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogout = async () => {
		await logout();
		toast("Logout berhasil", "success");
		navigate("signin");
	};
	const location = useLocation();
	const isActive = (path: string) => location.pathname === path;

	return (
		<div className="w-[132px] h-[852px] bg-[#285F3E] flex flex-col rounded-xl absolute left-5 top-5 bottom-5 justify-between p-11">
			<div className="">
				<img src={Icon} alt="" />
			</div>
			<div className="flex flex-col items-center gap-16">
				<Link to={"/"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className={`text-[28px] ${isActive("/") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"} cursor-pointer`}>
						<i className={isActive("/") ? "ri-home-4-fill" : "ri-home-4-line"}></i>
					</Button>
				</Link>
				<Link to={"/course"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className={`text-[32px] ${isActive("/course") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"} cursor-pointer `}>
						<i className={isActive("/course") ? "ri-graduation-cap-fill" : "ri-graduation-cap-line"}></i>
					</Button>
				</Link>
				<Link to={"/profile"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className={`text-[32px] ${isActive("/profile") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"} cursor-pointer`}>
						<i className={isActive("/profile") ? "ri-user-fill" : "ri-user-line"}></i>
					</Button>
				</Link>
				<Link to={"/messages"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className={`text-[32px] ${isActive("/messages") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"} cursor-pointer`}>
						<i className={isActive("/messages") ? "ri-message-3-fill" : "ri-message-3-line"}></i>
					</Button>
				</Link>
				<Link to={"/settings"}>
					<Button
						variant={null}
						size={"icon-lg"}
						className={`text-[32px] ${isActive("/settings") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"} cursor-pointer`}>
						<i className={isActive("/settings") ? "ri-settings-3-fill" : "ri-settings-3-line"}></i>
					</Button>
				</Link>
			</div>
			<div className="flex flex-col items-center ">
				<Button
					onClick={handleLogout}
					variant={null}
					size={"icon-lg"}
					className="text-[28px] text-[#FFFFFF] cursor-pointer">
					<i className="ri-logout-box-r-line"></i>
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
