import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { THEME } from "@constants/colors";
import { Eye, EyeOff } from "lucide-react";
import InputField from "@components/InputField";
import { motion } from "framer-motion";
import { PATH } from "@constants/path";
import { dispatch } from "@redux/store";
import { login } from "@redux/slices/auth";

const Login = () => {
  const [emailId, setEmailId] = useState("shub@gmail.in");
  const [password, setPassword] = useState("Subhashis@9");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (!emailId || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }
    const res = await dispatch(login({ emailId, password }));

    if (res?._id && res?.firstName) {
      navigate(PATH.FEED);
      setLoading(false);
    } else {
      setError("Invalid login credentials. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      {/* ============== Background Orbs ============== */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-pink-600/25 rounded-full blur-[200px] top-[-7%] left-[-10%] -z-10"
        animate={{ x: [0, 50, 0], y: [0, 80, 0], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-[700px] h-[700px] bg-purple-700/30 rounded-full blur-[220px] bottom-[-15%] right-[-10%] -z-10"
        animate={{ x: [0, -40, 0], y: [0, -100, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* ================== Login Card ================== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg mx-auto px-12 py-12
             bg-white/10 backdrop-blur-2xl border border-white/20
             rounded-3xl shadow-[0_8px_40px_rgba(255,255,255,0.2)]
             flex flex-col items-center"
      >
        <h2 className="text-4xl font-extrabold text-center mb-5 leading-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
          Welcome Back
          <br />
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent text-2xl font-semibold">
            Login to Continue
          </span>
        </h2>

        <p className="text-white/70 text-sm mb-8 text-center italic">
          🔐 Demo credentials are pre-filled — just hit Login!
        </p>

        <div className="w-full max-w-md">
          <InputField
            label="Email"
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="Enter your email"
            icon="mail"
          />
        </div>

        <div className="w-full max-w-md">
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon="lock"
            showToggle
            toggleValue={
              showPassword ? <EyeOff size={18} /> : <Eye size={18} />
            }
            onToggle={() => setShowPassword((prev) => !prev)}
          />
        </div>

        {error && (
          <p className="text-red-300 text-sm text-center mt-4">{error}</p>
        )}

        {/* ================== Button ================== */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full max-w-md mt-8 py-3 text-lg font-semibold rounded-full text-white
               tracking-wide transition-all duration-300 disabled:opacity-50
               hover:shadow-[0_0_25px_rgba(255,128,191,0.5)]"
          style={{
            background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`,
            boxShadow: THEME.shadows.soft,
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* ================== Go to Onboarding ================== */}
        <p className="text-center mt-8 text-sm text-white/75">
          New here?{" "}
          <span
            onClick={() =>
              navigate(PATH.ONBOARDING, { state: { goToWelcome: true } })
            }
            className="underline text-pink-200 font-semibold cursor-pointer hover:text-pink-100 transition"
          >
            Create an account
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
