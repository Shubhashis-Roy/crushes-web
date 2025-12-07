declare interface authStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  userDetails: userDetailsTypes;
  // loginUserDetails: loginUserDetailsTypes;
  //   statusCode: number | string;
}

// declare interface userDetailsTypes {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   emailId: string;
//   dateOfBirth: string;
//   city: string;
//   gender: string;
//   interest: string;
//   photoUrl: string[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

declare interface userDetailsTypes {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  dateOfBirth: string;
  city: string;
  gender: string;
  interest: string;
  photoUrl: {
    url: string;
    public_id: string;
  }[];
  bio: string;
  education: string;
  organization: string;
  profession: string;
  lookingFor: string;
  preferredAge: {
    min: number;
    max: number;
  };
  preferredDistance: number;
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
  interest: string[];
  gender: string;
}

declare interface loginPayloadTypes {
  emailId: string;
  password: string;
}
