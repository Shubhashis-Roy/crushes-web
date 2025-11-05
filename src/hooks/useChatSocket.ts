import { useEffect, useRef } from "react";
import { createSocketConnection } from "@services/socket/socket";

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

  // ✅ only init once (not on every user change)
  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.on("connect", () =>
      console.log("🟢 Socket connected:", socketRef.current.id)
    );

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
      if (statusUserId === targetUserId) setIsOnline(status === "online");
    });

    return () => socketRef.current?.disconnect();
  }, [userId]); // ✅ only reinit when your own user changes

  // ✅ rejoin when chat partner changes
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
    if (socketRef.current)
      socketRef.current.emit("typing", { userId, targetUserId });
  };

  return { sendMessage, handleTyping };
};
