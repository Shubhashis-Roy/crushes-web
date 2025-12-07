import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="mt-6 w-full flex justify-center"
      >
        <div
          className="
            w-[80%]
            max-w-xl
            mx-auto
            text-sm font-medium
            text-white
            bg-red-500/10
            border border-red-500
            py-2
            rounded-full
            backdrop-blur-md
            shadow-[0_0_10px_rgba(255,0,0,0.2)]
            flex items-center justify-center
            text-center
          "
        >
          <span className="text-lg mr-2">⚠️</span>
          {message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorMessage;
