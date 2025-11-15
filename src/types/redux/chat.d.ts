declare interface chatStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  startChat: startChatTypes;
  chatUserList: chatUserDetailsTypes[];
}

declare interface startChatTypes {
  _id: string;
  firstName: string;
  lastName: string;
  city: string;
  photoUrl: string[];
}

declare interface chatUserDetailsTypes {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: string[];
  emailId?: string;
  dateOfBirth?: string;
  city?: string;
  gender?: string;
  interest?: string;
  bio?: string;
  lastMessage?: string;
}
