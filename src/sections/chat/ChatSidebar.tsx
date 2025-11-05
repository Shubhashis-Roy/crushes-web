import { FaBars } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { dispatch, useSelector } from "@redux/store";
import { getChatUserList } from "@redux/slices/chat";
import { getAllConnections } from "@redux/slices/connection";
// import { usePreviousRoute } from "@hooks/usePreviousRoute";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  handleChat,
  activeChatUserId,
}) => {
  const [chatList, setChatList] = useState([]);
  const [activeTab, setActiveTab] = useState("chats");
  const loading = useSelector((state) => state.chat.isLoading);
  // const prevRoute = usePreviousRoute();
  // console.log("Previous route hlo:", prevRoute);

  async function fetchChatUsers() {
    const users = await dispatch(getChatUserList());
    setChatList(users);
  }

  useEffect(() => {
    fetchChatUsers();
  }, []);

  const handleRecentChats = () => {
    setActiveTab("chats");
    fetchChatUsers();
  };

  const handleAllConnections = () => {
    setActiveTab("connections");
    async function fetchConnections() {
      const res = await dispatch(getAllConnections());
      setChatList(res);
    }
    fetchConnections();
  };

  return (
    <aside
      className={`transition-all duration-300 flex flex-col 
        ${sidebarOpen ? "w-80" : "w-16"} 
        bg-gradient-to-b from-[#200a3d] via-[#2a1252] to-[#3a1a5f]
        border-r border-white/10 backdrop-blur-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]`}
    >
      {/* Header with tabs + close button */}
      <header className="flex items-center justify-between py-3 px-3 border-b border-white/10 text-sm font-medium text-white/80">
        {sidebarOpen ? (
          <>
            {/* ✅ Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleRecentChats}
                className={`px-4 py-1 rounded-full transition-all ${
                  activeTab === "chats"
                    ? "bg-pink-500/30 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                    : "hover:bg-white/10"
                }`}
              >
                Recent Chats
              </button>
              <button
                onClick={handleAllConnections}
                className={`px-4 py-1 rounded-full transition-all ${
                  activeTab === "connections"
                    ? "bg-pink-500/30 text-pink-200 shadow-[0_0_8px_rgba(236,72,153,0.5)]"
                    : "hover:bg-white/10"
                }`}
              >
                All Connections
              </button>
            </div>

            {/* ✅ Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-white/70 hover:text-pink-300 transition-all text-lg font-semibold"
            >
              ✕
            </button>
          </>
        ) : (
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/80 hover:text-pink-300 transition-all"
          >
            <FaBars size={18} />
          </button>
        )}
      </header>

      {/* Chat List */}
      <ul className="divide-y divide-white/10 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
        {chatList.length > 0
          ? chatList.map((chat: chatUserDetailsTypes) => {
              const isActive = activeChatUserId === chat._id;
              return (
                <li
                  key={chat._id}
                  onClick={() => handleChat(chat)}
                  className={`cursor-pointer flex items-center gap-3 px-4 py-3 transition-all group ${
                    isActive
                      ? "bg-pink-500/20 shadow-[inset_0_0_10px_rgba(236,72,153,0.5)]"
                      : "hover:bg-white/10"
                  }`}
                >
                  {chat.photoUrl?.length > 0 ? (
                    <img
                      src={chat.photoUrl[0]}
                      alt={chat.firstName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    />
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500/50 text-white font-bold">
                      {chat?.firstName?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate group-hover:text-pink-300">
                        {chat.firstName} {chat.lastName}
                      </p>
                      <p className="text-xs text-white/50 truncate italic">
                        {chat?.lastMessage
                          ? chat?.lastMessage?.text
                          : "Tap to chat"}
                      </p>
                    </div>
                  )}
                </li>
              );
            })
          : sidebarOpen && (
              <li className="text-white/50 text-sm px-4 py-4 text-center italic">
                {activeTab === "chats"
                  ? "No recent chats 💬"
                  : "No connections yet 🤝"}
              </li>
            )}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
