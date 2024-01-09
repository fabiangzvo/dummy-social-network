import { useReducer, useCallback } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import {
  PaginationHook,
  DataFetchProps,
  paginationActionType,
} from "@/types/Paginate";

function PaginationReducer(
  state: PaginationHook,
  action: paginationActionType
) {
  const { payload, property } = action;

  return { ...state, [property]: payload };
}

function useDataFetch(props: DataFetchProps) {
  const { fetchData } = props;

  const [{ hasMore, loading, page }, setPagination] = useReducer(
    PaginationReducer,
    { hasMore: true, page: 0, loading: false }
  );

  const handleLoadMore = useCallback(async () => {
    setPagination({ property: "loading", payload: true });

    const { total } = await fetchData({ page });

    setPagination({ property: "page", payload: page + 1 });
    setPagination({ property: "loading", payload: false });
    setPagination({ property: "hasMore", payload: total >= (page | 1) * 20 });
  }, [fetchData, page]);

  const reset = useCallback(() => {
    setPagination({ property: "page", payload: 0 });
    setPagination({ property: "loading", payload: false });
    setPagination({ property: "hasMore", payload: true });
  }, []);

  const [ref] = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasMore,
    onLoadMore: handleLoadMore,
    rootMargin: "0px 0px 400px 0px",
  });

  return { ref, loading, page, reset };
}

export default useDataFetch;
