import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManageImagesContent from "./sidebarContents/ManageImagesContent";

import Sidebar from "./Sidebar";
import MyMatchContent from "./sidebarContents/MyMatchContent";
// import PersonalInfoContent from "./sidebarContents/PersonalInfoContent";
import EditProfileContent from "./sidebarContents/EditProfileContent";
// import ChangePasswordContent from "./sidebarContents/ChangePasswordContent";
import DeleteAccountContent from "./sidebarContents/DeleteAccountContent";
import { removeUser } from "../redux/userSlice";
import { BASE_URL } from "../utils/constants";
import LogoutContent from "./sidebarContents/LogoutContent";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedScreen, setSelectedScreen] = useState("Recommendation");
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

  // Separate the selection handler to intercept "Logout"
  const handleMenuSelect = (label) => {
    if (label === "Logout") {
      setShowLogoutConfirm(true);
    } else {
      setSelectedScreen(label);
    }
  };

  const renderContent = () => {
    switch (selectedScreen) {
      case "My Match":
        return <MyMatchContent />;
      case "Edit Personal Info":
        return <EditProfileContent user={user} />;
      case "Manage Images":
        return <ManageImagesContent user={user} />;
      // case "Change Password":
      //   return <ChangePasswordContent />;
      case "Delete Account":
        return <DeleteAccountContent />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    user && (
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-pink-100 p-4">
        <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl h-[80vh]">
          {/* Sidebar */}
          <Sidebar onSelect={handleMenuSelect} selectedLabel={selectedScreen} />

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        </div>

        {/* Logout Confirmation Overlay */}
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
