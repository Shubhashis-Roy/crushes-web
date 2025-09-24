import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";

const ChatSidebar = ({ sidebarOpen, setSidebarOpen, chatList, handleChat }) => {
  return (
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
        {chatList.length !== 0
          ? chatList.map((chat) => (
              <li
                key={chat.userId}
                onClick={() => handleChat(chat)}
                className="cursor-pointer px-4 py-3 border-b border-gray-700 flex items-center gap-3 hover:bg-gray-600"
              >
                {chat.photoUrl?.length > 0 ? (
                  <img
                    src={chat.photoUrl[0]}
                    alt={`${chat.firstName}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
                    {chat?.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                )}
                {sidebarOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--text-light)] truncate">
                      {chat.firstName} {chat.lastName}
                    </div>
                  </div>
                )}
              </li>
            ))
          : sidebarOpen && (
              <li className="pr-4 pl-6 py-3 text-[var(--text-muted)]">
                No chats yet
              </li>
            )}
      </ul>
    </aside>
  );
};

ChatSidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  chatList: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      photoUrl: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  handleChat: PropTypes.func.isRequired,
};

export default ChatSidebar;
