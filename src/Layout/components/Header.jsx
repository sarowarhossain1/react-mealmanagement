import GearIcon from "@rsuite/icons/Gear";
import { useState, useEffect } from "react";
import { Bell, Menu, Search, LogOut, User, Moon, Sun } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Update html root class for dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header
      // className=" flex items-center justify-between mb-6  px-2 sm:px-4 bg-white dark:bg-slate-900 shadow-md dark:shadow-lg  h-15"
      className="
        sticky top-0 z-40
        flex items-center justify-between
        px-4
        bg-[#FFFFFF] dark:bg-slate-900
        shadow-md
        h-16
      "
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-slate-800 rounded px-3 py-2  border border-gray-400 dark:border-slate-700 shadow-sm">
          <Search size={20} className="opacity-70" />
          <input
            className="bg-transparent outline-none text-[16px] w-96"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all">
          <Bell size={16} />
        </button>
        {/* Gear icons  */}
        <div className="me-3">
          <GearIcon className="mt-1 text-pink-900 text-2xl font-bold" spin />
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold"
          >
            SH
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden z-50">
              <Link
                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-[#615FFF] font-semibold"
                to="/profile"
              >
                <User size={16} className="text-[#615FFF]" /> Profile
              </Link>
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-slate-700 font-semibold"
                onClick={handleLogout}
              >
                <LogOut size={16} className="text-red-600" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
