import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ManageImagesContent from "./sidebarContents/ManageImagesContent";
import MyMatchContent from "./sidebarContents/MyMatchContent";
import EditProfileContent from "./sidebarContents/EditProfileContent";
import DeleteAccountContent from "./sidebarContents/DeleteAccountContent";
import LogoutContent from "./sidebarContents/LogoutContent";

import { removeUser } from "../redux/userSlice";
import { BASE_URL } from "@services/axios";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedScreen, setSelectedScreen] = useState("Edit Profile");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const menuOptions = [
    { label: "Edit Profile", emoji: "💫" },
    { label: "Manage Images", emoji: "🖼️" },
    { label: "My Matches", emoji: "💞" },
    { label: "Delete Account", emoji: "⚠️" },
    { label: "Logout", emoji: "🚪" },
  ];

  const renderContent = () => {
    switch (selectedScreen) {
      case "Edit Profile":
        return <EditProfileContent user={user} />;
      case "Manage Images":
        return <ManageImagesContent user={user} />;
      case "My Matches":
        return <MyMatchContent />;
      case "Delete Account":
        return <DeleteAccountContent />;
      default:
        return (
          <p className="text-center text-white/70">Select an option above 🌸</p>
        );
    }
  };

  return (
    user && (
      <div className="relative min-h-screen bg-gradient-to-br from-[#2a0e45] via-[#3d176a] to-[#5e2d91] text-white flex flex-col items-center px-4 py-10 pt-28">
        {/* 🔮 Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg">
            Your Cosmic Profile ✨
          </h2>
          <p className="text-white/80 mt-2">
            Reflect your vibe and shine bright 💖
          </p>
        </div>

        {/* 🌈 Floating Menu Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {menuOptions.map((opt) => (
            <motion.button
              key={opt.label}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                opt.label === "Logout"
                  ? setShowLogoutConfirm(true)
                  : setSelectedScreen(opt.label)
              }
              className={`px-5 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 text-sm font-semibold shadow-lg ${
                selectedScreen === opt.label
                  ? "bg-gradient-to-r from-pink-400 to-purple-500 border-transparent text-white shadow-pink-500/30 scale-105"
                  : "border-white/20 text-white/70 hover:bg-white/10"
              }`}
            >
              <span className="mr-2">{opt.emoji}</span>
              {opt.label}
            </motion.button>
          ))}
        </div>

        {/* 🌌 Glass Card Section */}
        <motion.div
          key={selectedScreen}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white/10 border border-white/20 rounded-2xl backdrop-blur-2xl shadow-2xl p-6 overflow-y-auto min-h-[60vh]"
        >
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </motion.div>

        {/* 🚪 Logout Confirmation */}
        {showLogoutConfirm && (
          <LogoutContent
            onConfirm={() => {
              setShowLogoutConfirm(false);
              handleLogout();
            }}
            onCancel={() => setShowLogoutConfirm(false)}
          />
        )}
      </div>
    )
  );
};

export default Profile;
