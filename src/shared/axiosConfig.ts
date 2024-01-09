import { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

function getResponse(response: AxiosResponse) {
  return response;
}

function rejectResponse(error: AxiosError): AxiosError {
  const { message, response: { status = 500 } = {} } = error;

  const messageError = { status, message } as AxiosError;

  if (!status && !message)
    return { status: 500, message: "Request error" } as AxiosError;

  console.error("Intercept: ", messageError);

  return messageError;
}

function onRequestConfig(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  return config;
}

export { onRequestConfig, rejectResponse, getResponse };
