import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

// for local it not work in production
// export const createSocketConnection = () => {
//   return io(BASE_URL);
// };

// FOR PRODUCTION
export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
