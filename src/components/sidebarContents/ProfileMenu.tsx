import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { PATH } from "@constants/path";
import Logout from "@components/auth/Logout";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const isProfilePage = location.pathname.includes(PATH.PROFILE);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const getItemClasses = (active: boolean) =>
    `block px-3 py-2 rounded-md text-base transition-all duration-300 font-medium ${
      active
        ? "bg-white text-pink-700 shadow-md"
        : "text-white/90 hover:text-yellow-300 hover:bg-white/10"
    }`;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay click closes the menu */}
            <div className="fixed inset-0 z-40" onClick={onClose} />

            {/* Dropdown menu */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-16 z-50 w-52 bg-[#1a0f2b] border border-white/10 rounded-xl shadow-lg p-3"
            >
              {/* Profile item */}
              <NavLink
                to="/profile"
                onClick={onClose}
                className={getItemClasses(isProfilePage)}
              >
                Profile
              </NavLink>

              <div className="border-t border-white/10 my-2"></div>

              {/* Logout button */}
              <button
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
                className="block w-full text-left px-3 py-2 text-red-400 font-medium rounded-md transition-all duration-300 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {showLogoutConfirm && (
        <Logout setShowLogoutConfirm={setShowLogoutConfirm} />
      )}
    </>
  );
};

export default ProfileMenu;
