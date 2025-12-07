import React, { useState, useEffect, useRef } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";

interface PreferencesStepProps {
  data: OnboardingDataTypes;
  updateData: (data: Partial<OnboardingDataTypes>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({
  data,
  updateData,
}) => {
  const [formData, setFormData] = useState({
    lookingFor: data.lookingFor || [],
    ageRange: data.ageRange || [18, 35],
    distanceRange: data.distanceRange || 50,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const lookingForOptions = [
    { value: "long-term", label: "Long-term 💕" },
    { value: "short-term", label: "Short-term 🌸" },
    { value: "casual", label: "Casual ☕" },
    { value: "friendship", label: "Friends 🤝" },
    { value: "networking", label: "Networking 💼" },
  ];

  const toggleLookingFor = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter((v) => v !== value)
        : [...prev.lookingFor, value],
    }));
  };

  // Single-value gradient slider (for distance)
  const GradientSlider = ({
    label,
    min,
    max,
    step,
    value,
    onChange,
    suffix = "",
  }: {
    label: string;
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (val: number) => void;
    suffix?: string;
  }) => {
    const barRef = useRef<HTMLDivElement>(null);

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pos = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const percent = pos / rect.width;
      const newValue = Math.round(min + percent * (max - min));
      onChange(newValue);
    };

    return (
      <div className="space-y-3">
        <Label className="text-pink-200 font-medium">{label}</Label>
        <div className="flex justify-between text-white/70 text-sm mb-1">
          <span>{`${min}${suffix}`}</span>
          <span>{`${value}${suffix}`}</span>
        </div>

        <div
          ref={barRef}
          onMouseDown={(e) => {
            handleDrag(e);
            const move = (m: MouseEvent) => handleDrag(m as any);
            const stop = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", stop);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", stop);
          }}
          className="relative h-3 w-full rounded-full bg-white/10 cursor-pointer"
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 transition-all"
            style={{ width: `${((value - min) / (max - min)) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{min}</span>
          <span>{`${max}${suffix}`}</span>
        </div>
      </div>
    );
  };

  // Range gradient slider (for age range)
  const RangeSlider = ({
    label,
    min,
    max,
    values,
    onChange,
  }: {
    label: string;
    min: number;
    max: number;
    values: [number, number];
    onChange: (v: [number, number]) => void;
  }) => {
    const barRef = useRef<HTMLDivElement>(null);

    const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = barRef.current?.getBoundingClientRect();
      if (!rect) return;
      const pos = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
      const percent = pos / rect.width;
      const val = Math.round(min + percent * (max - min));
      const [a, b] = values;
      if (Math.abs(val - a) < Math.abs(val - b)) onChange([val, b]);
      else onChange([a, val]);
    };

    const left = ((values[0] - min) / (max - min)) * 100;
    const right = ((values[1] - min) / (max - min)) * 100;

    return (
      <div className="space-y-3">
        <Label className="text-pink-200 font-medium">{label}</Label>
        <div className="flex justify-between text-white/70 text-sm mb-1">
          <span>{values[0]} yrs</span>
          <span>{values[1]} yrs</span>
        </div>

        <div
          ref={barRef}
          onMouseDown={(e) => {
            handleDrag(e);
            const move = (m: MouseEvent) => handleDrag(m as any);
            const stop = () => {
              window.removeEventListener("mousemove", move);
              window.removeEventListener("mouseup", stop);
            };
            window.addEventListener("mousemove", move);
            window.addEventListener("mouseup", stop);
          }}
          className="relative h-3 w-full rounded-full bg-white/10 cursor-pointer"
        >
          <div
            className="absolute top-0 h-full rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500"
            style={{ left: `${left}%`, width: `${right - left}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>{min}</span>
          <span>{max}+</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center text-center px-4">
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white">
          Your{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Preferences
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Let us know what suits you best 💫
        </p>
      </div>

      <div className="w-full max-w-lg space-y-10 text-left">
        {/* Looking For */}
        <div className="space-y-3">
          <Label className="text-pink-200 font-medium">
            What are you looking for?
          </Label>
          <div className="flex flex-wrap gap-3">
            {lookingForOptions.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                onClick={() => toggleLookingFor(opt.value)}
                className={`px-4 py-2 rounded-full border border-white/30 text-white text-sm backdrop-blur-md transition-all ${
                  formData.lookingFor.includes(opt.value)
                    ? "bg-gradient-to-r from-pink-400 to-purple-500 shadow-lg scale-105"
                    : "hover:bg-white/10"
                }`}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <RangeSlider
          label="Preferred Age Range"
          min={18}
          max={65}
          values={formData.ageRange}
          onChange={(v) => setFormData((p) => ({ ...p, ageRange: v }))}
        />

        {/* Distance */}
        <GradientSlider
          label="Maximum Distance"
          min={5}
          max={200}
          step={5}
          value={formData.distanceRange}
          suffix=" km"
          onChange={(v) => setFormData((p) => ({ ...p, distanceRange: v }))}
        />

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center text-white/80 text-sm">
          🌟 You can adjust these preferences anytime later.
        </div>
      </div>
    </div>
  );
};

export default PreferencesStep;
