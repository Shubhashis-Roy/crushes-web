import React, { useState, useEffect } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { OnboardingData } from "./OnboardingFlow";

interface InterestsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    hobbies: data.hobbies || [],
    lifestyle: data.lifestyle || [],
    personality: data.personality || [],
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const hobbiesOptions = [
    "Music", "Travel", "Sports", "Art", "Photography", "Cooking",
    "Reading", "Gaming", "Dancing", "Hiking", "Yoga", "Movies",
    "Theater", "Fashion", "Technology", "Writing", "Swimming", "Cycling",
  ];

  const lifestyleOptions = [
    "Fitness Enthusiast", "Foodie", "Night Owl", "Early Bird", "Pet Lover",
    "Social Butterfly", "Homebody", "Adventurer", "Beach Lover", "City Life",
    "Nature Lover", "Party Goer", "Quiet Nights", "Coffee Addict",
  ];

  const personalityOptions = [
    "Outgoing", "Introvert", "Creative", "Analytical", "Spontaneous",
    "Organized", "Funny", "Romantic", "Ambitious", "Laid-back",
    "Empathetic", "Independent", "Family-oriented", "Career-focused",
  ];

  // ✅ Selection toggle (same logic as BasicInfo)
  const toggleOption = (category: keyof typeof formData, option: string) => {
    setFormData((prev) => {
      const selected = prev[category];
      const isSelected = selected.includes(option);
      return {
        ...prev,
        [category]: isSelected
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    });
  };

  // ✅ Shared reusable section component
  const Section = ({
    title,
    options,
    selected,
    category,
  }: {
    title: string;
    options: string[];
    selected: string[];
    category: keyof typeof formData;
  }) => (
    <div className="space-y-3">
      <Label className="text-pink-200 font-medium">{title}</Label>
      <div className="flex flex-wrap gap-3 mt-2">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            size="sm"
            onClick={() => toggleOption(category, option)}
            className={`px-5 py-2 rounded-full border border-white/30 text-white text-sm transition-all backdrop-blur-md
              ${
                selected.includes(option)
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                  : "hover:bg-white/10"
              }`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4 pt-24">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Vibe
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Share your passions, lifestyle, and personality ✨
        </p>
      </div>

      {/* Selection Sections */}
      <div className="w-full max-w-2xl text-left space-y-10">
        <Section
          title="Hobbies & Interests"
          options={hobbiesOptions}
          selected={formData.hobbies}
          category="hobbies"
        />
        <Section
          title="Lifestyle"
          options={lifestyleOptions}
          selected={formData.lifestyle}
          category="lifestyle"
        />
        <Section
          title="Personality Traits"
          options={personalityOptions}
          selected={formData.personality}
          category="personality"
        />

        {/* Info Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center text-white/70 text-sm shadow-sm">
          Select the options that best describe you — they’ll help others
          understand your vibe and find better matches 💞
        </div>
      </div>
    </div>
  );
};

export default InterestsStep;
