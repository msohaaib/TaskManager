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

const navItems = [
  { name: "Dashboard", icon: HomeIcon },
  { name: "All Tasks", icon: ClipboardDocumentListIcon },
  { name: "Completed Tasks", icon: CheckCircleIcon },
  { name: "In Progress Tasks", icon: ClockIcon },
  { name: "Overdue Tasks", icon: ExclamationCircleIcon },
  // Settings removed
];

export default function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <aside className="w-56 bg-gray-800 text-white h-screen flex flex-col p-4 justify-between">
      {/* Top navigation */}
      <div>
        <h1 className="text-2xl font-bold mb-8">TaskManager</h1>
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

      {/* Logout button at bottom */}
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded hover:bg-red-600 transition w-full text-left text-red-500 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
          Logout
        </button>
      </div>
    </aside>
  );
}
