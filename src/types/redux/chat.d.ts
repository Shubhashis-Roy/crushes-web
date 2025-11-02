declare interface chatStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  chatUserList: chatUserDetailsTypes[];
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
}
