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
      <div className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b border-[#1e462e] bg-[#285F3E] px-4 py-3 md:hidden">
        <Link to={"/"}>
          <img src={Icon} alt="" className="h-10 w-10 rounded-lg" />
        </Link>

        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <Button
              variant={null}
              size={"icon"}
              className={`text-2xl ${
                isActive("/") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
              } cursor-pointer`}
            >
              <i
                className={isActive("/") ? "ri-home-4-fill" : "ri-home-4-line"}
              ></i>
            </Button>
          </Link>
          <Link to={"/course"}>
            <Button
              variant={null}
              size={"icon"}
              className={`text-2xl ${
                isActive("/course") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
              } cursor-pointer`}
            >
              <i
                className={
                  isActive("/course")
                    ? "ri-graduation-cap-fill"
                    : "ri-graduation-cap-line"
                }
              ></i>
            </Button>
          </Link>
          {JSON.parse(localStorage.getItem("user") || "{}").role ===
            "reviewer" && (
            <Link to={"/submissions"}>
              <Button
                variant={null}
                size={"icon"}
                className={`text-2xl ${
                  isActive("/submissions")
                    ? "text-[#FFFFFF]"
                    : "text-[#FFFFFF]/70"
                } cursor-pointer`}
              >
                <i className="ri-file-list-3-line"></i>
              </Button>
            </Link>
          )}

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="h-8 w-8 overflow-hidden rounded-full border-2 border-white transition-colors hover:border-gray-200"
            >
              <img
                src={ProfileImg}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-gray-50"
                >
                  <i className="ri-user-line text-lg text-gray-600"></i>
                  <span className="text-sm font-medium text-gray-700">
                    Lihat Profil
                  </span>
                </Link>
                <div className="h-px bg-gray-100"></div>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2 transition-colors hover:bg-gray-50"
                >
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
      <div className="fixed top-6 bottom-6 left-3 z-50 hidden flex-col justify-between rounded-lg bg-[#285F3E] p-3 md:flex">
        <div className="flex justify-center">
          <img src={Icon} alt="" className="w-12 rounded-lg" />
        </div>
        <div className="flex flex-col items-center gap-12">
          <Link to={"/"}>
            <Button
              variant={null}
              size={"icon-lg"}
              className={`text-[28px] ${
                isActive("/") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
              } cursor-pointer`}
            >
              <i
                className={isActive("/") ? "ri-home-4-fill" : "ri-home-4-line"}
              ></i>
            </Button>
          </Link>
          <Link to={"/course"}>
            <Button
              variant={null}
              size={"icon-lg"}
              className={`text-[32px] ${
                isActive("/course") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
              } cursor-pointer`}
            >
              <i
                className={
                  isActive("/course")
                    ? "ri-graduation-cap-fill"
                    : "ri-graduation-cap-line"
                }
              ></i>
            </Button>
          </Link>
          <Link to={"/profile"}>
            <Button
              variant={null}
              size={"icon-lg"}
              className={`text-[32px] ${
                isActive("/profile") ? "text-[#FFFFFF]" : "text-[#FFFFFF]/70"
              } cursor-pointer`}
            >
              <i
                className={
                  isActive("/profile") ? "ri-user-fill" : "ri-user-line"
                }
              ></i>
            </Button>
          </Link>
          {JSON.parse(localStorage.getItem("user") || "{}").role ===
            "reviewer" && (
            <Link to={"/submissions"}>
              <Button
                variant={null}
                size={"icon-lg"}
                className={`text-[32px] ${
                  isActive("/submissions")
                    ? "text-[#FFFFFF]"
                    : "text-[#FFFFFF]/70"
                } cursor-pointer`}
                title="All Submissions"
              >
                <i className="ri-file-list-3-line"></i>
              </Button>
            </Link>
          )}
        </div>
        <div className="flex flex-col items-center">
          <Button
            onClick={handleLogout}
            variant={null}
            size={"icon-lg"}
            className="cursor-pointer text-[28px] text-[#FFFFFF]"
          >
            <i className="ri-logout-box-r-line"></i>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
