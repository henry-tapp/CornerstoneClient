import { logQuerySettled } from "./log";

export function getUseQueryOptions<Q, D, E>(queryKey: Q, disabled: boolean | undefined, disableSuspense: boolean | undefined) {
  return {
    staleTime: 5 * 1000 * 60,
    refetchOnMount: true,
    enabled: !disabled,
    suspense: disableSuspense ? false : true,
    onSettled: (d: D, err: E) => logQuerySettled(queryKey, d, err),
  };
}