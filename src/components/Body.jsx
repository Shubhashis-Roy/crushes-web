import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL, THEME } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useEffect } from "react";
import { getCookie } from "../utils/getCookie";
import { motion } from "framer-motion";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res?.data));
    } catch (err) {
      if (err.status === 400) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUser();
    // eslint-disable-next-line
  }, []);

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

      {/* ✨ Subtle glow layers for depth */}
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

      {/* Navigation + Content */}
      <NavBar />
      <main className="pt-10">
        <Outlet />
      </main>

      {/* Footer only on login */}
      {location.pathname === "/login" && <Footer />}
    </div>
  );
};

export default Body;
