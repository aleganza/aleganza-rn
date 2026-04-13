import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { toaster } from "../toaster/toaster";

type UseMutationDataProps<TData, TVariables, TError> = UseMutationOptions<
  TData,
  TError,
  TVariables
> & {
  mutationFn: (variables: TVariables) => Promise<TData>;
};

export function useMutationData<TData, TVariables = void, TError = unknown>({
  mutationFn,
  onSuccess,
  ...options
}: UseMutationDataProps<TData, TVariables, TError>): UseMutationResult<
  TData,
  TError,
  TVariables
> {
  return useMutation<TData, TError, TVariables>({
    mutationFn,
    onError: (error) => {
      console.error(error);
      // toaster.error("Error");
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // console.log("Mutation completed:", data);
      // toaster.success("Success");

      if (onSuccess) {
        onSuccess(data, variables, onMutateResult, context);
      }
    },
    ...options,
  });
}
