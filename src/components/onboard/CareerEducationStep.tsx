import React, { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { OnboardingData } from "./OnboardingFlow";

interface CareerEducationStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CareerEducationStep: React.FC<CareerEducationStepProps> = ({
  data,
  updateData,
}) => {
  const [formData, setFormData] = useState({
    profession: data.profession,
    company: data.company || "",
    education: data.education,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const educationLevels = [
    "High School",
    "Some College",
    "Bachelor's Degree",
    "Master's Degree",
    "PhD/Doctorate",
    "Trade School",
    "Other",
  ];

  const professionSuggestions = [
    "Student",
    "Engineer",
    "Teacher",
    "Doctor",
    "Designer",
    "Marketing",
    "Finance",
    "Entrepreneur",
    "Artist",
    "Other",
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Career &{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Share your professional journey 💼
        </p>
      </div>

      {/* Form Fields */}
      <div className="w-full max-w-lg space-y-8 text-left">
        {/* Profession */}
        <div className="space-y-3">
          <Label className="text-pink-200 font-medium">
            What do you do?
          </Label>
          <Input
            type="text"
            placeholder="e.g., Software Engineer, Student, Artist"
            value={formData.profession}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, profession: e.target.value }))
            }
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />

          {/* Suggestions */}
          <div className="flex flex-wrap gap-3 mt-2">
            {professionSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, profession: suggestion }))
                }
                className={`px-4 py-2 rounded-full border border-white/30 text-white text-sm transition-all backdrop-blur-md
                ${
                  formData.profession === suggestion
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label className="text-pink-200 font-medium">
            Company / Organization{" "}
            <span className="text-white/60 text-sm">(optional)</span>
          </Label>
          <Input
            type="text"
            placeholder="e.g., Google, Local University, Self-employed"
            value={formData.company}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, company: e.target.value }))
            }
            className="h-12 text-base rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-pink-400 focus:border-pink-400"
          />
        </div>

        {/* Education */}
        <div className="space-y-3">
          <Label className="text-pink-200 font-medium">
            Education Level
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {educationLevels.map((level) => (
              <Button
                key={level}
                variant="outline"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, education: level }))
                }
                className={`h-12 rounded-full border border-white/30 text-white transition-all backdrop-blur-md justify-center
                ${
                  formData.education === level
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerEducationStep;
