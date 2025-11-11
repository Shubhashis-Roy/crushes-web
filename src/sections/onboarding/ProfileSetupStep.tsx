import React, { useState, useEffect } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { X, Camera } from "lucide-react";

interface ProfileSetupStepProps {
  data: OnboardingDataTypes;
  updateData: (data: Partial<OnboardingDataTypes>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({
  data,
  updateData,
}) => {
  const [formData, setFormData] = useState({
    photos: data.photos,
    bio: data.bio,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...files].slice(0, 6), // Max 6 photos
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const bioSuggestions = [
    "Adventure seeker who loves hiking and trying new cuisines 🌟",
    "Coffee enthusiast, book lover, and weekend explorer ☕",
    "Fitness lover by day, Netflix binger by night 🏋️‍♀️",
    "Dog parent looking for someone to share life's adventures 🐕",
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-4">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold mb-3 text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]">
          Create Your{" "}
          <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Profile
          </span>
        </h2>
        <p className="text-white/80 text-base">
          Show your best self to potential matches ✨
        </p>
      </div>

      {/* Content */}
      <div className="w-full max-w-2xl text-left space-y-10">
        {/* 📸 Photo Upload */}
        <div className="space-y-4">
          <Label className="text-pink-200 font-medium text-lg">
            Photos (1–6 required)
          </Label>

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
            {/* Existing Photos */}
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square group">
                <div className="w-full h-full rounded-xl overflow-hidden border border-white/30 bg-white/10 backdrop-blur-md shadow-md transition-transform duration-300 group-hover:scale-[1.03] group-hover:shadow-pink-200/40">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-pink-500 hover:bg-pink-600"
                    onClick={() => removePhoto(index)}
                  >
                    <X className="w-3 h-3 text-white" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded-full shadow">
                    Main
                  </div>
                )}
              </div>
            ))}

            {/* Upload Slots */}
            {Array.from(
              { length: Math.max(1, 6 - formData.photos.length) },
              (_, index) => (
                <label
                  key={`upload-${index}`}
                  className="aspect-square cursor-pointer rounded-xl bg-white/10 border border-dashed border-white/30 flex flex-col items-center justify-center text-white/60 hover:bg-white/15 hover:border-pink-300 transition-all backdrop-blur-md"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    multiple={false}
                  />
                  <Camera className="w-6 h-6 mb-2 text-pink-200" />
                  <span className="text-xs">
                    {formData.photos.length === 0
                      ? "Main Photo"
                      : `Photo ${formData.photos.length + 1}`}
                  </span>
                </label>
              )
            )}
          </div>

          <p className="text-xs text-white/70 mt-1">
            Your first photo will be your main profile picture. Add up to 6
            photos to show your personality.
          </p>
        </div>

        {/* 📝 Bio Section */}
        <div className="space-y-3">
          <Label
            htmlFor="bio"
            className="text-pink-200 font-medium text-lg tracking-wide"
          >
            Write a short bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell potential matches about yourself..."
            value={formData.bio}
            onChange={(e) => {
              const text = e.target.value.slice(0, 200);
              setFormData((prev) => ({ ...prev, bio: text }));
            }}
            className="min-h-[100px] text-base resize-none rounded-2xl bg-white/10 text-white border-white/20 placeholder-white/50 focus:ring-pink-400 focus:border-pink-400 backdrop-blur-md"
          />
          <div className="flex justify-between items-center text-sm text-white/70">
            <span>{formData.bio.length}/200 characters</span>
          </div>

          {/* 🌷 Bio Suggestions */}
          <div className="space-y-2 mt-4">
            <Label className="text-xs text-pink-200 font-medium">
              Need inspiration?
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {bioSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, bio: suggestion }))
                  }
                  className="text-left justify-start whitespace-normal px-4 p-8 rounded-xl border border-white/30 text-white/80 text-sm hover:bg-pink-400/20 transition-all backdrop-blur-sm"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupStep;
