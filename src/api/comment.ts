import { Comment } from "@/types/Comments";
import { PaginateApiResponse, Pagination } from "@/types/Paginate";

import api from "./axiosConfig";

type CommentsByPostFunction = Pagination & { postId: string };

async function getCommentsByPost(
  params: CommentsByPostFunction
): Promise<PaginateApiResponse<Comment>> {
  const { page = 0, limit = 20, postId } = params;

  const { data } = await api.get<PaginateApiResponse<Comment>>(
    `/post/${postId}/comment`,
    {
      params: { limit, page },
    }
  );

  return data;
}

export { getCommentsByPost };
