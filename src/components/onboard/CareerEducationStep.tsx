import React, { useState, useEffect } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { OnboardingData } from './OnboardingFlow';

interface CareerEducationStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CareerEducationStep: React.FC<CareerEducationStepProps> = ({ data, updateData }) => {
  const [formData, setFormData] = useState({
    profession: data.profession,
    company: data.company || '',
    education: data.education,
  });

  useEffect(() => {
    updateData(formData);
  }, [formData, updateData]);

  const educationLevels = [
    'High School',
    'Some College',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Trade School',
    'Other'
  ];

  const professionSuggestions = [
    'Student',
    'Engineer',
    'Teacher',
    'Doctor',
    'Designer',
    'Marketing',
    'Finance',
    'Entrepreneur',
    'Artist',
    'Other'
  ];

  return (
    <div className="max-w-lg mx-auto">
      <Card className="p-8 shadow-soft bg-gradient-card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Career & Education</h2>
          <p className="text-muted-foreground">Share your professional journey</p>
        </div>

        <div className="space-y-6">
          {/* Profession */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What do you do?</Label>
            <Input
              type="text"
              placeholder="e.g., Software Engineer, Student, Artist"
              value={formData.profession}
              onChange={(e) => setFormData(prev => ({ ...prev, profession: e.target.value }))}
              className="h-12 text-base"
            />
            
            {/* Profession Suggestions */}
            <div className="grid grid-cols-2 gap-2">
              {professionSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, profession: suggestion }))}
                  className="h-8 text-xs hover:bg-secondary/50"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm font-medium">
              Company/Organization <span className="text-muted-foreground">(Optional)</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="e.g., Google, Local University, Self-employed"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="h-12 text-base"
            />
          </div>

          {/* Education */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Education Level</Label>
            <div className="grid grid-cols-1 gap-3">
              {educationLevels.map((level) => (
                <Button
                  key={level}
                  variant={formData.education === level ? 'romantic' : 'soft'}
                  onClick={() => setFormData(prev => ({ ...prev, education: level }))}
                  className="h-12 text-base justify-start"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CareerEducationStep;