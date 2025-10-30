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
  photoUrl: string[];
  gender?: string;
  bio?: string;
  age?: number;
}

declare interface reviewRequestPayloadTypes {
  status: string;
  requestId: string;
}
