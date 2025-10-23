import { useEffect, useRef } from "react";
import { createSocketConnection } from "@services/socket";

export const useChatSocket = ({
  user,
  userId,
  targetUserId,
  setMessages,
  setIsTyping,
  setIsOnline,
  messagesEndRef,
  typingTimeoutRef,
}) => {
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId) return;
    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socketRef.current.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
      scrollToBottom();
    });

    socketRef.current.on("typing", ({ userId: typingUserId }) => {
      if (typingUserId !== userId) {
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    });

    socketRef.current.on("userStatus", ({ userId: statusUserId, status }) => {
      if (statusUserId === targetUserId) {
        setIsOnline(status === "online");
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line
  }, [userId, targetUserId]);

  const sendMessage = (newMessage) => {
    console.log(newMessage, "newMessage hook hlo ");

    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
  };

  const handleTyping = () => {
    socketRef.current.emit("typing", { userId, targetUserId });
  };

  return { sendMessage, handleTyping };
};
