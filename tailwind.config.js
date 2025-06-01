/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        float: "floatUp 1.5s ease-out forwards",
        no: "scalePop 0.8s ease-out",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-200px)", opacity: "0" },
        },
        scalePop: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "50%": { transform: "scale(1.3)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
