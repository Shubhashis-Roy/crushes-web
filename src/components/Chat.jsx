import { useEffect, useState, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import chatDark from "../assets/bg-chatUI.jpg";
// import { IoSend } from "react-icons/io5";
// import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import "./styles/ChatTheme.css";
import ChatWindow from "./ChatWindow";
import { useChatSocket } from "../hooks/useChatSocket";
import ChatSidebar from "./ChatSidebar";

const Chat = () => {
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
    setChatPartner(userDetails);
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
    <div className="chat-whatsapp-theme  flex-1 flex text-white mt-16 relative overflow-hidden rounded-md shadow-lg border border-gray-700  ">
      {/* ============= ChatSidebar ============= */}
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        chatList={chatList}
        handleChat={handleChat}
      />

      {/* ============= Chat area ============= */}
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
