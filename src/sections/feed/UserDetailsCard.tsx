import { calculateAge } from "@utils/date";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

interface UserDetailsCardProps {
  user: feedDetailsTypes | null;
  onClose: () => void;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user, onClose }) => {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    setAge(calculateAge(user?.dateOfBirth || ""));
  }, [user?.dateOfBirth]);

  return (
    <AnimatePresence>
      {user && (
        <motion.div
          key="details"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute right-[6%] top-1/2 -translate-y-1/2 w-[380px] z-[60]
            bg-black/60 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/10"
        >
          <h2 className="text-2xl font-bold mb-1 capitalize">
            {user?.firstName}
          </h2>

          <p className="text-sm text-white/70 mb-1">
            {Number(age) > 0 && `${age}, `} {user?.gender}
          </p>

          <p className="text-white/90 mb-3">{user?.city}</p>

          <p className="text-white/80 text-sm leading-relaxed mb-6">
            {user?.bio ||
              "No bio yet — maybe this mystery makes them more interesting."}
          </p>

          <button
            onClick={onClose}
            className="mt-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600
              rounded-full text-white font-semibold hover:opacity-90 transition"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserDetailsCard;
