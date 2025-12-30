import { motion } from "framer-motion";
import {
  Home,
  BarChart2,
  Users,
  Grid,
  Settings,
  LogOut,
  Menu,
  LayoutDashboard,

} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import MEAL from "../../assets/meal.jpg";

const Sidebar = ({ open, setOpen }) => {
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Member", path: "/member", icon: <BarChart2 size={18} /> },
    { name: "Summary", path: "/memberSummary", icon: <Grid size={18} /> },
    // { name: "Members", path: "/members", icon: <HomeIcon size={18} /> },
    { name: "Users", path: "/users", icon: <Users size={18} /> },
    { name: "Settings", path: "/setting", icon: <Settings size={18} /> },
  ];

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      // className={`transition-all duration-300 bg-white dark:bg-slate-900/40  shadow-lg backdrop-blur-xl ${
      //   open ? "w-50" : "w-20"
      // } h-px flex flex-col`}
      className={`
        fixed top-0 left-0 z-50
        h-screen
        bg-white dark:bg-slate-900
        shadow-2xl
        transition-all duration-300
        ${open ? "w-55" : "w-20"}
        flex flex-col
      `}
    >
      {/* Logo + Toggle */}
      <div className="p-4 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 ${
            open ? "" : "justify-center w-full"
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
            <img src={MEAL} alt="" className="W-[300PX]" />
          </div>
          {open && (
            <span className="font-semibold text-lg">Meal Management</span>
          )}
        </div>
      </div>

      {/* Menu */}
      {/* <nav className="px-3 mt-4 flex-1">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-4 px-3 py-3 my-3 rounded-xl text-gray-700 dark:text-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all ${
              open ? "" : "justify-center"
            }`}
            href="#"
          >
            {item.icon}
            {open && <span className="font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav> */}
      <nav className="px-3 mt-4 flex-1">
  {menuItems.map((item) => (
    <NavLink
      to={item.path}
      key={item.name}
      className={({ isActive }) =>
        `flex items-center gap-4 px-3 py-3 my-3 rounded-xl transition-all
         ${open ? "" : "justify-center"}
         ${
           isActive
             ? "bg-blue-50 text-blue-600"
             : "text-gray-700 hover:bg-gray-100"
         }`
      }
    >
      {item.icon}
      {open && <span className="font-medium">{item.name}</span>}
    </NavLink>
  ))}
</nav>


      {/* Logout */}
      <div className="p-4 mt-70">
        <button
          className={`w-full flex items-center px-3 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all ${
            open ? "gap-3" : "justify-center"
          }`}
          onClick={handleLogout}
        >
          <LogOut size={18} />
          {open && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
