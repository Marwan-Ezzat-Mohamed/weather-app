// useOfflineQuery.ts
import {
  useQuery as useReactQuery,
  UseQueryOptions,
  QueryKey,
} from "@tanstack/react-query";

const isOnline = () => {
  return navigator.onLine;
};

export const useOfflineQuery = <TData, TError>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  config: UseQueryOptions<TData, TError> = {}
) => {
  const queryConfig: UseQueryOptions<TData, TError> = {
    ...config,
    initialData: isOnline()
      ? undefined
      : JSON.parse(localStorage.getItem(JSON.stringify(queryKey)) || "null"),
    onError: (error) => {
      // Check if we are offline, and if so, ignore the error and return cached data
      if (!isOnline()) {
        return;
      }

      if (config.onError) {
        config.onError(error);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem(JSON.stringify(queryKey), JSON.stringify(data));
      if (config.onSuccess) {
        config.onSuccess(data);
      }
    },
  };

  return useReactQuery(queryKey, queryFn, queryConfig);
};
