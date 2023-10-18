import { useQuery } from "@tanstack/react-query";
import { Queries } from "../../api";
import { useApi } from "hooks/useApi/useApi";
import { UseItemTypesData, UseItemTypesProps } from "./useItems.types";
import { logQuerySettled } from "util/log";

/**
 * A hook to retrieve {@link ItemTypes} data.
 */
export function useItemTypes({ disableSuspense, disabled }: UseItemTypesProps): UseItemTypesData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getItemTypes(),
    async () => {
      const response = await api.getItemTypes()
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    {
      enabled: !disabled,
      suspense: disableSuspense ? false : true,
      onSettled: (d, err) =>
        logQuerySettled(Queries.getItemTypes(), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
