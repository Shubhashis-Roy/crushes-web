declare interface feedStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  feedDetails: feedDetailsTypes[];
}

declare interface feedDetailsTypes {
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
