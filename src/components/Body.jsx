import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL, THEME } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";
import { motion } from "framer-motion";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user if not already loaded
  const fetchUser = async () => {
    try {
      if (userData && Object.keys(userData).length > 0) {
        setLoading(false);
        return;
      }

      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      if (res?.data) {
        dispatch(addUser(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        console.warn("⚠️ No user found → redirecting to onboarding");
        navigate("/");
      }
    } catch (err) {
      console.warn("⚠️ Failed to fetch user profile:", err);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    const savedUser = localStorage.getItem("user");
    const onboardingDone = localStorage.getItem("onboardingDone");

    if (onboardingDone && location.pathname === "/") {
      navigate("/feed");
      setLoading(false);
      return;
    }

    if (savedUser) {
      dispatch(addUser(JSON.parse(savedUser)));
      setLoading(false);
      return;
    }

    if (token) {
      fetchUser();
      return;
    }

    setLoading(false);
    navigate("/"); // first-time user
    // eslint-disable-next-line
  }, []);

  // ✅ Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gradient-to-br from-purple-900 to-pink-700">
        <p className="animate-pulse text-lg font-semibold tracking-wide">
          Loading your experience...
        </p>
      </div>
    );
  }

  // ✅ Detect which pages should show minimal navbar
  const isOnboarding = location.pathname === "/";
  const isLogin = location.pathname === "/login";
  const showFullNav = userData && Object.keys(userData).length > 0;
  const showMinimalNav = isOnboarding || isLogin;

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🌌 Animated Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            `linear-gradient(135deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
            `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.accent}, ${THEME.colors.softAccent})`,
            `linear-gradient(135deg, ${THEME.colors.deep}, ${THEME.colors.primary}, ${THEME.colors.accent})`,
          ],
        }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ✨ Depth Glow Layers */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-pink-700/20 rounded-full blur-[200px] top-[-10%] left-[-10%] -z-10"
        animate={{ x: [0, 60, 0], y: [0, 100, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-purple-900/25 rounded-full blur-[220px] bottom-[-15%] right-[-10%] -z-10"
        animate={{ x: [0, -50, 0], y: [0, -80, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 🧭 Navbar */}
      {showMinimalNav ? (
        <NavBar showMinimal={true} />
      ) : (
        showFullNav && <NavBar />
      )}

      {/* 📄 Page Content */}
      <main>
        <Outlet />
      </main>

      {/* 🚀 Footer (hidden for login/onboarding) */}
      {!showMinimalNav && <Footer />}
    </div>
  );
};

export default Body;
