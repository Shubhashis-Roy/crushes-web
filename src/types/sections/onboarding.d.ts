declare interface OnboardingDataTypes {
  name: string;
  email: string;
  password: string;
  city: string;
  dateOfBirth: string;
  age?: number;
  zodiacSign?: string;
  gender: string;
  interestedIn: string[];
  profession: string;
  company?: string;
  education: string;
  photos: File[];
  bio: string;
  hobbies: string[];
  lifestyle: string[];
  personality: string[];
  lookingFor: string[];
  ageRange: [number, number];
  distanceRange: number;
  locationPermission: boolean;
  notificationPermission: boolean;
}
