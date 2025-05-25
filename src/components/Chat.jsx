import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import chatImage from "../../public/chatBackground.jpg";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatPartner, setChatPartner] = useState(null);
  const [chatList, setChatList] = useState([]); // List of chat partners/conversations
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch chat messages for current target user
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

      // Set chat partner info by extracting from messages or fallback
      if (chatMessages.length > 0) {
        // Assume partner is anyone not current user
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

  // Fetch list of chats (partners) for side menu
  const fetchChatList = async () => {
    try {
      // Example endpoint: get all chat partners for the logged in user
      const res = await axios.get(`${BASE_URL}/chat/list`, {
        withCredentials: true,
      });
      // Assuming response is array of { userId, firstName, lastName, lastMessage, lastMessageAt }
      setChatList(res.data);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  };

  useEffect(() => {
    fetchChatList();
  }, []);

  useEffect(() => {
    fetchChatMessages();
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

    return () => {
      socketRef.current.disconnect();
    };
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

  return (
    <div className="h-[84vh] flex text-white mt-16 relative overflow-hidden rounded-md shadow-lg border border-gray-700">
      {/* Side menu - chat list */}
      <aside className="w-72 bg-gray-800 overflow-y-auto border-r border-gray-700">
        <header className="p-4 font-semibold text-lg border-b border-gray-700 text-pink-400">
          Chats
        </header>
         <ul className="divide-y divide-gray-700">
      {chatList.length === 0 ? (
        chatPartner ? (
          <li
            key={chatPartner.userId || "active"}
            onClick={() =>
              navigate(`/chat/${chatPartner.userId || targetUserId}`)
            }
            className="cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 bg-pink-600"
          >
            <img
              src={chatPartner.photoUrl || "/default-profile.png"}
              alt={`${chatPartner.firstName} ${chatPartner.lastName}`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white truncate">
                {chatPartner.firstName} {chatPartner.lastName}
              </div>
              <div className="text-xs text-gray-300 truncate">Active Chat</div>
            </div>
          </li>
        ) : (
          <li className="p-4 text-gray-400">No chats yet</li>
        )
      ) : (
        chatList.map((chat) => {
          const isActive = chat.userId === targetUserId;
          return (
            <li
              key={chat.userId}
              onClick={() => navigate(`/chat/${chat.userId}`)}
              className={`cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 hover:bg-pink-700 ${
                isActive ? "bg-pink-600" : ""
              }`}
            >
              <img
                src={chat.photoUrl || "/default-profile.png"}
                alt={`${chat.firstName} ${chat.lastName}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate">
                  {chat.firstName} {chat.lastName}
                </div>
                <div className="text-xs text-gray-300 truncate flex items-center gap-1">
                  <span className="flex-1 truncate">{chat.lastMessage || "No messages yet"}</span>
                  {renderStatusIcon(chat.lastMessageStatus)}
                </div>
              </div>
              <div className="text-[10px] text-gray-400 ml-2 whitespace-nowrap">
                {formatTime(chat.lastMessageAt)}
              </div>
            </li>
          );
        })
      )}
    </ul>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col relative">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${chatImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,
            filter: "brightness(0.7)",
            borderTopRightRadius: "0.375rem",
            borderBottomRightRadius: "0.375rem",
          }}
        />

        <header className="p-5 border-b text-xl font-semibold text-white relative z-10">
          Chat with{" "}
          {chatPartner
            ? `${chatPartner.firstName} ${chatPartner.lastName}`
            : "Loading..."}
        </header>

        <main
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scroll-smooth relative z-10"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Messages container */}
          <div>
            {messages.map((msg, idx) => {
              const isOwn = user.firstName === msg.firstName;
              return (
                <div
                  key={idx}
                  className={`flex flex-col max-w-[70%] ${
                    isOwn ? "ml-auto items-end" : "mr-auto items-start"
                  }`}
                >
                  <div
                    className={`inline-block rounded-xl px-4 py-2 mb-1 ${
                      isOwn
                        ? "bg-pink-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    <div className="font-semibold text-sm">
                      {msg.firstName} {msg.lastName}
                    </div>
                    <p className="mt-1 whitespace-pre-wrap">{msg.text}</p>
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString()
                        : ""}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="p-4 border-t border-gray-700 flex items-center gap-3 bg-gray-800 relative z-10">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            className="w-full bg-pink-50 text-black font-semibold px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white font-semibold px-5 py-2 rounded-md transition"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
