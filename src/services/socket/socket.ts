import { io, Socket } from "socket.io-client";

// const BASE_URL = "http://localhost:3001";
const BASE_URL =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (socket) return socket;

  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";

  socket = io(isLocal ? BASE_URL : "/", {
    path: isLocal ? undefined : "/api/socket.io",
    transports: ["websocket"],
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  //! FOR TESTING
  // socket.on("connect", () => console.log("Socket connected:"));
  // socket.on("disconnect", (reason) => console.warn("Disconnected:", reason));
  // socket.on("connect_error", (err) =>
  //   console.error("⚠️ Connection error:", err.message)
  // );

  return socket;
};
