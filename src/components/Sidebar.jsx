import { useState } from "react";
import {
  FaTimes,
  FaBars,
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaImages,
  FaVideo,
  FaEnvelope,
  FaHeart,
  FaCogs,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const menuItems = [
  { label: "Recommendation", icon: <FaHeart /> },
  { label: "My Match", icon: <FaUser /> },
  { label: "Personal Information", icon: <FaCogs /> },
  { label: "Edit Profile", icon: <FaEdit /> },
  { label: "Change Password", icon: <FaLock /> },
  { label: "My Messages", icon: <FaEnvelope /> },
  { label: "Manage Images", icon: <FaImages /> },
  { label: "Manage Videos", icon: <FaVideo /> },
  { label: "Delete Account", icon: <FaTrash />, danger: true },
  { label: "Logout", icon: <FaSignOutAlt />, danger: true },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`transition-all duration-300 bg-white border-r shadow-md ${
        isOpen ? "w-64 p-4" : "w-16 p-2"
      } flex flex-col max-h-[78vh] rounded-lg m-2 overflow-y-auto`}
    >
      {/* Toggle Button */}
      <div className="flex justify-between items-center mb-4 ps-1">
        {isOpen && <h2 className="text-pink-600 font-bold text-xl">My Area</h2>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-pink-600 text-xl hover:text-pink-800 transition"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-2 flex-1">
        {menuItems.map(({ label, icon, danger }) => (
          <li
            key={label}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:bg-pink-100 text-sm ${
              danger ? "text-red-500 hover:bg-red-100" : "text-gray-700"
            }`}
          >
            <span className="text-lg">{icon}</span>
            {isOpen && <span>{label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
