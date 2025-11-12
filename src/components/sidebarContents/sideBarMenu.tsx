import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isFeedPage: boolean;
  isProfilePage: boolean;
  isConnectionsPage: boolean;
  isRequestsPage: boolean;
  getItemClasses: (active: boolean) => string;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  isOpen,
  onClose,
  onLogout,
  isFeedPage,
  isProfilePage,
  isConnectionsPage,
  isRequestsPage,
  getItemClasses,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[80]"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#1a082d] to-[#2d1557] text-white shadow-2xl z-[90] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-4 border-b border-white/20">
              <h2 className="text-xl font-bold">
                <span className="text-yellow-300">Your</span> Space
              </h2>
              <IoClose
                onClick={onClose}
                className="text-2xl cursor-pointer hover:text-pink-400 transition"
              />
            </div>

            {/* Links */}
            <ul className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
              <li>
                <Link
                  to="/feed"
                  onClick={onClose}
                  className={getItemClasses(isFeedPage)}
                >
                  Discover
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className={getItemClasses(isProfilePage)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  onClick={onClose}
                  className={getItemClasses(isConnectionsPage)}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  onClick={onClose}
                  className={getItemClasses(isRequestsPage)}
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                >
                  Logout
                </button>
              </li>
            </ul>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-white/10 text-sm text-center text-white/60">
              © {new Date().getFullYear()} Crushes
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SidebarMenu;
