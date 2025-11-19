import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
// import AppFooter from "./Footer";
import { THEME } from "@constants/colors";
import { motion } from "framer-motion";

const Body = () => {
  const location = useLocation();

  const isOnboarding = location.pathname === "/onboarding";
  const isLogin = location.pathname === "/login";
  // const showFullNav = userData && Object.keys(userData).length > 0;
  const showFullNav = true;
  const showMinimalNav = isOnboarding || isLogin;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* ============= Animated background ============= */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            `linear-gradient(135deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
            `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.accent}, ${THEME.colors.softAccent})`,
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ============= Navbar ============= */}
      {showMinimalNav ? <NavBar showMinimal /> : showFullNav && <NavBar />}

      {/* ========== Page content ========== */}
      <main>
        <Outlet />
      </main>

      {/* ============ Footer only visible on onboarding ============ */}
      {/* {isOnboarding && <AppFooter />} */}
    </div>
  );
};

export default Body;
