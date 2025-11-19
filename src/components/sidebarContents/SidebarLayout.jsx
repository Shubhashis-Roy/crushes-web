// components/SidebarLayout.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import RecommendationContent from "./RecommendationContent";
import MyMatchContent from "./MyMatchContent";
import EditProfileContent from "./EditProfileContent";

// import other screen components as needed...

const SidebarLayout = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState("Edit Profile");

  const renderContent = () => {
    switch (selectedMenu) {
      case "Recommendation":
        return <RecommendationContent />;
      case "My Match":
        return <MyMatchContent />;
      case "Edit Profile":
        return <EditProfileContent user={user} />;
      // Add more cases here for other screens
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="flex overflow-hidden">
      <Sidebar selected={selectedMenu} onSelect={setSelectedMenu} />
      <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-pink-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default SidebarLayout;
