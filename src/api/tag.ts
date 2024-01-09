import { Post } from "@/types/Post";
import { PaginateApiResponse, Pagination } from "@/types/Paginate";

import api from "./axiosConfig";

async function getTags({
  page = 0,
  limit = 20,
}: Pagination): Promise<PaginateApiResponse<string>> {
  const { data } = await api.get<PaginateApiResponse<string>>("/tag", {
    params: { limit, page },
  });

  return data;
}

export { getTags };
