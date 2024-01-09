import { Post } from "@/types/Post";
import { PaginateApiResponse, Pagination } from "@/types/Paginate";

import api from "./axiosConfig";

async function getAllPost({
  page = 0,
  limit = 20,
}: Pagination): Promise<PaginateApiResponse<Post>> {
  const { data } = await api.get<PaginateApiResponse<Post>>("/post", {
    params: { limit, page },
  });

  return data;
}

export { getAllPost };
