import { useRef, useState } from "react";
import {
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaImages,
} from "react-icons/fa";
import PropTypes from "prop-types";

const menuItems = [

  { label: "Edit Personal Info", icon: <FaEdit /> },
  { label: "Manage Images", icon: <FaImages /> },
  { label: "Delete Account", icon: <FaTrash />, danger: true },
  { label: "Logout", icon: <FaSignOutAlt />, danger: true },
];

const Sidebar = ({ onSelect, selectedLabel }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const listRefs = useRef({});

  const showTooltip = (label) => {
    const rect = listRefs.current[label]?.getBoundingClientRect();
    if (rect) {
      setTooltipPos({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.right + 10,
      });
      setHovered(label);
    }
  };

  const hideTooltip = () => setHovered(null);

  return (
    <>
      <div
        className={`transition-all duration-300 bg-white border-r shadow-md ${
          isOpen ? "w-64 p-4" : "w-16 p-2"
        } flex flex-col max-h-[78vh] rounded-lg m-2 overflow-y-auto`}
      >
        {/* Toggle Button */}
        <div className="flex justify-between items-center mb-4 ps-3">
          {isOpen && (
            <h2 className="text-pink-600 font-bold text-xl">My Area</h2>
          )}
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
              ref={(el) => (listRefs.current[label] = el)}
              onClick={() => onSelect(label)}
              onMouseEnter={() => !isOpen && showTooltip(label)}
              onMouseLeave={hideTooltip}
              className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition hover:bg-pink-100 text-sm ${
                danger ? "text-red-500 hover:bg-red-100" : "text-gray-700"
              } ${selectedLabel === label ? "bg-pink-100 font-semibold" : ""}`}
            >
              <span className="text-lg">{icon}</span>
              {isOpen && <span>{label}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Floating Tooltip */}
      {!isOpen && hovered && (
        <div
          style={{
            position: "absolute",
            top: tooltipPos.top,
            left: tooltipPos.left,
            zIndex: 1000,
            transform: "translateY(-50%)",
          }}
          className="bg-pink-600 text-white text-xs font-medium px-3 py-1  rounded shadow-lg"
        >
          {hovered}
        </div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedLabel: PropTypes.string.isRequired,
};

export default Sidebar;
