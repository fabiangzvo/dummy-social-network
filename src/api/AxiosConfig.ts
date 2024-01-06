"use client";
import axios from "axios";

import {
  getResponse,
  onRequestConfig,
  rejectResponse,
} from "@shared/AxiosConfig";

const dummyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DUMMY_API_HOST,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "App-id": process.env.NEXT_PUBLIC_DUMMY_APP_ID,
  },
});

dummyApi.interceptors.response.use(getResponse, rejectResponse);

dummyApi.interceptors.request.use(onRequestConfig);

export default dummyApi;
