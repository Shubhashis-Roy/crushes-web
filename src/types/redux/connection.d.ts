declare interface connectionStateTypes {
  isLoading: boolean;
  error: string | ErrorType;
  connections: connectionsDetailsTypes[];
  interestConnections: interestConnectionsTypes;
  ignoreConnections: interestConnectionsTypes;
}

declare interface connectionsDetailsTypes {
  _id: string;
  firstName: string;
  lastName: string;
  photoUrl: {
    url: string;
    public_id: string;
  }[];
  emailId?: string;
  dateOfBirth?: string;
  city?: string;
  gender?: string;
  interest?: string;
  bio?: string;
}

declare interface sendRequestParamsType {
  status: "ignored" | "interested";
  id: string;
}

declare interface interestConnectionsTypes {
  _id: string;
  fromUserId: string;
  toUserId: string;
  status: string;
  createdAt: string;
}
