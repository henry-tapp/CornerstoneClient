import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { getUseQueryOptions } from "util/queryOptions";
import { Queries } from "../../api";
import { UsePlanData, UsePlanProps } from "./usePlan.types";
/**
 * A hook to retrieve {@link Schedule} data.
 */
export function usePlan({ disableSuspense, disabled }: UsePlanProps): UsePlanData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getPlan(),
    async () => {
      const response = await api.getPlan()
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    getUseQueryOptions(Queries.getPlan(), disabled, disableSuspense)
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}



