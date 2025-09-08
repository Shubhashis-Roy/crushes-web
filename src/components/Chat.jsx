import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import chatDark from "../assets/bg-chatUI.jpg";
// import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaBars } from "react-icons/fa";
import "./styles/ChatTheme.css";
import ChatWindow from "./ChatWindow";
import { useChatSocket } from "../hooks/useChatSocket";

const Chat = () => {
  // const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [activeChatUserId, setActiveChatUserId] = useState(null);

  const typingTimeoutRef = useRef(null);

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async (targetUserId) => {
    if (!targetUserId) return;

    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });

      const chatMessages = res?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          userId: senderId?._id,
          text,
          createdAt,
        };
      });
      setMessages(chatMessages);

      if (chatMessages.length > 0) {
        const partnerMsg = chatMessages.find((msg) => msg.userId !== userId);
        setChatPartner(partnerMsg ?? null);
      } else {
        setChatPartner(null);
      }
      scrollToBottom();
    } catch (err) {
      console.error("Failed to fetch chat messages", err);
    }
  };

  const fetchChatList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/users-list`, {
        withCredentials: true,
      });
      setChatList(res?.data?.users);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChat = (userDetails) => {
    fetchChatMessages(userDetails._id);
    setActiveChatUserId(userDetails._id);
  };

  const { sendMessage, handleTyping } = useChatSocket({
    user,
    userId,
    targetUserId: activeChatUserId,
    setMessages,
    setIsTyping,
    setIsOnline,
    messagesEndRef,
    typingTimeoutRef,
  });

  return (
    <div className="chat-whatsapp-theme  flex-1 flex text-white mt-16 relative overflow-hidden rounded-md shadow-lg border border-gray-700">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--bg-sidebar)] overflow-y-auto border-r border-gray-700 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-80" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <header className="py-[10.5px] pr-4 pl-6 font-semibold text-lg border-b border-gray-700 text-[var(--text-light)] flex justify-between items-center">
          {sidebarOpen ? (
            <>
              <span>Chats</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white"
              >
                ✕
              </button>
            </>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="text-white">
              <FaBars size={20} />
            </button>
          )}
        </header>

        {/* Chat List */}
        <ul className="divide-y divide-gray-700">
          {chatList.length !== 0
            ? chatList.map((chat) => {
                // const isActive = chat.userId === targetUserId;
                return (
                  <li
                    key={chat.userId}
                    onClick={() => handleChat(chat)}
                    // className={`cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 hover:bg-gray-600 ${
                    //   isActive ? "bg-gray-700" : ""
                    // }`}
                    className={`cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 hover:bg-gray-600 `}
                  >
                    {chat.photoUrl?.length > 0 ? (
                      <img
                        src={chat.photoUrl[0]}
                        alt={`${chat.firstName}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                        {chat?.firstName?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    {sidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-[var(--text-light)] truncate">
                          {chat.firstName} {chat.lastName}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })
            : sidebarOpen && (
                <li className="pr-4 pl-6 py-3 text-[var(--text-muted)]">
                  No chats yet
                </li>
              )}
        </ul>
      </aside>

      {/* Chat area */}
      <ChatWindow
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        handleTyping={handleTyping}
        messagesEndRef={messagesEndRef}
        chatPartner={chatPartner}
        user={user}
        isTyping={isTyping}
        isOnline={isOnline}
      />
    </div>
  );
};

export default Chat;
