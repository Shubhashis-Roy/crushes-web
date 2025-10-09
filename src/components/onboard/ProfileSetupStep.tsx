import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { Upload, X, Camera } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface ProfileSetupStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({ data, updateData }) => {
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
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...files].slice(0, 6) // Max 6 photos
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const bioSuggestions = [
    "Adventure seeker who loves hiking and trying new cuisines 🌟",
    "Coffee enthusiast, book lover, and weekend explorer ☕",
    "Fitness lover by day, Netflix binger by night 🏋️‍♀️",
    "Dog parent looking for someone to share life's adventures 🐕",
  ];

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-8 shadow-soft bg-gradient-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Create Your Profile</h2>
          <p className="text-muted-foreground">Show your best self to potential matches</p>
        </div>

        <div className="space-y-8">
          {/* Photo Upload */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Photos (1-6 required)</Label>
            
            <div className="grid grid-cols-3 gap-4">
              {/* Existing Photos */}
              {formData.photos.map((photo, index) => (
                <div key={index} className="relative aspect-square">
                  <div className="w-full h-full bg-gradient-subtle rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 h-6 w-6 rounded-full"
                      onClick={() => removePhoto(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Main
                    </div>
                  )}
                </div>
              ))}
              
              {/* Upload Slots */}
              {Array.from({ length: Math.max(1, 6 - formData.photos.length) }, (_, index) => (
                <label
                  key={`upload-${index}`}
                  className="aspect-square cursor-pointer"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    multiple={false}
                  />
                  <div className="w-full h-full bg-secondary/30 rounded-lg border-2 border-dashed border-secondary hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-muted-foreground hover:text-primary">
                    <Camera className="w-6 h-6 mb-2" />
                    <span className="text-xs text-center">
                      {formData.photos.length === 0 ? 'Main Photo' : `Photo ${formData.photos.length + 1}`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground">
              Your first photo will be your main profile picture. Add up to 6 photos to show your personality.
            </p>
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <Label htmlFor="bio" className="text-sm font-medium">
              Write a short bio (max 200 characters)
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell potential matches about yourself..."
              value={formData.bio}
              onChange={(e) => {
                const text = e.target.value.slice(0, 200);
                setFormData(prev => ({ ...prev, bio: text }));
              }}
              className="min-h-[100px] text-base resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                {formData.bio.length}/200 characters
              </span>
            </div>
            
            {/* Bio Suggestions */}
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground">Need inspiration?</Label>
              <div className="space-y-2">
                {bioSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => setFormData(prev => ({ ...prev, bio: suggestion }))}
                    className="h-auto p-2 text-xs text-left justify-start hover:bg-secondary/50 whitespace-normal"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSetupStep;