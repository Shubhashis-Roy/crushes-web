import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../redux/userSlice";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { OnboardingData } from "./OnboardingFlow";
import { BASE_URL } from "../../utils/constants";
import {
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaHeart,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

interface BasicInfoStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const getZodiacSign = (date: string): string => {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const signs = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ];
  for (const { sign, start, end } of signs) {
    if (
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1])
    )
      return sign;
  }
  return "Unknown";
};

const getAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
    age--;
  return age;
};

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData, onNext }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
    password: data.password,
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    interestedIn: data.interestedIn,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formData.dateOfBirth) {
      const age = getAge(formData.dateOfBirth);
      const zodiacSign = getZodiacSign(formData.dateOfBirth);
      updateData({ ...formData, age, zodiacSign });
    } else {
      updateData(formData);
    }
  }, [formData, updateData]);

  const handleInterestedInChange = (option: string) => {
    let newInterestedIn;
    if (option === "Everyone") {
      newInterestedIn = formData.interestedIn.includes("Everyone")
        ? []
        : ["Everyone"];
    } else {
      const filtered = formData.interestedIn.filter((i) => i !== "Everyone");
      newInterestedIn = filtered.includes(option)
        ? filtered.filter((i) => i !== option)
        : [...filtered, option];
    }
    setFormData((prev) => ({ ...prev, interestedIn: newInterestedIn }));
  };

  // ✅ Create account function (signup API)
  const handleCreateAccount = async () => {
    setError("");
    const { email, password, name, dateOfBirth, gender, interestedIn } = formData;

    if (!email || !password || !name || !dateOfBirth || !gender || !interestedIn.length) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          emailId: email,
          password,
          firstName: name,
          lastName: "", // optional
          city: "", // optional for now
          dateOfBirth,
          gender,
          interestedIn,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      localStorage.setItem("onboardingDone", "true");
      console.log("✅ Account created successfully:", res.data.data);

      if (onNext) onNext();
      else navigate("/feed");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data || "Something went wrong, please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = ["Male", "Female", "Non-binary", "Custom"];
  const interestedInOptions = ["Men", "Women", "Everyone"];

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Create your{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            account
          </span>
        </h2>
        <p className="text-white/80 text-base">Let’s get to know you better 💫</p>
      </div>

      {/* Form Fields */}
      <div className="w-full max-w-lg space-y-8 text-left">
        {/* Email */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaEnvelope /> Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaLock /> Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaUser /> Your Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>

        {/* DOB */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaBirthdayCake /> Date of Birth
          </Label>
          <Input
            id="dob"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateOfBirth: e.target.value,
              }))
            }
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
          {formData.dateOfBirth && (
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-xs bg-pink-200/20 text-pink-100 font-medium">
                🎂 {getAge(formData.dateOfBirth)} yrs
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-purple-200/20 text-purple-100 font-medium">
                ✨ {getZodiacSign(formData.dateOfBirth)}
              </span>
            </div>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaVenusMars /> Gender
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((gender) => (
              <Button
                key={gender}
                variant="outline"
                onClick={() => setFormData((prev) => ({ ...prev, gender }))}
                className={`h-12 rounded-full border border-white/30 text-white transition-all backdrop-blur-md ${
                  formData.gender === gender
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                {gender}
              </Button>
            ))}
          </div>
        </div>

        {/* Interested In */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaHeart /> Interested In
          </Label>
          <div className="flex flex-wrap gap-3">
            {interestedInOptions.map((option) => (
              <Button
                key={option}
                variant="outline"
                onClick={() => handleInterestedInChange(option)}
                className={`h-12 px-6 rounded-full border border-white/30 text-white transition-all backdrop-blur-md ${
                  formData.interestedIn.includes(option)
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          {error && <p className="text-red-300 text-sm mb-2">{error}</p>}
          <Button
            onClick={handleCreateAccount}
            disabled={loading}
            className="w-full py-3 font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
          >
            {loading ? "Creating Account..." : "Create Account & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
