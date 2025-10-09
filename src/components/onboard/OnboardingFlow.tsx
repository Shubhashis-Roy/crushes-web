import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FaHeart, FaStar, FaUserFriends } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import WelcomeStep from "./WelcomeStep";
import BasicInfoStep from "./BasicInfoStep";
import CareerEducationStep from "./CareerEducationStep";
import ProfileSetupStep from "./ProfileSetupStep";
import InterestsStep from "./InterestsStep";
import PreferencesStep from "./PreferencesStep";
import PermissionsStep from "./PermissionsStep";
import PreviewStep from "./PreviewStep";

export interface OnboardingData {
  name: string;
  dateOfBirth: string;
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

const initialData: OnboardingData = {
  name: "",
  dateOfBirth: "",
  gender: "",
  interestedIn: [],
  profession: "",
  company: "",
  education: "",
  photos: [],
  bio: "",
  hobbies: [],
  lifestyle: [],
  personality: [],
  lookingFor: [],
  ageRange: [18, 35],
  distanceRange: 50,
  locationPermission: false,
  notificationPermission: false,
};

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<OnboardingData>(initialData);
  const navigate = useNavigate();

  // ✅ Auto-skip if onboarding was done previously
  useEffect(() => {
    const done = localStorage.getItem("onboardingDone");
    if (done) navigate("/login");
  }, [navigate]);

  const steps = [
    { component: WelcomeStep, title: "Welcome", requiresData: false },
    { component: BasicInfoStep, title: "Basic Info", requiresData: true },
    { component: CareerEducationStep, title: "Career & Education", requiresData: true },
    { component: ProfileSetupStep, title: "Profile Setup", requiresData: true },
    { component: InterestsStep, title: "Interests & Lifestyle", requiresData: true },
    { component: PreferencesStep, title: "Preferences", requiresData: true },
    { component: PermissionsStep, title: "Permissions", requiresData: true },
    { component: PreviewStep, title: "Preview Profile", requiresData: false },
  ];

  const totalSteps = steps.length - 1;
  const updateData = (newData: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...newData }));

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      // ✅ Mark onboarding complete & go to login
      localStorage.setItem("onboardingDone", "true");
      navigate("/login");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (!step.requiresData) return true;
    switch (currentStep) {
      case 1:
        return data.name && data.dateOfBirth && data.gender && data.interestedIn.length > 0;
      case 2:
        return data.profession && data.education;
      case 3:
        return data.photos.length > 0 && data.bio;
      case 4:
        return data.hobbies.length > 0;
      case 5:
        return data.lookingFor.length > 0;
      default:
        return true;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-400 to-purple-700" />
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/hearts.png')] bg-repeat" />

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaHeart className="animate-floatSlow absolute left-1/4 top-1/3 text-white/30 text-6xl" />
        <FaStar className="animate-floatMedium absolute right-1/4 top-1/2 text-white/40 text-5xl" />
        <FaUserFriends className="animate-floatSlow absolute left-1/3 bottom-1/4 text-white/20 text-7xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col h-full">
        {currentStep > 0 && (
          <div className="fixed top-14 left-0 right-0 z-40 flex flex-col items-center py-3">
            <div className="flex gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-10 rounded-full transition-all ${
                    index < currentStep ? "bg-white" : "bg-pink-300"
                  }`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-white">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center relative pt-2 pb-2 px-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full max-w-xl"
            >
              <CurrentStepComponent
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {currentStep > 0 && currentStep < steps.length && (
          <div className="fixed bottom-16 left-0 right-0 z-40 py-3 px-6 flex justify-between items-center">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-8 bg-pink-600 hover:bg-pink-700 text-white shadow-lg"
            >
              {currentStep === steps.length - 1 ? "Finish" : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
