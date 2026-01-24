import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

type UseQueryDataProps<TData, TError> = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
  queryKey: readonly unknown[];
  fetcher: () => Promise<TData>;
};

export function useQueryData<TData, TError = unknown>({
  queryKey,
  fetcher,
  ...options
}: UseQueryDataProps<TData, TError>): UseQueryResult<TData, TError> {
  return useQuery<TData, TError>({
    queryKey,
    queryFn: fetcher,
    ...options,
  });
}
