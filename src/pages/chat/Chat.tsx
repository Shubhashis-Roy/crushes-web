import { useState, useRef, useEffect } from "react";
import "@styles/ChatTheme.css";
import { useChatSocket } from "@hooks/useChatSocket";
import ChatSidebar from "@sections/chat/ChatSidebar";
import ChatWindow from "@sections/chat/ChatWindow";
import { dispatch, useSelector } from "@redux/store";
import { clearChattingUser, getChatMessages } from "@redux/slices/chat";

interface msgTypes {
  firstName: string;
  lastName: string;
  text: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<msgTypes[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState<chatUserDetailsTypes | null>(
    null
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [isStartChatLoading, setIsStartChatLoading] = useState(false);

  const userDetails = useSelector((state) => state.auth.userDetails);
  const newStartChat = useSelector((state) => state.chat.newStartChat);
  const userId = userDetails?._id;
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!newStartChat?._id) return;
    handleChat(newStartChat);
    dispatch(clearChattingUser());
  }, []);

  //Fetch messages for selected chat
  const fetchChatMessages = async (targetUserId: string) => {
    if (!targetUserId) return;
    setIsStartChatLoading(true);
    const res = await dispatch(getChatMessages(targetUserId));

    const chatMessages = res?.map((msg: chatMessagesTypes) => {
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
    setIsStartChatLoading(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //Chat open handler
  const handleChat = (userDetails: chatUserDetailsTypes) => {
    if (!userDetails?._id) return;
    setMessages([]);
    setChatPartner(userDetails);
    setActiveChatUserId(userDetails._id);
    fetchChatMessages(userDetails._id);
  };

  //Socket Hook
  const { sendMessage, handleTyping } = useChatSocket({
    user: userDetails,
    userId,
    targetUserId: activeChatUserId,
    setMessages,
    setIsTyping,
    setIsOnline,
    messagesEndRef,
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
        isStartChatLoading={isStartChatLoading}
      />
    </div>
  );
};

export default Chat;
