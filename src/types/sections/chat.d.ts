declare interface ChatSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleChat: (arg0: chatUserDetailsTypes) => void;
  activeChatUserId: string | null;
}

declare interface ChatWindowProps {
  messages: string[];
  newMessage: () => void;
  setNewMessage: (msg: string) => void;
  sendMessage: () => void;
  handleTyping: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatPartner: any;
  user: any;
  isTyping: boolean;
  isOnline: boolean;
  loading: boolean;
}
