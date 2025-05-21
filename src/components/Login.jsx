import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";
import InputField from "./InputField";

const Login = () => {
  const [emailId, setEmailId] = useState("shub@gmail.in");
  const [password, setPassword] = useState("Subhashis@9");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        { firstName, lastName, emailId, password },
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

  const features = [
    {
      title: "Meaningful Connections",
      description:
        "Our matching algorithm focuses on compatibility for lasting relationships.",
    },
    {
      title: "Safe Dating",
      description:
        "Verified profiles and secure messaging for a worry-free dating experience.",
    },
    {
      title: "Find Love Anywhere",
      description:
        "Connect with people near you or across the globe based on your preference.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-300/60 to-pink-200/60">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80')] bg-cover bg-center mix-blend-overlay opacity-30 z-0" />

      {!showForm ? (
        <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-40">
          <h1 className="text-white text-5xl sm:text-6xl font-bold mb-4">
            Find Your Perfect <span className="text-pink-300">Match</span>
          </h1>
          <p className="text-white text-lg max-w-2xl mb-10">
            Connect with like-minded individuals who share your interests,
            passions, and values.
          </p>
          <div className="flex space-x-4 mb-12">
            <button
              className="bg-white text-love-DEFAULT font-semibold py-2 px-6 rounded-full shadow hover:scale-105 transition-transform"
              onClick={() => setShowForm(true)}
            >
              Find Love
            </button>
            <button className="border border-white text-white font-semibold py-2 px-6 rounded-full hover:bg-white/10 transition-colors">
              Learn More
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
            <h2 className="text-white text-3xl font-bold text-center mb-6 drop-shadow-lg">
              {isLoginForm ? "Welcome Back 💕" : "Create an Account"}
            </h2>

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
