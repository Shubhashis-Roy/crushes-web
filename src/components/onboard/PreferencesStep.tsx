import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Slider } from '../../components/ui/slider';
import { OnboardingData } from './OnboardingFlow';

interface PreferencesStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PreferencesStep: React.FC<PreferencesStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    lookingFor: data.lookingFor,
    ageRange: data.ageRange,
    distanceRange: data.distanceRange,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const lookingForOptions = [
    { value: 'long-term', label: 'Long-term Relationship', emoji: '💕' },
    { value: 'short-term', label: 'Short-term Dating', emoji: '🌸' },
    { value: 'casual', label: 'Casual Hangouts', emoji: '☕' },
    { value: 'friendship', label: 'New Friends', emoji: '🤝' },
    { value: 'networking', label: 'Professional Networking', emoji: '💼' },
  ];

  const toggleLookingFor = (value: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter(item => item !== value)
        : [...prev.lookingFor, value]
    }));
  };

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-8 shadow-soft bg-gradient-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Preferences</h2>
          <p className="text-muted-foreground">Let us know what you're looking for</p>
        </div>

        <div className="space-y-8">
          {/* What are you looking for */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">What are you looking for?</Label>
            <div className="space-y-3">
              {lookingForOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={formData.lookingFor.includes(option.value) ? 'romantic' : 'soft'}
                  onClick={() => toggleLookingFor(option.value)}
                  className="w-full h-12 justify-start text-base"
                >
                  <span className="mr-3">{option.emoji}</span>
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Age Range</Label>
              <span className="text-sm text-muted-foreground">
                {formData.ageRange[0]} - {formData.ageRange[1]} years
              </span>
            </div>
            
            <div className="px-4 py-6">
              <Slider
                value={formData.ageRange}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  ageRange: value as [number, number] 
                }))}
                min={18}
                max={65}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>18</span>
                <span>65</span>
              </div>
            </div>
          </div>

          {/* Distance Range */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Maximum Distance</Label>
              <span className="text-sm text-muted-foreground">
                {formData.distanceRange === 200 ? '200+ km' : `${formData.distanceRange} km`}
              </span>
            </div>
            
            <div className="px-4 py-6">
              <Slider
                value={[formData.distanceRange]}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  distanceRange: value[0] 
                }))}
                min={5}
                max={200}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>5 km</span>
                <span>200+ km</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              You can adjust these preferences anytime in your settings. We'll use them to 
              show you the most relevant matches.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesStep;