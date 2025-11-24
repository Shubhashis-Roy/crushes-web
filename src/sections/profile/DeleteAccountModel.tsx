import { motion, AnimatePresence } from "framer-motion";

interface logoutProps {
  setShowLogoutConfirm: (arg0: boolean) => void;
}

const DeleteAccountModel: React.FC<logoutProps> = ({
  setShowLogoutConfirm,
}) => {
  const handleDeleteAccount = async () => {
    alert("Your account will be permanently deleted in 1 day.");
    setShowLogoutConfirm(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="logout-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-md bg-black/40"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative bg-white/90 dark:bg-[#1b102d]/90 rounded-2xl shadow-[0_8px_40px_rgba(248,109,132,0.35)] w-[90%] sm:w-[380px] backdrop-blur-xl border border-pink-200/60"
        >
          {/* Decorative gradient ring */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-400/10 to-purple-500/10 pointer-events-none" />

          <div className="relative z-10 p-6 flex flex-col items-center text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-pink-100 mb-3">
              Are you sure you want to delete your account?
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              This action cannot be undone.💔
            </p>

            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium shadow-sm transition-all duration-300 hover:shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 text-white font-medium shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300"
              >
                Yes, Delete Account
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteAccountModel;
