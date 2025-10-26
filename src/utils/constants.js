// 🌐 Base URL
export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:5000" : "/api";

// 💖 Elegant Patina Gradient Palette for Love Date Crush
export const THEME = {
  colors: {
    // Main brand hues (based on your Patina palette)
    primary: "#7C2A7B", // deep romantic violet
    secondary: "#A45DA5", // dusty lavender
    accent: "#C86FA3", // warm rose magenta
    softAccent: "#EBA8BE", // light pink glow
    highlight: "#E2B24A", // golden touch
    deep: "#3F1A47", // base purple tone

    // Background gradients
    backgroundGradient:
      "linear-gradient(135deg, #3F1A47 0%, #7C2A7B 45%, #C86FA3 80%, #EBA8BE 100%)",
    footerGradient:
      "linear-gradient(90deg, #3F1A47, #7C2A7B, #C86FA3, #E2B24A)",

    // Text
    textPrimary: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.9)",
    muted: "rgba(255, 255, 255, 0.7)",

    // Support colors
    dark: "#1A0B2E",
    light: "#FFF9F7",
  },

  fonts: {
    primary: "'Poppins', sans-serif",
    heading: "'Playfair Display', serif",
    secondary: "'Inter', sans-serif",
  },

  fontSize: {
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },

  shadows: {
    soft: "0 6px 20px rgba(200, 111, 163, 0.35)",
    medium: "0 8px 25px rgba(164, 93, 165, 0.4)",
    glow: "0 0 25px rgba(235, 168, 190, 0.3)",
  },

  radius: {
    sm: "8px",
    md: "16px",
    lg: "24px",
    full: "9999px",
  },
};
