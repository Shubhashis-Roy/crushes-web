import React, { useEffect, useRef } from "react";
import { getSocket } from "@services/socket/socket";

interface useChatSocketProps {
  user: userDetailsTypes;
  userId: string;
  targetUserId: string | null;
  setMessages: React.Dispatch<React.SetStateAction<msgTypes[]>>;
  setIsTyping: (arg0: boolean) => void;
  setIsOnline: (arg0: boolean) => void;
  messagesEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

interface msgTypes {
  firstName: string;
  lastName: string;
  text: string;
}

export const useChatSocket = ({
  user,
  userId,
  targetUserId,
  setMessages,
  setIsTyping,
  setIsOnline,
  messagesEndRef,
}: useChatSocketProps) => {
  const socketRef = useRef<any>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId) return;

    socketRef.current = getSocket();

    //! FOR TESTING
    // socketRef.current.on("connect", () => {
    //   console.log("Socket connected:", socketRef.current.id);
    // });

    // socketRef.current.on("disconnect", (reason: string) => {
    //   console.warn("Socket disconnected:", reason);
    // });

    // socketRef.current.on("connect_error", (err: AxiosErrorResponseTypes) => {
    //   console.error("Socket connection error:", err.message);
    // });

    socketRef.current.on("messageReceived", (msg: msgTypes) => {
      setMessages((prev) => (Array.isArray(prev) ? [...prev, msg] : [msg]));
      scrollToBottom();
    });

    socketRef.current.on("typing", (typingUserId: string) => {
      if (typingUserId !== userId) {
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current as NodeJS.Timeout);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    });

    socketRef.current.on(
      "userStatus",
      (statusUserId: { userId: string; status: string }, status: string) => {
        console.log("statusUserId:", statusUserId, status);
        console.log("targetUserId: ", targetUserId, status);

        if (statusUserId?.status === "online") {
          setIsOnline(true);
        }
      }
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.off("messageReceived");
        socketRef.current.off("typing");
        socketRef.current.off("userStatus");
      }
    };
  }, [userId]);

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
