declare interface userStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  profileDetails: profileDetailsTypes;
  //   statusCode: number | string;
}

declare interface profileDetailsTypes {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  dateOfBirth: string;
  city: string;
  gender: string;
  interest: string;
  photoUrl: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
