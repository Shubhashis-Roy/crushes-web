import { useEffect, useRef } from "react";
import { getSocket } from "@services/socket/socket"; // ✅ updated import

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
  const socketRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ initialize socket connection once
  useEffect(() => {
    if (!userId) return;

    socketRef.current = getSocket(); // ✅ use shared instance

    socketRef.current.on("connect", () => {
      console.log("🟢 Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.warn("🔴 Socket disconnected:", reason);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("⚠️ Socket connection error:", err.message);
    });

    socketRef.current.on("messageReceived", (msg) => {
      setMessages((prev) => (Array.isArray(prev) ? [...prev, msg] : [msg]));
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
      // 👇 Instead of disconnecting the socket globally, just clean up listeners
      if (socketRef.current) {
        socketRef.current.off("messageReceived");
        socketRef.current.off("typing");
        socketRef.current.off("userStatus");
      }
    };
  }, [userId]); // ✅ only reinit when your own user changes

  // ✅ rejoin chat room when chat partner changes
  useEffect(() => {
    if (socketRef.current && userId && targetUserId) {
      socketRef.current.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
    }
  }, [userId, targetUserId]);

  const sendMessage = (newMessage: string) => {
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
    socketRef.current?.emit("typing", { userId, targetUserId });
  };

  return { sendMessage, handleTyping };
};
