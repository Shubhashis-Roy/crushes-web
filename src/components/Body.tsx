import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import AppFooter from "./Footer";
import axios from "axios";
import { THEME } from "@constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { getCookie } from "@utils/getCookie";
import { motion } from "framer-motion";
import { BASE_URL } from "@services/axios";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile only if token exists
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      if (res?.data) {
        dispatch(addUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch(addUser(JSON.parse(savedUser)));
      setLoading(false);

      // 🚀 Redirect to feed if not already there
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/feed", { replace: true });
      }
      return;
    }

    if (token) {
      fetchUser();
      return;
    }

    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-purple-900 to-pink-700">
        <p className="animate-pulse text-lg font-semibold tracking-wide">
          Loading your experience...
        </p>
      </div>
    );

  const isOnboarding = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const showFullNav = userData && Object.keys(userData).length > 0;
  const showMinimalNav = isOnboarding || isLogin;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🌈 Animated background */}
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

      {/* 🧭 Navbar */}
      {showMinimalNav ? <NavBar showMinimal /> : showFullNav && <NavBar />}

      {/* 📄 Page content */}
      <main>
        <Outlet />
      </main>

      {/* 💖 Footer only visible on onboarding */}
      {isOnboarding && <AppFooter />}
    </div>
  );
};

export default Body;
