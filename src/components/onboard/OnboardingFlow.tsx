import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import { THEME, BASE_URL } from "../../utils/constants";

// Steps
import WelcomeStep from "./WelcomeStep";
import BasicInfoStep from "./BasicInfoStep";
import CareerEducationStep from "./CareerEducationStep";
import ProfileSetupStep from "./ProfileSetupStep";
import PreferencesStep from "./PreferencesStep";
import PermissionsStep from "./PermissionsStep";
import PreviewStep from "./PreviewStep";
import Login from "../Login"; // 👈 your existing login component

export interface OnboardingData {
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

export const initialData: OnboardingData = {
  name: "",
  email: "",
  password: "",
  city: "",
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false); // 👈 controls login screen
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Redirect if onboarding already done
  useEffect(() => {
    const done = localStorage.getItem("onboardingDone");
    if (done) navigate("/feed");
  }, [navigate]);

  const updateData = (newData: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...newData }));

  const steps = [
    { component: WelcomeStep, title: "Welcome" },
    { component: BasicInfoStep, title: "Basic Info" },
    { component: CareerEducationStep, title: "Career & Education" },
    { component: ProfileSetupStep, title: "Profile Setup" },
    { component: PreferencesStep, title: "Preferences" },
    { component: PermissionsStep, title: "Permissions" },
    { component: PreviewStep, title: "Preview" },
  ];

  const totalSteps = steps.length - 1;
  const CurrentStepComponent = steps[currentStep].component;

  // ✅ Handle Next / Continue
  const nextStep = async () => {
    setError("");

    // Step 1 (Create Account)
    if (currentStep === 1) {
      const { email, password, name, dateOfBirth, gender, interestedIn, city } =
        data;

      if (
        !email ||
        !password ||
        !name ||
        !city ||
        !dateOfBirth ||
        !gender ||
        !interestedIn.length
      ) {
        setError("Please fill in all required fields before continuing.");
        return;
      }

      try {
        setLoading(true);
        const res = await axios.post(
          `${BASE_URL}/signup`,
          {
            emailId: email,
            password,
            firstName: name,
            lastName: "",
            city,
            dateOfBirth,
            gender,
            interestedIn,
          },
          { withCredentials: true }
        );

        dispatch(addUser(res.data.data));
        console.log("✅ Account created:", res.data.data);
      } catch (err) {
        console.error(err);
        setError("Signup failed. Try again.");
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }

    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem("onboardingDone", "true");
      navigate("/feed");
    }
  };

  // ✅ Handle Back
  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ✅ Visibility logic
  const canShowBack = currentStep > 0 && !showLogin;
  const canShowSkip =
    currentStep > 1 && currentStep < steps.length - 1 && !showLogin;

  // ✅ Button enable/disable logic
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          data.email &&
          data.password &&
          data.name &&
          data.dateOfBirth &&
          data.gender &&
          data.city &&
          data.interestedIn.length > 0
        );
      case 2:
        return data.profession && data.education;
      case 3:
        return data.photos.length > 0 && data.bio;
      default:
        return true;
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: { x: 0, opacity: 1, position: "relative" as const },
    exit: (direction: number) => ({
      x: direction > 0 ? -150 : 150,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden flex flex-col items-center"
      style={{ background: THEME.colors.backgroundGradient }}
    >
      {/* 🌟 Progress Bar (hide on Welcome & Login) */}
      {!showLogin && currentStep > 0 && (
        <div className="sticky top-0 z-20 pb-4 pt-20">
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-2">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-10 rounded-full transition-all ${
                    index < currentStep ? "bg-white" : "bg-pink-200/60"
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-white opacity-90">
              Step {currentStep} of {totalSteps}
            </p>
          </div>
        </div>
      )}

      {/* 🧭 Step Content / Login toggle */}
      <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={showLogin ? "login" : currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {showLogin ? (
              <Login />
            ) : (
              <CurrentStepComponent
                data={data}
                updateData={updateData}
                onNext={nextStep}
                onPrev={prevStep}
                // 👇 Pass function to open login
                openLogin={() => setShowLogin(true)}
              />
            )}

            {error && (
              <p className="text-center text-red-300 text-sm mt-4">{error}</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ✅ Navigation Buttons (hidden on login) */}
      {!showLogin && currentStep < steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky bottom-0 w-full flex justify-between max-w-2xl px-8 py-6 z-30"
        >
          {canShowBack && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-2 text-gray-100 border border-white/40 hover:bg-white/10 rounded-full px-6 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          )}

          <div className="flex gap-4 ml-auto">
            {canShowSkip && (
              <Button
                variant="ghost"
                onClick={nextStep}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-5"
              >
                Skip
              </Button>
            )}

            <Button
              onClick={nextStep}
              disabled={!canProceed() || loading}
              className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-full transition-transform hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`,
                boxShadow: THEME.shadows.soft,
              }}
            >
              {loading
                ? "Processing..."
                : currentStep === steps.length - 1
                ? "Finish"
                : "Continue"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default OnboardingFlow;
