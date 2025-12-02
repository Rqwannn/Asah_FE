import { Button } from "@/components/ui/button";
import Icon from "@/assets/icon.png";
import ProfileImg from "@/assets/profile.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthFactory } from "@/App/Factories/useAuthFactory";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
	const { useLogout } = useAuthFactory();
	const { logout } = useLogout();
	const navigate = useNavigate();
	const { toast } = useToast();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLogout = async () => {
		await logout();
		toast("Logout berhasil", "success");
		navigate("signin");
	};

	const location = useLocation();
	const isActive = (path: string) => location.pathname === path;

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<>
			{/* Mobile Top Navbar */}
			<div className="lg:hidden fixed top-0 left-0 right-0 bg-[#285F3E] flex items-center justify-between px-4 py-3 z-50 border-b border-[#1e462e]">
				<Link to={"/"}>
					<img src={Icon} alt="" className="w-10 h-10 rounded-lg" />
				</Link>

				<div className="flex items-center gap-6">
					<Link to={"/"}>
						<Button
							variant={null}
							size={"icon"}
							className={`text-2xl ${
								isActive("/") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
							} cursor-pointer`}>
							<i
								className={
									isActive("/") ? "ri-home-4-fill" : "ri-home-4-line"
								}></i>
						</Button>
					</Link>
					<Link to={"/course"}>
						<Button
							variant={null}
							size={"icon"}
							className={`text-2xl ${
								isActive("/course") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
							} cursor-pointer`}>
							<i
								className={
									isActive("/course")
										? "ri-graduation-cap-fill"
										: "ri-graduation-cap-line"
								}></i>
						</Button>
					</Link>

					{/* Avatar Dropdown */}
					<div className="relative" ref={dropdownRef}>
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="w-8 h-8 rounded-full overflow-hidden border-2 border-white hover:border-gray-200 transition-colors">
							<img
								src={ProfileImg}
								alt="Profile"
								className="w-full h-full object-cover"
							/>
						</button>

						{/* Dropdown Menu */}
						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200  z-50">
								<Link
									to="/profile"
									onClick={() => setIsDropdownOpen(false)}
									className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
									<i className="ri-user-line text-lg text-gray-600"></i>
									<span className="text-sm font-medium text-gray-700">
										Lihat Profil
									</span>
								</Link>
								<div className="h-px bg-gray-100 "></div>
								<button
									onClick={() => {
										setIsDropdownOpen(false);
										handleLogout();
									}}
									className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
									<i className="ri-logout-box-r-line text-lg text-red-500"></i>
									<span className="text-sm font-medium text-red-500">
										Logout
									</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Desktop Sidebar Navbar */}
			<div className="hidden lg:flex w-20 xl:w-[132px] bg-[#285F3E] flex-col rounded-lg xl:rounded-xl fixed left-2 xl:left-3 2xl:left-5 top-2 xl:top-3 2xl:top-5 bottom-2 xl:bottom-3 2xl:bottom-5 justify-between p-3 xl:p-6 2xl:p-8 z-50">
				<div className="flex justify-center">
					<img src={Icon} alt="" className="w-10 xl:w-12" />
				</div>
				<div className="flex flex-col items-center gap-8 xl:gap-12 2xl:gap-16">
					<Link to={"/"}>
						<Button
							variant={null}
							size={"icon-lg"}
							className={`text-[28px] ${
								isActive("/") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
							} cursor-pointer`}>
							<i
								className={
									isActive("/") ? "ri-home-4-fill" : "ri-home-4-line"
								}></i>
						</Button>
					</Link>
					<Link to={"/course"}>
						<Button
							variant={null}
							size={"icon-lg"}
							className={`text-[32px] ${
								isActive("/course") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
							} cursor-pointer `}>
							<i
								className={
									isActive("/course")
										? "ri-graduation-cap-fill"
										: "ri-graduation-cap-line"
								}></i>
						</Button>
					</Link>
					<Link to={"/profile"}>
						<Button
							variant={null}
							size={"icon-lg"}
							className={`text-[32px] ${
								isActive("/profile") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
							} cursor-pointer`}>
							<i
								className={
									isActive("/profile") ? "ri-user-fill" : "ri-user-line"
								}></i>
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
		</>
	);
};

export default Navbar;
