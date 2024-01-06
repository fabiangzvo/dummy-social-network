export interface Post {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: Array<unknown>;
  publishDate: string;
  owner: unknown;
}
