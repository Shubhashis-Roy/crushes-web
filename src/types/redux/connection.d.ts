declare interface connectionStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  connections: connectionsDetailsTypes[];
}

declare interface connectionsDetailsTypes {
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
