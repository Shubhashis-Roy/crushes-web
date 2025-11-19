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
  interest: string[];
  photoUrl: {
    url: string;
    public_id: string;
  }[];
  bio?: string;
  profession?: string;
  organization?: string;
  education?: string;
  lookingFor?: string[];
  preferredAge?: preferredAgeType;
  preferredDistance?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface preferredAgeType {
  min: number;
  max: number;
}

declare interface updateProfilePayloadTypes {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  city?: string;
  gender?: string;
  interest?: string;
  bio?: string;
  interest?: string;
  profession?: string;
  organization?: string;
  education?: string;
  lookingFor?: string[];
  preferredAge?: preferredAgeType;
  preferredDistance?: number;
}
