import React from "react";
import {
  FaBars,
  // FaVideo,
  FaUsers,
  FaComments,
  FaChevronLeft,
} from "react-icons/fa";

interface ChatSidebarHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab: string;
  handleRecentChats: () => void;
  // handleVideoClick: () => void;
  handleAllConnections: () => void;
}

const ChatSidebarHeader: React.FC<ChatSidebarHeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  handleRecentChats,
  // handleVideoClick,
  handleAllConnections,
}) => {
  return (
    <header className="flex items-center justify-between py-3 px-3 border-b border-white/10 text-sm font-medium text-white/80 ml-2">
      {sidebarOpen ? (
        <>
          {/* ======= Tabs ======= */}
          <div className="flex items-center gap-20">
            <button
              onClick={handleRecentChats}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                activeTab === "chats"
                  ? "bg-pink-500/30 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  : "hover:bg-white/10 text-white/80"
              }`}
              title="Chats"
            >
              <FaComments size={22} />
            </button>

            {/* <button
              onClick={handleVideoClick}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                activeTab === "video"
                  ? "bg-pink-500/30 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  : "hover:bg-white/10 text-white/80"
              }`}
              title="Video Calls"
            >
              <FaVideo size={22} />
            </button> */}

            <button
              onClick={handleAllConnections}
              className={`flex ml-3 items-center justify-center w-8 h-8 rounded-full transition-all ${
                activeTab === "connections"
                  ? "bg-pink-500/30 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                  : "hover:bg-white/10 text-white/80"
              }`}
              title="All Connections"
            >
              <FaUsers size={22} />
            </button>
          </div>

          {/* ======= Close Button ======= */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white/70 hover:text-pink-300 transition-all text-lg font-semibold flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10"
            title="Close Sidebar"
          >
            <FaChevronLeft size={22} />
          </button>
        </>
      ) : (
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white/80 hover:text-pink-300 transition-all"
          title="Open Sidebar"
        >
          <FaBars size={18} />
        </button>
      )}
    </header>
  );
};

export default ChatSidebarHeader;
