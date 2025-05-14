import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import bgImage from "../../public/Dreamy.jpeg";

const Login = () => {
  const [emailId, setEmailId] = useState("shub@gmail.in");
  const [password, setPassword] = useState("Subhashis@9");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {" "}
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/15 z-10"></div>
      {/* Login Card */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="backdrop-blur-xl bg-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg">
            {isLoginForm ? "Welcome Back 💕" : "Create an Account"}
          </h2>

          {!isLoginForm && (
            <>
              <div className="mb-4">
                <label className="text-white text-sm">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full mt-1 bg-transparent border-b border-white/60 text-white placeholder-white/70 focus:outline-none focus:border-pink-400 transition-colors"
                />
              </div>
              <div className="mb-4">
                <label className="text-white text-sm">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full mt-1 bg-transparent border-b border-white/60 text-white placeholder-white/70 focus:outline-none focus:border-pink-400 transition-colors"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="text-white text-sm">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Email"
              className="w-full mt-1 bg-transparent border-b border-white/60 text-white placeholder-white/70 focus:outline-none focus:border-pink-400 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-1 bg-transparent border-b border-white/60 text-white placeholder-white/70 focus:outline-none focus:border-pink-400 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center mb-2">{error}</p>
          )}

   <button
  onClick={isLoginForm ? handleLogin : handleSignUp}
  className="w-full py-2 mt-2 bg-white text-pink-600 font-semibold rounded-lg shadow-md hover:bg-blue-900 hover:text-white transition"
>
  {isLoginForm ? "Login" : "Sign Up"}
</button>

          <p
            className="text-center mt-6 text-white text-sm hover:text-pink-300 transition duration-300 ease-in-out group cursor-pointer"
            onClick={() => setIsLoginForm((val) => !val)}
          >
            <span className="inline-block group-hover:-translate-y-0.5 transition-transform duration-300">
              {isLoginForm ? " New here? " : "👋 Already have an account? "}
              <span className="underline font-semibold">
                {isLoginForm ? "Create an account" : "Log in"}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
