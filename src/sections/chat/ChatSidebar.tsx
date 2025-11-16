import { FaVideo } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { dispatch, useSelector } from "@redux/store";
import { getChatUserList } from "@redux/slices/chat";
import { getAllConnections } from "@redux/slices/connection";
import ChatSidebarHeader from "./ChatSidebarHeader";
import VideoCall from "@sections/video/VideoCall";
import ChatSideBarSkeleton from "@shimmer_ui/ChatSideBarSkeleton";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleChat,
  activeChatUserId,
}) => {
  const [chatList, setChatList] = useState([]);
  const [activeTab, setActiveTab] = useState("connections");
  const [showCall, setShowCall] = useState(false);
  const [callTarget, setCallTarget] = useState<chatUserDetailsTypes | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const userDetails = useSelector((state) => state.auth.userDetails);

  async function fetchChatUsers() {
    setLoading(true);
    const res = await dispatch(getChatUserList());
    const result = res?.filter(Boolean);
    setChatList(result);
    setLoading(false);
    if (result?.length) {
      setActiveTab("chats");
    }
  }

  async function fetchConnections() {
    setLoading(true);
    const res = await dispatch(getAllConnections());
    const result = res?.filter(Boolean);
    setChatList(result);
    setLoading(false);
  }

  useEffect(() => {
    fetchChatUsers();
    fetchConnections();
  }, []);

  const handleRecentChats = () => {
    setActiveTab("chats");
    fetchChatUsers();
  };

  const handleAllConnections = () => {
    setActiveTab("connections");
    fetchConnections();
  };

  // const handleVideoClick = () => {
  //   setActiveTab("video");
  //   setChatList([]);
  //   setShowNoUserMsg(true);
  //   setTimeout(() => setShowNoUserMsg(false), 2000);
  // };

  const handleStartVideoCall = (chat: chatUserDetailsTypes) => {
    setCallTarget(chat);
    setShowCall(true);
  };

  return (
    <>
      <aside
        className={`transition-all duration-300 flex flex-col 
        ${sidebarOpen ? "w-80" : "w-16"} 
        bg-gradient-to-b from-[#200a3d] via-[#2a1252] to-[#3a1a5f]
        border-r border-white/10 backdrop-blur-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]`}
      >
        <ChatSidebarHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab={activeTab}
          handleRecentChats={handleRecentChats}
          // handleVideoClick={handleVideoClick}
          handleAllConnections={handleAllConnections}
        />

        {/* Chat List */}
        {loading ? (
          <ChatSideBarSkeleton />
        ) : (
          <ul className="divide-y divide-white/10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
            {chatList.length > 0
              ? chatList.map((chat: chatUserDetailsTypes) => {
                  const isActive = activeChatUserId === chat?._id;
                  return (
                    <li
                      key={chat?._id}
                      onClick={() => handleChat(chat)}
                      className={`cursor-pointer flex items-center gap-3 px-4 py-3 transition-all group ${
                        isActive
                          ? "bg-pink-500/20 shadow-[inset_0_0_10px_rgba(236,72,153,0.5)]"
                          : "hover:bg-white/10"
                      }`}
                    >
                      {chat?.photoUrl?.length > 0 ? (
                        <img
                          src={chat?.photoUrl[0]?.url}
                          alt={chat?.firstName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500/50 text-white font-bold">
                          {chat?.firstName?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}

                      {sidebarOpen && (
                        <div className="flex-1 min-w-0 flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium truncate group-hover:text-pink-300">
                              {chat?.firstName} {chat?.lastName}
                            </p>
                            <p
                              className={`text-xs ${
                                chat?.lastMessage
                                  ? "text-white"
                                  : "text-white/50 truncate italic"
                              }`}
                            >
                              {chat?.lastMessage
                                ? chat?.lastMessage
                                : "Tap to chat"}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStartVideoCall(chat);
                            }}
                            className="ml-3 p-2 rounded-full hover:bg-pink-500/20 text-pink-300 hover:text-pink-200 transition-all"
                            title="Start Video Call"
                          >
                            <FaVideo size={16} />
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })
              : sidebarOpen && (
                  <li className="text-white/50 text-sm px-4 py-4 text-center italic">
                    {activeTab === "chats"
                      ? "No recent chats 💬"
                      : activeTab === "video"
                      ? "No users found 🙃"
                      : "No connections yet 🤝"}
                  </li>
                )}
          </ul>
        )}
      </aside>
      {showCall && callTarget && (
        <VideoCall
          userId={userDetails._id}
          targetUserId={callTarget._id}
          onClose={() => setShowCall(false)}
        />
      )}
    </>
  );
};

export default ChatSidebar;
