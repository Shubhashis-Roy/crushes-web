declare interface ErrorResponseTypes {
  message?: string;
  // eslint-disable-next-line
  [key: string]: any;
}

interface errorDataTypes {
  message: string;
  alreadyPresentUser: object;
}

declare interface AxiosErrorResponseTypes {
  response?: {
    data: errorDataTypes;
    status: number;
    statusText: string;
  };
  message: string;
}

declare interface errorHandleTypes {
  error: object;
  label?: string;
}
