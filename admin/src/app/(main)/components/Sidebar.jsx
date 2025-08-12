"use client";

import { useState } from "react";

import { TiBook } from "react-icons/ti";
import { IoSearch, IoSunny, IoAnalyticsOutline } from "react-icons/io5";
import { LuLogOut, LuUsersRound } from "react-icons/lu";
import { MdInventory2, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaFeatherAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [lightMode, setLightMode] = useState(false);
  const router = useRouter();

  const navItems = [
    {
      icon: <MdOutlineSpaceDashboard size={20} />,
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <TiBook size={20} />,
      text: "Courses",
      path: "/courses",
    },
    {
      icon: <LuUsersRound size={20} />,
      text: "Enrolled Students",
      path: "/enrolled-students",
    },
    {
      icon: <IoAnalyticsOutline size={20} />,
      text: "Analytics",
      path: "/analytics",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-[72px]"
      } bg-black border-r border-gray-800 flex flex-col`}
    >
      <div className="p-4 flex items-center">
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="p-2 rounded-lg bg-purple-900 bg-opacity-50 text-purple-300 flex-shrink-0"
        >
          <FaFeatherAlt size={22} />
        </button>
        <div
          className={`overflow-hidden transition-all duration-200 ${
            expanded ? "w-32 ml-3" : "w-0"
          }`}
        >
          <h1 className="font-bold text-base text-white whitespace-nowrap">
            E-learning
          </h1>
          <p className="text-xs text-gray-400 whitespace-nowrap">
            admin@gmail.com
          </p>
        </div>
      </div>

      <div
        className={`mx-4 my-2 transition-all duration-300 ${
          !expanded ? "mx-auto" : ""
        }`}
      >
        <div
          className={`relative flex items-center bg-gray-800 rounded-lg ${
            !expanded ? "w-10 h-10 justify-center" : "px-3 py-2"
          }`}
        >
          <IoSearch
            className={`transition-all duration-300 ${
              expanded ? "text-gray-400" : "text-purple-300"
            }`}
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className={`flex-1 bg-transparent text-white placeholder-gray-500 outline-none transition-all duration-200 ${
              expanded ? "w-full ml-3 opacity-100" : "w-0 opacity-0"
            }`}
          />
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="relative flex items-center py-2.5 px-3 rounded-md cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-purple-300 transition-colors group"
              >
                {item.icon}
                <span
                  className={`overflow-hidden transition-all duration-200 ${
                    expanded ? "w-40 ml-4" : "w-0"
                  }`}
                >
                  {item.text}
                </span>
                {!expanded && (
                  <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-purple-900 text-purple-300 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                    {item.text}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-800 p-3">
        <div
          className="relative flex items-center py-2.5 px-3 rounded-md cursor-pointer text-gray-400 hover:bg-gray-800 hover:text-purple-300 transition-colors group"
          onClick={handleLogout}
        >
          <LuLogOut size={20} />
          <span
            className={`overflow-hidden transition-all duration-200 ${
              expanded ? "w-40 ml-4" : "w-0"
            }`}
          >
            Logout
          </span>
          {!expanded && (
            <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-purple-900 text-purple-300 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
              Logout
            </div>
          )}
        </div>

        <div
          className={`flex items-center rounded-md text-gray-400 py-2.5 px-3 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center">
            <IoSunny size={20} />
            <span
              className={`overflow-hidden transition-all duration-200 ${
                expanded ? "w-24 ml-4" : "w-0"
              }`}
            >
              Light mode
            </span>
          </div>
          <div
            onClick={() => setLightMode((curr) => !curr)}
            className={`w-12 h-6 flex items-center bg-gray-800 rounded-full p-1 cursor-pointer transition-all duration-300 ${
              !expanded ? "w-10 h-10 justify-center" : ""
            }`}
          >
            <div
              className={`w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full shadow-md transform duration-300 ease-in-out ${
                lightMode ? "translate-x-5" : ""
              } ${!expanded ? "w-8 h-8" : ""}`}
            >
              <IoSunny size={14} />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
