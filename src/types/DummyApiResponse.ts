export interface DummyApiResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}
