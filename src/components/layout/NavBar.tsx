import { useLocation, useNavigate } from "react-router-dom";
import { THEME } from "@constants/colors";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSelector } from "@redux/store";
import Logout from "../auth/Logout";
import ProfileMenu from "@components/sidebarContents/ProfileMenu";
import SidebarMenu from "@components/sidebarContents/sideBarMenu";
import NavRightSection from "@components/sidebarContents/NavRightSection";
import { PATH } from "@constants/path";
import logo from "@assets/logo/logo.png";

const NavBar = ({ showMinimal = false }) => {
  const user = useSelector((store) => store.auth.userDetails);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const profileDetails = useSelector((state) => state.auth.userDetails);

  const isFeedPage =
    location.pathname === PATH.HOME ||
    location.pathname === PATH.FEED ||
    location.pathname.endsWith(PATH.FEED);
  const isProfilePage = location.pathname.includes(PATH.PROFILE);
  const isChatPage = location.pathname.includes(PATH.CHAT);
  const isConnectionsPage = location.pathname.includes(PATH.CONNECTION);
  const isRequestsPage = location.pathname.includes(PATH.REQUEST);
  const isOnboarding = location.pathname === PATH.ONBOARDING;
  const isLogin = location.pathname === PATH.LOGIN;
  const isHome = location.pathname === PATH.HOME;
  const isOnboard = isOnboarding || isLogin || isHome;

  const getItemClasses = (active: boolean) =>
    `block px-4 py-2 rounded-lg transition-all duration-300 text-base font-medium ${
      active
        ? "bg-white text-pink-700 shadow-md"
        : "text-white/90 hover:text-yellow-300 hover:bg-white/10"
    }`;

  const handleManu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleIconNavigation = () => {
    if (isOnboard) {
      navigate(PATH.HOME);
      return;
    }

    navigate(PATH.FEED);
  };

  return (
    <>
      {/* =============== Header =============== */}
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
            {/* <div
              onClick={handleIconNavigation}
              className="text-2xl font-bold tracking-wide text-white drop-shadow-md hover:text-yellow-300 transition cursor-pointer"
            >
              Cr<span className="text-yellow-300">ushes</span>
            </div> */}

            <div
              onClick={handleIconNavigation}
              className="cursor-pointer flex items-center"
            >
              <img
                src={logo}
                alt="Crushes Logo"
                className="h-10 w-auto object-contain drop-shadow-md hover:opacity-80 transition"
              />
            </div>
          </div>

          {/* Right section */}
          {!showMinimal && user && (
            <NavRightSection
              profileDetails={profileDetails}
              isChatPage={isChatPage}
              onMenuToggle={handleManu}
            />
          )}
        </div>
      </motion.header>

      {/* ========= Sidebar ========== */}
      <SidebarMenu
        isOpen={!showMinimal && sidebarOpen && !!user}
        onClose={() => setSidebarOpen(false)}
        onLogout={() => setShowLogoutConfirm(true)}
        isFeedPage={isFeedPage}
        isProfilePage={isProfilePage}
        isConnectionsPage={isConnectionsPage}
        isRequestsPage={isRequestsPage}
        getItemClasses={getItemClasses}
      />

      {/* ================= Logout Modal ================= */}
      {showLogoutConfirm && (
        <Logout setShowLogoutConfirm={setShowLogoutConfirm} />
      )}

      <ProfileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

export default NavBar;
