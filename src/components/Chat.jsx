import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { FaBars } from "react-icons/fa";
import "./styles/ChatTheme.css";
import chatDark from "../assets/bg-chatUI.jpg";
import { IoSend } from "react-icons/io5";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false); // 👈 NEW state
  const [isOnline, setIsOnline] = useState(false);

  const typingTimeoutRef = useRef(null); // 👈 NEW ref

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const fetchChatMessages = async () => {
    if (!targetUserId) return;

    try {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      const chatMessages = res?.data?.messages.map((msg) => {
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

      if (chatMessages.length > 0) {
        const partnerMsg = chatMessages.find((msg) => msg.userId !== userId);
        setChatPartner(partnerMsg ?? null);
      } else {
        setChatPartner(null);
      }
      scrollToBottom();
    } catch (err) {
      console.error("Failed to fetch chat messages", err);
    }
  };

  const fetchChatList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/list`, {
        withCredentials: true,
      });
      setChatList(res.data);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  };

  // useEffect(() => {
  //   fetchChatList();
  // }, []);

  useEffect(() => {
    fetchChatMessages();
    // eslint-disable-next-line
  }, [targetUserId]);

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

        // hide "typing..." after 2s of no event
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    });

    socketRef.current.on("userStatus", ({ userId: statusUserId, status }) => {
      if (statusUserId === targetUserId) {
        setIsOnline(status === "online");
      }
    });
    return () => {
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line
  }, [userId, targetUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    setNewMessage("");
  };

  const handleTyping = () => {
    socketRef.current.emit("typing", { userId, targetUserId });
  };

  return (
    <div className="chat-whatsapp-theme  flex-1 flex text-white mt-16 relative overflow-hidden rounded-md shadow-lg border border-gray-700">
      {/* Sidebar */}
      <aside
        className={`bg-[var(--bg-sidebar)] overflow-y-auto border-r border-gray-700 transition-all duration-300 flex flex-col ${
          sidebarOpen ? "w-80" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <header className="py-[10.5px] pr-4 pl-6 font-semibold text-lg border-b border-gray-700 text-[var(--text-light)] flex justify-between items-center">
          {sidebarOpen ? (
            <>
              <span>Chats</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white"
              >
                ✕
              </button>
            </>
          ) : (
            <button onClick={() => setSidebarOpen(true)} className="text-white">
              <FaBars size={20} />
            </button>
          )}
        </header>

        {/* Chat List */}
        <ul className="divide-y divide-gray-700">
          {chatList.length === 0 ? (
            chatPartner ? (
              // Show active chat if no list
              <li
                key={chatPartner.userId || "active"}
                onClick={() =>
                  navigate(`/chat/${chatPartner.userId || targetUserId}`)
                }
                className="cursor-pointer pr-4 pl-6 py-3 border-b border-gray-700 flex items-center gap-3 bg-[var(--bg-sidebar)]"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-500 text-white font-bold text-lg">
                  {chatPartner?.firstName?.[0]?.toUpperCase() || "?"}
                </div>
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[15px] text-[var(--text-light)] truncate">
                      {chatPartner.firstName} {chatPartner.lastName}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] truncate">
                      Active Chat
                    </div>
                  </div>
                )}
              </li>
            ) : (
              sidebarOpen && (
                <li className="pr-4 pl-6 py-3 text-[var(--text-muted)]">
                  No chats yet
                </li>
              )
            )
          ) : (
            chatList.map((chat) => {
              const isActive = chat.userId === targetUserId;
              return (
                <li
                  key={chat.userId}
                  onClick={() => navigate(`/chat/${chat.userId}`)}
                  className={`cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 hover:bg-gray-600 ${
                    isActive ? "bg-gray-700" : ""
                  }`}
                >
                  <img
                    src={chat.photoUrl || "/default-profile.png"}
                    alt={`${chat.firstName} ${chat.lastName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {sidebarOpen && (
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[var(--text-light)] truncate">
                        {chat.firstName} {chat.lastName}
                      </div>
                    </div>
                  )}
                </li>
              );
            })
          )}
        </ul>
      </aside>

      {/* Chat area */}
      <div
        className="chat-bg flex-1 flex flex-col h-[calc(100vh-4rem)] relative"
        // 👆 ensures full height minus top margin (mt-16 = 4rem)
        style={{
          backgroundImage: `url(${chatDark})`,
          backgroundRepeat: "repeat",
          backgroundSize: "contain",
        }}
      >
        {/* Background Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        ></div>

        {/* Chat Header */}
        <header className="py-1 px-4 border-b border-gray-700 flex items-center gap-3 bg-[var(--bg-sidebar)] relative z-10">
          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
            {chatPartner?.firstName?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[var(--text-light)] text-[15px]">
              {chatPartner
                ? `${chatPartner.firstName} ${chatPartner.lastName}`
                : "Loading..."}
            </span>
            {/* <span className="text-[12px] text-[var(--text-muted)]">
              {isTyping ? "Typing..." : "Online"}
            </span> */}

            <span className="text-[12px] text-[var(--text-muted)]">
              {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
            </span>
          </div>

          {chatPartner.userId === "6839f1d1133f2ccbd6245df1" && (
            <div className="flex flex-col ml-10">
              <span className="text-[14px]">
                FOR TESTING: Rinki Das account login details:
              </span>
              <span className="text-[14px]">
                Email: rinki@gmail.in || Password: Subhashis@9
              </span>
            </div>
          )}
        </header>

        {/* Messages Area (fills available space) */}
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-2 relative z-10">
          {messages.map((msg, idx) => {
            const isOwn = user.firstName === msg.firstName;
            return (
              <div
                key={idx}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 max-w-[60%] text-sm rounded-lg ${
                    isOwn
                      ? "bubble-out rounded-tr-none"
                      : "bubble-in rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-gray-400 text-right mt-1">
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        {/* Chat Input (always bottom) */}
        <footer className="px-4 pb-2 bg-transparent relative z-10">
          <div className="flex items-center bg-[#2a3942] rounded-full px-3 py-[6px] w-full">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                handleTyping();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              className="flex-1 bg-transparent text-white px-2 outline-none border-none"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="ml-2 bg-green-500 rounded-full p-2 flex items-center justify-center disabled:opacity-50"
            >
              <IoSend size={20} className="text-white" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
