import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  ArrowRightOnRectangleIcon, // logout icon
} from "@heroicons/react/24/outline";
import { logout } from "../auth.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const navItems = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "All Tasks", icon: ClipboardDocumentListIcon },
  { name: "Completed Tasks", icon: CheckCircleIcon },
  { name: "In Progress Tasks", icon: ClockIcon },
  { name: "Overdue Tasks", icon: ExclamationCircleIcon },
  { name: "Pending Tasks", icon: QuestionMarkCircleIcon },
];

export default function Sidebar({ active, setActive, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* Mobile top bar toggle */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">TaskManager</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen p-4 flex flex-col justify-between fixed top-0 left-0 z-20 w-56 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:w-56`}
      >
        <div>
          <h1 className="text-2xl font-bold mb-8 hidden md:block">
            TaskManager
          </h1>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition w-full text-left ${
                  active === item.name ? "bg-gray-700" : ""
                }`}
                onClick={() => setActive(item.name)}
              >
                <Icon className="w-6 h-6" />
                {item.name}
              </button>
            );
          })}
        </div>

        <div>
          <button
            onClick={onLogout || handleLogout}
            className="flex items-center gap-3 p-2 rounded hover:bg-red-600 transition w-full text-left text-red-500 hover:text-white"
          >
            <ArrowRightOnRectangleIcon className="w-6 h-6" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
