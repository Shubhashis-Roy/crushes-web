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
  loading,
}) => {
  const hasChat = !!chatPartner;

  return (
    <div
      className="flex-1 flex flex-col h-[calc(100vh-5rem)] relative text-white"
      style={{
        backgroundImage: `linear-gradient(160deg, #1a052c 0%, #2c0b45 50%, #3e1862 100%), url(${chatDark})`,
        backgroundBlendMode: "overlay",
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      {/* Header */}
      {hasChat && (
        <header className="py-2 px-4 border-b border-white/10 flex items-center gap-3 bg-[#2a0e4a]/70 relative z-10">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
            {chatPartner?.photoUrl?.length > 0 ? (
              <img
                src={chatPartner.photoUrl[0]}
                alt={chatPartner.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-bold text-pink-300">
                {chatPartner?.firstName?.[0]?.toUpperCase() || "?"}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] text-white">
              {`${chatPartner.firstName} ${chatPartner.lastName}`}
            </span>
            <span className="text-[12px] text-white/50">
              {isTyping ? "Typing..." : isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </header>
      )}

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3 relative z-10 scrollbar-thin scrollbar-thumb-pink-400/30 scrollbar-track-transparent">
        {!hasChat ? (
          <div className="flex h-full items-center justify-center text-white/50 italic">
            💬 Start chatting to see messages here...
          </div>
        ) : loading ? (
          <div className="flex h-full items-center justify-center text-white/50 italic animate-pulse">
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-white/50 italic">
            No messages yet — say hello 👋
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isOwn = user.firstName === msg.firstName;
            return (
              <div
                key={idx}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 max-w-[60%] text-sm rounded-xl shadow-md backdrop-blur-sm ${
                    isOwn
                      ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-tr-none"
                      : "bg-white/10 text-white rounded-tl-none"
                  }`}
                >
                  {msg.text}
                  <div className="text-[10px] text-white/50 text-right mt-1">
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
          })
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="px-4 pb-2 bg-transparent relative z-10">
        <div
          className={`flex items-center px-3 py-[6px] w-full rounded-full transition-all ${
            hasChat
              ? "bg-white/10 border border-white/10 backdrop-blur-md shadow-[0_0_10px_rgba(236,72,153,0.25)]"
              : "bg-white/5 border border-white/5 opacity-50 cursor-not-allowed"
          }`}
        >
          <input
            type="text"
            placeholder={
              hasChat
                ? "Type your message..."
                : "Select a chat to start messaging..."
            }
            value={newMessage}
            disabled={!hasChat}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && hasChat) {
                sendMessage(newMessage);
                setNewMessage("");
              }
            }}
            className="flex-1 bg-transparent text-white placeholder:text-white/50 px-2 outline-none border-none disabled:cursor-not-allowed"
          />
          <button
            onClick={() => {
              if (!hasChat || !newMessage.trim()) return;
              sendMessage(newMessage);
              setNewMessage("");
            }}
            disabled={!hasChat || !newMessage.trim()}
            className={`ml-2 rounded-full p-2 flex items-center justify-center transition-all ${
              hasChat
                ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                : "bg-gray-600 opacity-50 cursor-not-allowed"
            }`}
          >
            <IoSend size={18} className="text-white" />
          </button>
        </div>
      </footer>
    </div>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.array.isRequired,
  newMessage: PropTypes.string.isRequired,
  setNewMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  handleTyping: PropTypes.func.isRequired,
  messagesEndRef: PropTypes.object,
  chatPartner: PropTypes.object,
  user: PropTypes.object.isRequired,
  isTyping: PropTypes.bool.isRequired,
  isOnline: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ChatWindow;
