import { useState, useRef } from "react";
import "@styles/ChatTheme.css";
import { useChatSocket } from "@hooks/useChatSocket";
import ChatSidebar from "@sections/chat/ChatSidebar";
import ChatWindow from "@sections/chat/ChatWindow";
import { dispatch, useSelector } from "@redux/store";
import { getChatMessages } from "@redux/slices/chat";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const typingTimeoutRef = useRef(null);
  const userDetails = useSelector((state) => state.auth.userDetails);
  const startChat = useSelector((state) => state.chat.startChat);
  const userId = userDetails?._id;
  const messagesEndRef = useRef(null);

  // Fetch messages for selected chat
  const fetchChatMessages = async (targetUserId: string) => {
    if (!targetUserId) return;
    const res = await dispatch(getChatMessages(targetUserId));

    const chatMessages = res?.map((msg) => {
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
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   console.log(startChat?._id, "startChat call hlo");
  //   if (!startChat?._id) return;
  //   handleChat(startChat);
  // }, [startChat?._id]);

  const handleChat = (userDetails) => {
    console.log("fn call hlo");

    if (!userDetails?._id) return;
    setMessages([]);
    setChatPartner(userDetails);
    setActiveChatUserId(userDetails._id);
    fetchChatMessages(userDetails._id);
  };

  const { sendMessage, handleTyping } = useChatSocket({
    user: userDetails,
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
        user={userDetails}
        isTyping={isTyping}
        isOnline={isOnline}
        loading={loading}
      />
    </div>
  );
};

export default Chat;
