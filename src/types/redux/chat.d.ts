declare interface chatStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  startChat: startChatTypes;
  chatUserList: chatUserDetailsTypes[];
  newStartChat: connectionsDetailsTypes;
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
  photoUrl: {
    url: string;
    public_id: string;
  }[];
  emailId?: string;
  dateOfBirth?: string;
  city?: string;
  gender?: string;
  interest?: string;
  bio?: string;
  lastMessage?: string;
}
