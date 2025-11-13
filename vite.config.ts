import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@enum": path.resolve(__dirname, "src/enum"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@schema": path.resolve(__dirname, "src/schema"),
      "@sections": path.resolve(__dirname, "src/sections"),
      "@services": path.resolve(__dirname, "src/services"),
      "@shimmer_ui": path.resolve(__dirname, "src/shimmer_ui"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
