import { io } from "socket.io-client";
import { BASE_URL } from "../api-services/axios";

// for local it not work in production
// export const createSocketConnection = () => {
//   return io(BASE_URL);
// };

// FOR PRODUCTION
export const createSocketConnection = () => {
  // console.log(BASE_URL, "BASE_URL hlo");
  // return io(BASE_URL);
  return io("http://localhost:3001");

  // if (location.hostname === "localhost") {
  //   return io(BASE_URL);
  // } else {
  //   return io("/", { path: "/api/socket.io" });
  // }
};
