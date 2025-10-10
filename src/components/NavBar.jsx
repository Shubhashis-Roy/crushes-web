import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, THEME } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import { useState } from "react";
import { IoChatbubbleEllipsesOutline, IoMenu, IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = ({ showMinimal = false }) => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(removeUser());
      localStorage.clear();
      document.cookie =
        "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
      navigate("/");
    }
  };

  const isFeedPage =
    location.pathname === "/" ||
    location.pathname === "/feed" ||
    location.pathname.endsWith("/feed");
  const isProfilePage = location.pathname.includes("/profile");
  const isChatPage = location.pathname.includes("/chat");
  const isConnectionsPage = location.pathname.includes("/connections");
  const isRequestsPage = location.pathname.includes("/requests");

  const getItemClasses = (active) =>
    `block px-4 py-2 rounded-lg transition-all duration-300 text-base font-medium ${
      active
        ? "bg-white text-pink-700 shadow-md"
        : "text-white/90 hover:text-yellow-300 hover:bg-white/10"
    }`;

  const handleChatNavigate = () => navigate("/chat");

  return (
    <>
      {/* ✅ Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 shadow-lg"
        style={{
          background: showMinimal
            ? "linear-gradient(to right, rgba(40,10,70,0.4), rgba(90,20,140,0.4))"
            : `linear-gradient(90deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
          fontFamily: THEME.fonts.primary,
          backdropFilter: showMinimal ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
          {/* Left section: Brand + optional hamburger */}
          <div className="flex items-center gap-3">
            {!showMinimal && user && user.firstName && (
              <IoMenu
                onClick={() => setSidebarOpen(true)}
                className="text-3xl text-white cursor-pointer hover:text-yellow-300 transition-all"
              />
            )}
            <Link
              to="/feed"
              className="text-2xl font-bold tracking-wide text-white drop-shadow-md hover:text-yellow-300 transition"
            >
              Cr<span className="text-yellow-300">ushes</span>
            </Link>
          </div>

          {/* Right section (only if full mode) */}
          {!showMinimal && user && user.firstName && (
            <div className="flex items-center gap-4">
              {!isChatPage && (
                <IoChatbubbleEllipsesOutline
                  onClick={handleChatNavigate}
                  className="text-3xl cursor-pointer font-extrabold text-yellow-300 hover:text-pink-200 transition-all duration-300 hover:scale-110"
                />
              )}
              <span className="text-sm font-semibold text-white/90 hidden sm:block">
                Hi, {user.firstName?.toUpperCase()}
              </span>
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-300 shadow-lg cursor-pointer">
                <img
                  src={
                    Array.isArray(user.photoUrl)
                      ? user.photoUrl[0]
                      : user.photoUrl
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* ✅ Sidebar */}
      <AnimatePresence>
        {!showMinimal && sidebarOpen && user && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-[80]"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              key="sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-[#1a082d] to-[#2d1557] text-white shadow-2xl z-[90] flex flex-col justify-between"
            >
              <div className="flex justify-between items-center px-5 py-4 border-b border-white/20">
                <h2 className="text-xl font-bold">
                  <span className="text-yellow-300">Your</span> Space
                </h2>
                <IoClose
                  onClick={() => setSidebarOpen(false)}
                  className="text-2xl cursor-pointer hover:text-pink-400 transition"
                />
              </div>

              <ul className="flex-1 px-4 py-6 space-y-3 overflow-y-auto">
                <li>
                  <Link
                    to="/feed"
                    onClick={() => setSidebarOpen(false)}
                    className={getItemClasses(isFeedPage)}
                  >
                    Discover
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setSidebarOpen(false)}
                    className={getItemClasses(isProfilePage)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    onClick={() => setSidebarOpen(false)}
                    className={getItemClasses(isConnectionsPage)}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    onClick={() => setSidebarOpen(false)}
                    className={getItemClasses(isRequestsPage)}
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>

              <div className="px-5 py-4 border-t border-white/10 text-sm text-center text-white/60">
                © {new Date().getFullYear()} Crushes
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ✅ Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[999] flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-80"
          >
            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

NavBar.propTypes = {
  showMinimal: PropTypes.bool,
};

export default NavBar;
