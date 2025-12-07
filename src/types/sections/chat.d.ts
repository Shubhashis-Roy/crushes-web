declare interface ChatSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  handleChat: (arg0: chatUserDetailsTypes) => void;
  activeChatUserId: string | null;
}

declare interface ChatWindowProps {
  messages: MessageTypes[];
  newMessage: string;
  setNewMessage: (msg: string) => void;
  sendMessage: (arg0: string) => void;
  handleTyping: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  chatPartner: any;
  user: any;
  isTyping: boolean;
  isOnline: boolean;
  isStartChatLoading: boolean;
}

declare interface chatMessagesTypes {
  senderId: MessageTypes;
  text: string;
  createdAt: string;
}

declare interface MessageTypes {
  _id?: string;
  firstName: string;
  lastName: string;
  text: string;
  createdAt?: string;
  updateAt?: string;
}
