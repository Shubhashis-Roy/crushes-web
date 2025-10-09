import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import WelcomeStep from "./WelcomeStep";
import BasicInfoStep from "./BasicInfoStep";
import CareerEducationStep from "./CareerEducationStep";
import ProfileSetupStep from "./ProfileSetupStep";
import PreferencesStep from "./PreferencesStep";
import PermissionsStep from "./PermissionsStep";
import PreviewStep from "./PreviewStep";
import { THEME } from "../../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import InputField from "../InputField";
import { Eye, EyeOff } from "lucide-react";
import { BASE_URL } from "../../utils/constants";

export interface OnboardingData {
  name: string;
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
  const dispatch = useDispatch();

  // ✅ Skip if onboarding already done
  useEffect(() => {
    const done = localStorage.getItem("onboardingDone");
    if (done) navigate("/feed");
  }, [navigate]);

  // ✅ --- LoginStep definition inline ---
  const LoginStep = () => {
    const [emailId, setEmailId] = useState("shub@gmail.in");
    const [password, setPassword] = useState("Subhashis@9");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [city, setCity] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
      if (!emailId || !password) {
        setError("Please fill in all fields");
        return;
      }
      try {
        setLoading(true);
        const res = await axios.post(
          BASE_URL + "/login",
          { emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        localStorage.setItem("onboardingDone", "true");
        navigate("/feed");
      } catch (err: any) {
        console.error(err);
        setError(
          err?.response?.data || "Something went wrong, please try again"
        );
      } finally {
        setLoading(false);
      }
    };

    const handleSignUp = async () => {
      if (!firstName || !lastName || !emailId || !password) {
        setError("Please fill in all fields");
        return;
      }
      try {
        setLoading(true);
        const res = await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, city, emailId, password },
          { withCredentials: true }
        );
        dispatch(addUser(res.data.data));
        // Continue to next onboarding step
        nextStep();
      } catch (err: any) {
        console.error(err);
        setError(
          err?.response?.data || "Something went wrong, please try again"
        );
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-4 drop-shadow">
          {isLoginForm ? "Welcome Back 💕" : "Create Account"}
        </h2>

        {!isLoginForm && (
          <>
            <InputField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <InputField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <InputField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
          </>
        )}

        <InputField
          label="Email"
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Email"
          icon="mail"
        />
        <InputField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          icon="lock"
          showToggle
          toggleValue={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          onToggle={() => setShowPassword((prev) => !prev)}
        />

        {error && (
          <p className="text-red-300 text-sm text-center mt-3">{error}</p>
        )}

        <Button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          disabled={loading}
          className="w-full mt-4 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition-opacity"
        >
          {loading
            ? isLoginForm
              ? "Logging in..."
              : "Creating account..."
            : isLoginForm
            ? "Login"
            : "Sign Up"}
        </Button>

        <p
          className="text-center mt-6 text-white text-sm hover:text-pink-300 transition cursor-pointer"
          onClick={() => {
            setIsLoginForm((prev) => !prev);
            setError("");
          }}
        >
          {isLoginForm ? "New here? " : "Already have an account? "}
          <span className="underline font-semibold">
            {isLoginForm ? "Create account" : "Log in"}
          </span>
        </p>
      </div>
    );
  };

  // ✅ Onboarding steps (login is step 1)
  const steps = [
    { component: WelcomeStep, title: "Welcome", requiresData: false },
    { component: LoginStep, title: "Login / Signup", requiresData: false },
    { component: BasicInfoStep, title: "Basic Info", requiresData: true },
    {
      component: CareerEducationStep,
      title: "Career & Education",
      requiresData: true,
    },
    { component: ProfileSetupStep, title: "Profile Setup", requiresData: true },
    { component: PreferencesStep, title: "Preferences", requiresData: true },
    { component: PermissionsStep, title: "Permissions", requiresData: true },
    { component: PreviewStep, title: "Preview Profile", requiresData: false },
  ];

  const totalSteps = steps.length - 1;
  const updateData = (newData: Partial<OnboardingData>) =>
    setData((prev) => ({ ...prev, ...newData }));

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem("onboardingDone", "true");
      navigate("/feed");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const skipStep = () => nextStep();

  const canProceed = () => {
    const step = steps[currentStep];
    if (!step.requiresData) return true;
    switch (currentStep) {
      case 2:
        return (
          data.name &&
          data.dateOfBirth &&
          data.gender &&
          data.interestedIn.length > 0
        );
      case 3:
        return data.profession && data.education;
      case 4:
        return data.photos.length > 0 && data.bio;
      case 5:
        return (
          data.lookingFor.length > 0 ||
          data.ageRange[0] !== 18 ||
          data.ageRange[1] !== 35 ||
          data.distanceRange !== 50
        );
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
      {/* Progress Bar */}
      {currentStep > 0 && (
        <div className="sticky top-0 z-20 bg-gradient-to-b from-black/10 to-transparent backdrop-blur-sm pb-4 pt-20">
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

      {/* Step Content */}
      <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
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

      {/* Navigation Buttons */}
      {currentStep > 0 && currentStep < steps.length && (
        <div className="sticky bottom-0 w-full flex justify-between max-w-2xl px-8 py-6 z-30">
          {currentStep > 1 && (
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
            {currentStep < totalSteps && (
              <Button
                variant="ghost"
                onClick={skipStep}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-full px-5"
              >
                Skip
              </Button>
            )}

            {currentStep !== 1 && (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-full transition-transform hover:scale-105"
                style={{
                  background: `linear-gradient(90deg, ${THEME.colors.primary}, ${THEME.colors.secondary})`,
                  boxShadow: THEME.shadows.soft,
                }}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Continue"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingFlow;
