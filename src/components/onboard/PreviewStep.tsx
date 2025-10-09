import React from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { MapPin, Briefcase, GraduationCap, Heart, Calendar, Users, Star } from 'lucide-react';
import { OnboardingData } from './OnboardingFlow';

interface PreviewStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PreviewStep: React.FC<PreviewStepProps> = ({ data, onPrev }) => {
  const handleFinish = () => {
    // Here you would typically save the data to backend/database
    alert('Profile created successfully! 🎉');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const mainPhotoUrl = data.photos.length > 0 ? URL.createObjectURL(data.photos[0]) : null;

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Your Profile Preview</h2>
        <p className="text-muted-foreground">This is how other users will see you</p>
      </div>

      {/* Profile Card - Similar to dating app style */}
      <Card className="overflow-hidden shadow-romantic bg-gradient-card">
        {/* Main Photo */}
        <div className="relative h-80 bg-gradient-subtle">
          {mainPhotoUrl ? (
            <img
              src={mainPhotoUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-secondary/30">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl bg-primary/20 text-primary">
                  {getInitials(data.name || 'User')}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
          
          {/* Photo Count Indicator */}
          {data.photos.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              1/{data.photos.length}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="p-6">
          {/* Name, Age, Distance */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">
                {data.name}, {data.age}
              </h3>
              {data.zodiacSign && (
                <p className="text-sm text-muted-foreground">
                  ♑ {data.zodiacSign}
                </p>
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>5 km away</span>
            </div>
          </div>

          {/* Bio */}
          {data.bio && (
            <p className="text-foreground mb-4 leading-relaxed">
              {data.bio}
            </p>
          )}

          {/* Work & Education */}
          <div className="space-y-2 mb-4">
            {data.profession && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>
                  {data.profession}
                  {data.company && ` at ${data.company}`}
                </span>
              </div>
            )}
            
            {data.education && (
              <div className="flex items-center text-sm text-muted-foreground">
                <GraduationCap className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{data.education}</span>
              </div>
            )}
          </div>

          {/* Looking For */}
          {data.lookingFor.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Heart className="w-4 h-4 mr-2" />
                <span>Looking for</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {data.lookingFor.map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {data.hobbies.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Star className="w-4 h-4 mr-2" />
                <span>Interests</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {data.hobbies.slice(0, 6).map((hobby, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {hobby}
                  </Badge>
                ))}
                {data.hobbies.length > 6 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.hobbies.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Age Preferences */}
          <div className="flex items-center text-xs text-muted-foreground">
            <Users className="w-3 h-3 mr-1" />
            <span>
              Interested in {data.interestedIn.join(', ')} • 
              Ages {data.ageRange[0]}-{data.ageRange[1]} • 
              Within {data.distanceRange}km
            </span>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="flex-1"
        >
          Edit Profile
        </Button>
        <Button
          variant="romantic"
          onClick={handleFinish}
          className="flex-1"
        >
          Complete Setup
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        You can always edit your profile later in settings
      </p>
    </div>
  );
};

export default PreviewStep;