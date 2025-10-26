export default function errorHandle({ error, label }: errorHandleTypes) {
  const axiosError = error as AxiosErrorResponseTypes;
  console.error(
    `Axios error: ${label}`,
    axiosError.response ? axiosError.response.data : axiosError.message
  );
}
