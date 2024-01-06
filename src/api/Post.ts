import { Post } from "@/types/Post";
import { DummyApiResponse } from "@/types/DummyApiResponse";

import api from "./AxiosConfig";

async function getAllPost(): Promise<DummyApiResponse<Post>> {
  const { data } = await api.get<DummyApiResponse<Post>>("/post");

  return data;
}

export { getAllPost };
