declare interface userStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  profileDetails: profileDetailsTypes;
  updatedProfileDetails: profileDetailsTypes;
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
  bio?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare interface updateProfilePayloadTypes {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  city?: string;
  gender?: string;
  interest?: string;
  bio?: string;
}
