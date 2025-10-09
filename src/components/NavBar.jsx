import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL, THEME } from "../utils/constants";
import { removeUser } from "../redux/userSlice";
import { useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isProfilePage = location.pathname === "/profile";
  const isChatPage = location.pathname.startsWith("/chat");
  const isFeedPage = location.pathname === "/";
  const isConnectionsPage = location.pathname === "/connections";
  const isRequestsPage = location.pathname === "/requests";

  // ✅ Updated logout handler
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      localStorage.removeItem("onboardingDone"); // reset onboarding progress
      navigate("/"); // ✅ Go back to Welcome Step (root = OnboardingFlow)
    } catch (err) {
      console.log(err);
    }
  };

  const getItemClasses = (active) =>
    `px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
      active
        ? "bg-white text-pink-700 shadow-md"
        : "text-white/90 hover:text-yellow-300 hover:bg-white/10"
    }`;

  const handleChatNavigate = () => {
    navigate("/chat");
  };

  return (
    <>
      {/* ✅ Header */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 shadow-lg"
        style={{
          background: `linear-gradient(90deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
          fontFamily: THEME.fonts.primary,
        }}
      >
        <div className="max-w-7xl mx-auto px-3 py-3 flex justify-between items-center">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide text-white drop-shadow-md hover:text-yellow-300 transition"
          >
            Cr<span className="text-yellow-300">ushes</span>
          </Link>

          {/* Authenticated User Section */}
          {user && (
            <div className="flex items-center gap-4">
              {/* Chat Icon */}
              {!isConnectionsPage && !isChatPage && (
                <IoChatbubbleEllipsesOutline
                  onClick={handleChatNavigate}
                  className="text-3xl cursor-pointer font-extrabold text-yellow-300 hover:text-pink-200 transition-all duration-300 hover:scale-110"
                />
              )}

              {/* Welcome */}
              <span className="text-sm font-semibold text-white/90 hidden sm:block">
                Hi, {user.firstName}
              </span>

              {/* Avatar Dropdown */}
              <div className="relative group">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-300 shadow-lg cursor-pointer"
                >
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

                {/* Dropdown Menu */}
                <ul
                  className={`absolute right-0 mt-3 w-48 rounded-xl p-3 hidden group-focus-within:flex group-hover:flex flex-col gap-y-2 shadow-2xl border backdrop-blur-xl transition-all duration-300 ${
                    isProfilePage || isChatPage
                      ? "bg-white text-gray-800 border-gray-200"
                      : "bg-white/10 border-white/20 text-white"
                  }`}
                >
                  <li>
                    <Link to="/profile" className={getItemClasses(isProfilePage)}>
                      Profile
                    </Link>
                  </li>

                  {!isFeedPage && (
                    <li>
                      <Link to="/" className={getItemClasses(isFeedPage)}>
                        Discover
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/connections"
                      className={getItemClasses(isConnectionsPage)}
                    >
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/requests"
                      className={getItemClasses(isRequestsPage)}
                    >
                      Requests
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </motion.header>

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
                onClick={() => {
                  setShowLogoutModal(false);
                  handleLogout(); // ✅ Navigate to Welcome
                }}
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

export default NavBar;
