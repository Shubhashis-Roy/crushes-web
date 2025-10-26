declare interface ErrorResponseTypes {
  message?: string;
  // eslint-disable-next-line
  [key: string]: any;
}

declare interface AxiosErrorResponseTypes {
  response?: {
    data: object;
    status: number;
    statusText: string;
  };
  message: string;
}

declare interface errorHandleTypes {
  error: object;
  label?: string;
}
