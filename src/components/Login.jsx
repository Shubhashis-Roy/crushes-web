import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL, THEME } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";
import { motion } from "framer-motion";

const Login = () => {
  const [emailId, setEmailId] = useState("shub@gmail.in");
  const [password, setPassword] = useState("Subhashis@9");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ LOGIN FUNCTION
  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      localStorage.setItem("onboardingDone", "true");
      navigate("/feed");
    } catch (err) {
      console.error("Login failed:", err);
      setError(
        err?.response?.data || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white"
      style={{
        background: THEME.colors.backgroundGradient,
        fontFamily: THEME.fonts.primary,
      }}
    >
      {/* 🌈 Animated glow layers */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-pink-600/25 rounded-full blur-[200px] top-[-10%] left-[-10%] -z-10"
        animate={{ x: [0, 50, 0], y: [0, 80, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-purple-700/30 rounded-full blur-[220px] bottom-[-15%] right-[-10%] -z-10"
        animate={{ x: [0, -40, 0], y: [0, -100, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* 💫 Login Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-auto px-8 py-10
                   bg-white/10 backdrop-blur-xl border border-white/20
                   rounded-2xl shadow-[0_8px_32px_rgba(255,255,255,0.2)]
                   flex flex-col items-center"
      >
        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-4 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Welcome Back
          <br />
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Login to Continue
          </span>
        </h2>

        <p className="text-white/70 text-sm mb-6 text-center italic">
          🔐 Demo credentials are pre-filled — just hit Login!
        </p>

        {/* ✉️ Email */}
        <InputField
          label="Email"
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Enter your email"
          icon="mail"
        />

        {/* 🔒 Password */}
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          icon="lock"
          showToggle
          toggleValue={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onToggle={() => setShowPassword((prev) => !prev)}
        />

        {/* ⚠️ Error */}
        {error && (
          <p className="text-red-300 text-sm text-center mt-3">{error}</p>
        )}

        {/* 🚀 Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 py-3 font-semibold rounded-full text-white 
                     transition-all duration-300 disabled:opacity-50 
                     shadow-lg hover:shadow-pink-400/40"
          style={{
            background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`,
            boxShadow: THEME.shadows.soft,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* 🔄 Back to Onboarding */}
        <p className="text-center mt-6 text-sm text-white/80">
          New here?{" "}
          <span
            onClick={() => navigate("/")}
            className="underline text-pink-200 font-semibold cursor-pointer hover:text-pink-100"
          >
            Go to Onboarding
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
