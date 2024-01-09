import { Post } from "@/types/Post";
import { PaginateApiResponse, Pagination } from "@/types/Paginate";

import api from "./axiosConfig";

interface PostByTagInterface extends Pagination {
  tagId: string;
}

async function getPosts({
  page = 0,
  limit = 20,
}: Pagination): Promise<PaginateApiResponse<Post>> {
  const { data } = await api.get<PaginateApiResponse<Post>>("/post", {
    params: { limit, page },
  });

  return data;
}

async function getPostsByTag({
  page = 0,
  limit = 20,
  tagId,
}: PostByTagInterface): Promise<PaginateApiResponse<Post>> {
  const { data } = await api.get<PaginateApiResponse<Post>>(
    `/tag/${tagId}/post`,
    {
      params: { limit, page },
    }
  );

  return data;
}

export { getPosts, getPostsByTag };
