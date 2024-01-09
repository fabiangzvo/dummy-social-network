export interface PaginateApiResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

export interface Pagination {
  page?: number;
  limit?: number;
}

export interface FetchDataInterface {
  page: number;
}
export interface DataFetchProps {
  fetchData(params: FetchDataInterface): Promise<{ total: number }>;
}

export interface PaginationHook {
  page: number;
  loading: boolean;
  hasMore: boolean;
}

export type paginationActionType = {
  property: "page" | "loading" | "hasMore";
  payload: number | boolean;
};
