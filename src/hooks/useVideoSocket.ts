import React, { useEffect, useRef } from "react";
import { getSocket } from "@services/socket/socket";

interface useVideoSocketProps {
  user: userDetailsTypes;
  userId: string;
  targetUserId: string | null;
}

export const useVideoSocket = ({
  user,
  userId,
  targetUserId,
}: useVideoSocketProps) => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!userId) return;

    socketRef.current = getSocket();
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
};
