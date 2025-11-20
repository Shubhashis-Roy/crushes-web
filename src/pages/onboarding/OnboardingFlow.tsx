import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { THEME } from "@constants/colors";
import NavBar from "@components/layout/NavBar";

// Steps
import BasicInfoStep from "@sections/onboarding/BasicInfoStep";
import CareerEducationStep from "@sections/onboarding/CareerEducationStep";
import ProfileSetupStep from "@sections/onboarding/ProfileSetupStep";
import PreferencesStep from "@sections/onboarding/PreferencesStep";
// import PermissionsStep from "@sections/onboarding/PermissionsStep";
import PreviewStep from "@sections/onboarding/PreviewStep";
import { dispatch } from "@redux/store";
import { updateUserProfile, uploadPhotos } from "@redux/slices/user";
import { signup } from "@redux/slices/auth";
import { dobFormatter } from "@utils/age";
import { PATH } from "@constants/path";
import ErrorMessage from "@sections/onboarding/ErrorMessage";
import { onBoardingValidations } from "@utils/validation";

export const initialData: OnboardingDataTypes = {
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
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [data, setData] = useState<OnboardingDataTypes>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  // Reset onboarding when coming from login
  useEffect(() => {
    const onboardingDone = localStorage.getItem("onboardingDone");
    if (location.state?.goToWelcome && onboardingDone !== "true") {
      setShowLogin(false);
      setCurrentStep(0);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const updateData = (newData: Partial<OnboardingDataTypes>) =>
    setData((prev) => ({ ...prev, ...newData }));

  const steps = [
    { component: BasicInfoStep, title: "Basic Info" },
    { component: CareerEducationStep, title: "Career & Education" },
    { component: PreferencesStep, title: "Preferences" },
    { component: ProfileSetupStep, title: "Profile Setup" },
    // { component: PermissionsStep, title: "Permissions" },
    { component: PreviewStep, title: "Preview" },
  ];

  const totalSteps = steps.length;
  const CurrentStepComponent = steps[currentStep].component;

  // Next Step Handler
  const nextStep = async () => {
    setError("");

    const validationError = onBoardingValidations(currentStep, data);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep === 0 && data?.email && data?.password) {
      const dob = dobFormatter(data?.dateOfBirth);

      const res = await dispatch(
        signup({
          emailId: data?.email,
          password: data?.password,
          firstName: data?.name,
          lastName: data?.name,
          dob: dob,
          city: data?.city,
          interest: data?.interestedIn?.map((i) => i.toLowerCase()),
          gender: data?.gender.toLocaleLowerCase(),
        })
      );

      if (res?.status !== 200) return;
      setDirection(1);
      setCurrentStep(1);
    }

    if (currentStep === 1) {
      const res = await dispatch(
        updateUserProfile({
          profession: data?.profession?.toLocaleLowerCase(),
          organization: data?.company?.toLocaleLowerCase(),
          education: data?.education
            ? data?.education?.toLocaleLowerCase()
            : "",
        })
      );
      if (res?.status !== 200) return;
      setDirection(1);
      setCurrentStep(2);
    }

    if (currentStep === 2) {
      const res = await dispatch(
        updateUserProfile({
          lookingFor: data?.lookingFor,
          preferredAge: { min: data?.ageRange[0], max: data?.ageRange[1] },
          preferredDistance: data?.distanceRange,
        })
      );

      if (res?.status !== 200) return;
      setDirection(1);
      setCurrentStep(3);
    }

    if (currentStep === 3) {
      const res = await dispatch(
        updateUserProfile({
          bio: data?.bio,
        })
      );
      const resPhoto = await dispatch(uploadPhotos(data?.photos));
      if (res?.status !== 200 && resPhoto?.status !== 200) return;
      setDirection(1);
      setCurrentStep(4);
    }

    if (currentStep === 4) {
      navigate(PATH.FEED);
    }
  };

  const prevStep = () => {
    if (currentStep === 0) {
      navigate(PATH.HOME);
      return;
    }

    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
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
      className="relative min-h-screen w-full overflow-y-auto flex flex-col items-center"
      style={{ background: THEME.colors.backgroundGradient }}
    >
      {/* <NavBar showMinimal /> */}

      {/* ========= Progress Bar ===================== */}
      <div className="sticky top-0 z-20 pb-4 pt-24">
        <div className="flex flex-col items-center">
          <div className="flex gap-2 mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-10 rounded-full ${
                  i <= currentStep ? "bg-white" : "bg-pink-200/60"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-white opacity-90">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
      </div>

      {/* ============= Step Content ============== */}
      <div className="relative w-full max-w-2xl flex-1 flex items-start justify-center px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={showLogin ? "login" : currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            <CurrentStepComponent
              data={data}
              updateData={updateData}
              onNext={nextStep}
              onPrev={prevStep}
            />
            <ErrorMessage message={error} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =================== Bottom Navigation ============= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="sticky bottom-0 w-full flex justify-between max-w-2xl px-8 py-6 z-30"
      >
        <Button
          variant="outline"
          onClick={prevStep}
          className="flex items-center gap-2 text-gray-100 border border-white/40 hover:bg-white/10 rounded-full px-6 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex gap-4 ml-auto">
          <Button
            onClick={nextStep}
            // disabled={!canNavBarProceed() || loading}
            className="flex items-center gap-2 px-8 py-2 font-semibold text-white rounded-full"
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
    </div>
  );
};

export default OnboardingFlow;
