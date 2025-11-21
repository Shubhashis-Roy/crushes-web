import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteAccount = () => {
  return (
    <div className="w-full flex flex-col items-center text-center text-white px-6 py-8">
      {/* ============= Warning Header ============= */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <FaExclamationTriangle className="text-red-400 text-5xl drop-shadow-lg" />
        </div>
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Delete Account
        </h2>
        <p className="mt-3 text-white/70 max-w-lg mx-auto">
          This action is{" "}
          <span className="text-red-400 font-semibold">permanent</span> and
          cannot be undone. All your data, matches, and chat history will be
          lost forever 💔
        </p>
      </motion.div>

      {/* ============= Warning Card ============== */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg border border-red-400/30 shadow-[0_0_25px_rgba(239,68,68,0.4)] rounded-2xl p-6 max-w-md w-full"
      >
        <h3 className="text-lg font-semibold text-red-400 mb-3">
          ⚠️ You’re about to delete your account
        </h3>
        <p className="text-white/80 text-sm">
          If you continue, your account and all associated data will be
          permanently removed from our system.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
            onClick={() => alert("⚠️ Account deletion logic here")}
          >
            Yes, Delete My Account
          </button>
          {/* <button
            className="px-6 py-2 rounded-lg font-semibold border border-white/20 text-white/80 hover:bg-white/10 transition-all"
            onClick={() => alert("❌ Cancel clicked")}
          >
            Cancel
          </button> */}
        </div>
      </motion.div>

      {/* ============= Reminder ============== */}
      <p className="mt-8 text-sm text-white/50 max-w-md">
        You can always deactivate your account temporarily instead of deleting
        it permanently.
      </p>
    </div>
  );
};

export default DeleteAccount;
