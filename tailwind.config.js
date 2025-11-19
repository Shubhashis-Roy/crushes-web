/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}", // 👈 Required for Flowbite React
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}", // 👈 Required for Flowbite core styles
  ],
  theme: {
    extend: {
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-200px)", opacity: "0" },
        },
        scalePop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        floatUp: "floatUp 1.5s ease-out forwards",
        scalePop: "scalePop 0.8s ease-out",
        floatSlow: "float 10s ease-in-out infinite",
        floatMedium: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    daisyui,
    tailwindScrollbarHide,
    flowbite, // 👈 Enables Flowbite utilities and component classes
  ],
};
