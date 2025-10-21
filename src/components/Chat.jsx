import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import "./styles/ChatTheme.css";
import ChatWindow from "./ChatWindow";
import ChatSidebar from "./ChatSidebar";
import { useChatSocket } from "../hooks/useChatSocket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const typingTimeoutRef = useRef(null);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  // 🟢 Fetch chat list (recent chats)
  const fetchChatList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/users-list`, {
        withCredentials: true,
      });
      const users = res?.data?.users || [];
      setChatList(users);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  };

  // 🟢 Fetch messages for selected chat
  const fetchChatMessages = async (targetUserId) => {
    if (!targetUserId) return;
    try {
      setLoading(true);
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
      scrollToBottom();
    } catch (err) {
      console.error("Failed to fetch chat messages", err);
    } finally {
      setLoading(false);
    }
  };

  // 🟣 Fetch chats on mount
  useEffect(() => {
    fetchChatList();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChat = (userDetails) => {
    setMessages([]); // clear previous messages
    setChatPartner(userDetails);
    setActiveChatUserId(userDetails._id);
    fetchChatMessages(userDetails._id);
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
    <div
      className="mt-16 flex flex-1 overflow-hidden border border-white/20 
      bg-gradient-to-br from-[#15072b] via-[#2a0e4a] to-[#3e1b6b]
      shadow-[0_0_25px_rgba(236,72,153,0.25)] backdrop-blur-2xl"
    >
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chatList={chatList}
        handleChat={handleChat}
        activeChatUserId={activeChatUserId}
      />

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
        loading={loading}
      />
    </div>
  );
};

export default Chat;
