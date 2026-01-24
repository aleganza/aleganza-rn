import { FetchQueryOptions, QueryKey } from "@tanstack/react-query";

import { queryClient } from "./client";

type FetchQueryDataProps<TData, TError> = Omit<
  FetchQueryOptions<TData, TError>,
  "queryKey" | "queryFn"
> & {
  queryKey: QueryKey;
  fetcher: () => Promise<TData>;
};

export async function fetchQueryData<TData, TError = unknown>({
  queryKey,
  fetcher,
  ...options
}: FetchQueryDataProps<TData, TError>): Promise<TData> {
  return queryClient.fetchQuery({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
}
