import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { OnboardingData } from './OnboardingFlow';

interface InterestsStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const InterestsStep: React.FC<InterestsStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    hobbies: data.hobbies,
    lifestyle: data.lifestyle,
    personality: data.personality,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const hobbiesOptions = [
    'Music', 'Travel', 'Sports', 'Art', 'Photography', 'Cooking',
    'Reading', 'Gaming', 'Dancing', 'Hiking', 'Yoga', 'Movies',
    'Theater', 'Fashion', 'Technology', 'Writing', 'Swimming', 'Cycling'
  ];

  const lifestyleOptions = [
    'Fitness Enthusiast', 'Foodie', 'Night Owl', 'Early Bird', 'Pet Lover',
    'Social Butterfly', 'Homebody', 'Adventurer', 'Beach Lover', 'City Life',
    'Nature Lover', 'Party Goer', 'Quiet Nights', 'Coffee Addict'
  ];

  const personalityOptions = [
    'Outgoing', 'Introvert', 'Creative', 'Analytical', 'Spontaneous',
    'Organized', 'Funny', 'Romantic', 'Ambitious', 'Laid-back',
    'Empathetic', 'Independent', 'Family-oriented', 'Career-focused'
  ];

  const toggleOption = (category: keyof typeof formData, option: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter(item => item !== option)
        : [...prev[category], option]
    }));
  };

  const ChipSection = ({ 
    title, 
    options, 
    selected, 
    category,
    maxSelection = 10
  }: {
    title: string;
    options: string[];
    selected: string[];
    category: keyof typeof formData;
    maxSelection?: number;
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-sm font-medium">{title}</Label>
        <Badge variant="secondary" className="text-xs">
          {selected.length}/{maxSelection}
        </Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          const canSelect = selected.length < maxSelection;
          
          return (
            <Button
              key={option}
              variant={isSelected ? 'romantic' : 'soft'}
              size="sm"
              onClick={() => toggleOption(category, option)}
              disabled={!isSelected && !canSelect}
              className="h-8 text-xs rounded-full"
            >
              {option}
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-8 shadow-soft bg-gradient-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Interests & Lifestyle</h2>
          <p className="text-muted-foreground">Help others discover what makes you unique</p>
        </div>

        <div className="space-y-8">
          <ChipSection
            title="Hobbies & Interests"
            options={hobbiesOptions}
            selected={formData.hobbies}
            category="hobbies"
            maxSelection={8}
          />

          <ChipSection
            title="Lifestyle"
            options={lifestyleOptions}
            selected={formData.lifestyle}
            category="lifestyle"
            maxSelection={6}
          />

          <ChipSection
            title="Personality Traits"
            options={personalityOptions}
            selected={formData.personality}
            category="personality"
            maxSelection={5}
          />

          <div className="bg-secondary/30 rounded-lg p-4">
            <p className="text-xs text-muted-foreground text-center">
              Select the options that best describe you. These will help us find compatible matches
              and give others a better sense of who you are.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InterestsStep;