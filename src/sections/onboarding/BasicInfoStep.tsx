import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaHeart,
  FaEnvelope,
  FaLock,
  FaCity,
} from "react-icons/fa";
import { getAge } from "@utils/age";
import { getZodiacSign } from "@utils/zodiaSing";

interface BasicInfoStepProps {
  data: OnboardingDataTypes;
  updateData: (data: Partial<OnboardingDataTypes>) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    email: data.email,
    password: data.password,
    city: data.city || "",
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    interestedIn: data.interestedIn,
  });

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

  const genderOptions = ["Male", "Female", "Non-binary", "Custom", "Other"];
  const interestedInOptions = ["Men", "Women", "Everyone"];

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Create your{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            account
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Let’s get to know you better 💫
        </p>
      </div>

      {/* Form */}

      <div className="w-full max-w-lg space-y-8 text-left">
        {/* Name */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaUser /> Your Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>

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
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
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

        {/* City */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-pink-200 font-medium">
            <FaCity /> City
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, city: e.target.value }))
            }
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
      </div>
    </div>
  );
};

export default BasicInfoStep;
