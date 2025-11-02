import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import auth from "./slices/auth";
import user from "./slices/user";
import feed from "./slices/feed";
import connection from "./slices/connection";
import request from "./slices/request";
import chat from "./slices/chat";

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  blacklist: [],
  // blacklist: ["connection", "user", "feed", "request", "chat"],
  // whitelist: [],
};

const rootReducer = combineReducers({
  auth: auth,
  user: user,
  connection: connection,
  feed: feed,
  request: request,
  chat: chat,
});

export { rootPersistConfig, rootReducer };
