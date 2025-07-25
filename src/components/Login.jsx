import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";
import { features } from "../schema/HomePageCard.schema";
import RealLoveStories from "./home/RealLoveStories";
import ToastMessage from "./ToastPupUpMessage";

const Login = () => {
  const [emailId, setEmailId] = useState("shub@gmail.in");
  const [password, setPassword] = useState("Subhashis@9");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, city, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-300/60 to-pink-200/60 ">
      <div className="absolute inset-0 bg-[url('https://t4.ftcdn.net/jpg/05/84/66/13/240_F_584661359_CN18OI3yMmh8s154PUZYswxKzZjgLlFd.jpg')] bg-cover bg-center mix-blend-overlay opacity-80 z-0" />

      {!showForm ? (
        <>
          <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-40 pb-20">
            <h1 className="text-white text-5xl sm:text-6xl font-bold mb-4">
              Find Your Perfect <span className="text-pink-300">Match</span>
            </h1>
            <p className="text-white text-lg max-w-2xl mb-10">
              Discover people who share your vibe, your interests, and your
              desire for something meaningful.
            </p>

            <div className="flex justify-center space-x-4 mb-12">
              <button
                className="bg-gradient-to-r from-pink-600 via-red-500 to-red-400 
  text-white text-[24px] font-extrabold py-3 px-8 rounded-full 
  shadow-2xl transform transition-all duration-300 ease-in-out 
  hover:scale-110 hover:-rotate-1 hover:shadow-2xl 
  focus:ring-4 focus:ring-pink-600"
                onClick={() => setShowForm(true)}
              >
                ❤️ Find Love
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/30 shadow-lg text-white text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </div>
              ))}
            </div>
          </main>
          <ToastMessage />
          <RealLoveStories />
        </>
      ) : (
        <main className="relative z-10 flex justify-center px-4 pt-40 pb-20">
          <button
            onClick={() => {
              setShowForm(false);
              setIsLoginForm(true);
              setError("");
            }}
            className=" text-white hover:text-love-light absolute  left-6 top-20"
          >
            ← Back to info
          </button>

          <div className="backdrop-blur bg-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md">
            {/* <h2 className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg">
              {isLoginForm ? "Welcome Back 💕" : "Create an Account"}
            </h2> */}
            <h2 className="text-white text-3xl font-bold text-center mb-2 drop-shadow-lg">
              {isLoginForm ? "Welcome Back 💕" : "Create an Account"}
            </h2>

            {isLoginForm && (
              <p className="text-black text-[16px] font-extrabold text-center mb-4 italic">
                🔐 Pre-filled login is for demo purposes — no signup needed!
              </p>
            )}

            {!isLoginForm && (
              <>
                <InputField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                />
                <InputField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                />
                <InputField
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </>
            )}

            <InputField
              label="Email"
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Email"
              icon="mail"
            />

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              icon="lock"
              showToggle
              toggleValue={
                showPassword ? <EyeOff size={18} /> : <Eye size={18} />
              }
              onToggle={() => setShowPassword((prev) => !prev)}
            />

            {error && (
              <p className="text-red-300 text-sm text-center mt-3">{error}</p>
            )}

            <button
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={loading}
              className="w-full py-3 mt-4 bg-gradient-love text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading
                ? isLoginForm
                  ? "Logging in..."
                  : "Creating account..."
                : isLoginForm
                ? "Login"
                : "Sign Up"}
            </button>

            <p
              className="text-center mt-6 text-white text-sm hover:text-love-light transition duration-300 ease-in-out group cursor-pointer"
              onClick={() => {
                setIsLoginForm((val) => !val);
                setError("");
              }}
            >
              <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-300">
                {isLoginForm ? "New here? " : "Already have an account? "}
                <span className="underline font-semibold">
                  {isLoginForm ? "Create an account" : "Log in"}
                </span>
              </span>
            </p>
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
