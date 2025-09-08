import { IoSend } from "react-icons/io5";
import chatDark from "../assets/bg-chatUI.jpg";
import PropTypes from "prop-types";

const ChatWindow = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  handleTyping,
  messagesEndRef,
  chatPartner,
  user,
  isTyping,
  isOnline,
}) => {
  console.log(chatPartner, "chatPartner hlo");

  return (
    <div
      className="chat-bg flex-1 flex flex-col h-[calc(100vh-4rem)] relative"
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
          <span className="text-[12px] text-[var(--text-muted)]">
            {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </header>

      {/* Messages */}
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

      {/* Input */}
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
              if (e.key === "Enter") {
                sendMessage(newMessage);
                setNewMessage("");
              }
            }}
            className="flex-1 bg-transparent text-white px-2 outline-none border-none"
          />
          <button
            onClick={() => {
              sendMessage(newMessage);
              setNewMessage("");
            }}
            disabled={!newMessage.trim()}
            className="ml-2 bg-green-500 rounded-full p-2 flex items-center justify-center disabled:opacity-50"
          >
            <IoSend size={20} className="text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      userId: PropTypes.string,
      text: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleTyping: PropTypes.func.isRequired,
  messagesEndRef: PropTypes.shape({ current: PropTypes.any }),
  chatPartner: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userId: PropTypes.string,
  }),
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  isTyping: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
};

export default ChatWindow;
