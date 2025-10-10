import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Users } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { OnboardingData } from "./OnboardingFlow";
import { THEME } from "../../utils/constants";
import { Link } from "react-router-dom";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

// ✨ Floating animation variants
const floatVariants: Variants = {
  float1: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as any },
  },
  float2: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut" as any,
      delay: 1,
    },
  },
  float3: {
    y: [0, -20, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut" as any,
      delay: 2,
    },
  },
};

// ✨ Animated text variants
const textVariants: Variants = {
  enter: { opacity: 0, y: 20, scale: 0.95 },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.4 } },
};

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const words = [
    "perfect match",
    "true love",
    "real connection",
    "beautiful bond",
  ];
  const [index, setIndex] = useState(0);

  // ⏳ Cycle words every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        fontFamily: THEME.fonts.primary,
        color: THEME.colors.textPrimary,
      }}
    >
      {/* 🌸 Floating Orbs */}
      <motion.div
        className="absolute top-20 left-16 w-20 h-20 rounded-full opacity-30 blur-2xl"
        style={{ background: "#E1BEE7" }}
        variants={floatVariants}
        animate="float1"
      />
      <motion.div
        className="absolute bottom-32 right-20 w-24 h-24 rounded-full opacity-30 blur-2xl"
        style={{ background: "#F8BBD0" }}
        variants={floatVariants}
        animate="float2"
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full opacity-40 blur-lg"
        style={{ background: "#F48FB1" }}
        variants={floatVariants}
        animate="float3"
      />

      {/* 💖 Icon Row */}
      <div className="flex justify-center mb-10 space-x-8 z-10">
        {[Heart, Sparkles, Users].map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.25, type: "spring" }}
            className="p-4 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm shadow-md transition-all"
          >
            <Icon
              size={38}
              color={THEME.colors.textPrimary}
              strokeWidth={1.6}
            />
          </motion.div>
        ))}
      </div>

      {/* 🌈 Title + Animated Word */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-bold mb-3 z-10 flex flex-wrap justify-center items-center gap-2 text-center"
        style={{
          fontFamily: THEME.fonts.heading,
          fontSize: THEME.fontSize["4xl"],
          lineHeight: 1.2,
        }}
      >
        {/* Static text */}
        <span
          style={{
            color: THEME.colors.highlight,
            textShadow: "0 2px 8px rgba(226,178,74,0.4)",
          }}
        >
          Find your
        </span>

        {/* Animated word */}
        <span className="relative inline-flex items-center justify-center min-h-[1.5em] ml-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{
                background:
                  "linear-gradient(90deg, #FF80BF, #EBA8BE, #C86FA3, #FF80BF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
                textShadow:
                  "0 0 25px rgba(255,128,191,0.8), 0 0 50px rgba(255,128,191,0.4)",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.h1>

      {/* 💬 Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: THEME.fontSize.lg,
          color: THEME.colors.textSecondary,
          maxWidth: 460,
        }}
        className="mb-10 leading-relaxed z-10"
      >
        Connect with amazing people who share your interests and values. Your
        journey to meaningful connections starts here.
      </motion.p>

      {/* 🚀 Get Started Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="z-10"
      >
        <button
          onClick={onNext}
          className="
          relative px-10 py-3 text-lg font-semibold rounded-full 
          transition-all duration-300 
          border-[3px] border-purple-300
          text-purple-200 
          shadow-[0_0_20px_rgba(217,176,255,0.5),inset_0_0_10px_rgba(217,176,255,0.5)]
          hover:bg-purple-200 hover:text-purple-900
          hover:shadow-[0_0_25px_rgba(217,176,255,0.9),0_0_60px_rgba(191,123,255,0.8),inset_0_0_15px_rgba(217,176,255,0.7)]
          active:shadow-[0_0_10px_rgba(217,176,255,0.7),0_0_40px_rgba(191,123,255,0.6),inset_0_0_8px_rgba(217,176,255,0.5)]
          bg-[rgb(100,61,136)]
        "
          style={{
            textShadow: "0 0 6px rgba(217,176,255,0.8)",
            boxShadow: `
              0 0 1em 0.25em rgb(217,176,255),
              0 0 3em 1em rgba(191,123,255,0.7),
              inset 0 0 0.75em 0.25em rgb(217,176,255)
            `,
          }}
        >
          Get Started
          <span className="absolute top-[120%] left-0 w-full h-full bg-[rgba(191,123,255,0.5)] blur-3xl opacity-70 scale-y-50 rounded-full" />
        </button>
      </motion.div>

      {/* 🛡️ Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center mt-12 space-y-3 text-sm z-10"
        style={{ color: THEME.colors.muted }}
      >
        <div className="flex justify-center items-center space-x-6">
          <span>• Safe & Secure</span>
          <span>• Verified Profiles</span>
          <span>• Real Connections</span>
        </div>

        {/* 👇 Already a user? Login */}
        <div className="mt-4">
          <p className="text-white/80">
            Already a member?{" "}
            <Link
              to="/login"
              className="text-pink-300 hover:text-pink-100 underline font-semibold transition"
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeStep;
