import axios from "axios";

import {
  getResponse,
  onRequestConfig,
  rejectResponse,
} from "@shared/axiosConfig";

const googleApi = axios.create({
  baseURL: "https://www.googleapis.com/oauth2/v3",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

googleApi.interceptors.response.use(getResponse, rejectResponse);

googleApi.interceptors.request.use(onRequestConfig);

export default googleApi;
