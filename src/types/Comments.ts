import { UserPreview } from "./User";

export interface Comment {
  id: string;
  message: string;
  owner: UserPreview;
  post: string;
  publishDate: string;
}

export type CommentList = Array<Comment>;
