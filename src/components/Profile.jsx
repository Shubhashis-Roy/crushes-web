import { useSelector } from "react-redux";
import { useState } from "react";
import Sidebar from "./Sidebar"; // adjust path as needed
import RecommendationContent from "./sidebarContents/RecommendationContent";
import MyMatchContent from "./sidebarContents/MyMatchContent";
import PersonalInfoContent from "./sidebarContents/PersonalInfoContent";
import EditProfileContent from "./sidebarContents/EditProfileContent";
import ChangePasswordContent from "./sidebarContents/ChangePasswordContent";
import MyMessagesContent from "./sidebarContents/MyMessagesContent";
import ManageImagesContent from "./sidebarContents/ManageImagesContent";
import ManageVideosContent from "./sidebarContents/ManageVideosContent";
import DeleteAccountContent from "./sidebarContents/DeleteAccountContent";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [selectedScreen, setSelectedScreen] = useState("Recommendation");

  const renderContent = () => {
    switch (selectedScreen) {
      case "Recommendation":
        return <RecommendationContent />;
      case "My Match":
        return <MyMatchContent />;
      case "Personal Information":
        return <PersonalInfoContent />;
      case "Edit Profile":
        return <EditProfileContent user={user} />;
      case "Change Password":
        return <ChangePasswordContent />;
      case "My Messages":
        return <MyMessagesContent />;
      case "Manage Images":
        return <ManageImagesContent />;
      case "Manage Videos":
        return <ManageVideosContent />;
      case "Delete Account":
        return <DeleteAccountContent />;
      case "Logout":
        return <div>Logging out...</div>;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    user && (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-pink-50 to-pink-100 p-4">
        <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl h-[80vh]">
          {/* Sidebar */}
          <Sidebar
            onSelect={(label) => setSelectedScreen(label)}
            selectedLabel={selectedScreen}
          />

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
        </div>
      </div>
    )
  );
};

export default Profile;
