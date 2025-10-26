declare interface authStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  userDetails: userDetailsTypes;
  //   statusCode: number | string;
}

declare interface userDetailsTypes {
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

declare interface signUpPayloadTypes {
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  dob: string;
  city: string;
  interest: string;
  gender: string;
}
