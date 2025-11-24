declare interface requestStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  requests: requestsDetailsTypes[];
}

declare interface requestsDetailsTypes {
  _id: string;
  fromUserId: fromUserIdTypes;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

declare interface fromUserIdTypes {
  _id: string;
  firstName: string;
  lastName: string;
  city?: string;
  photoUrl: {
    url: string;
    public_id: string;
  }[];
  gender?: string;
  bio?: string;
  age?: number;
  dateOfBirth?: string;
}

declare interface reviewRequestPayloadTypes {
  status: string;
  userId: string;
}

declare interface requestsDetailsTypes {
  requestDetails: connectionsDetailsTypes;
  _id: string;
}
