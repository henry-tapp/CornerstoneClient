import { useQuery } from "@tanstack/react-query";
import { Queries } from "../../api";
import { useApi } from "hooks/useApi/useApi";
import { UseScheduleData, UseScheduleProps } from "./useSchedule.types";
import { logQuerySettled } from "util/log";
import { Schedule } from "types";

/**
 * A hook to retrieve {@link Schedule} data.
 */
export function useSchedule({ disableSuspense, disabled }: UseScheduleProps): UseScheduleData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getSchedule(),
    async () => {

      const response = await api.getSchedule()
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    {
      enabled: !disabled,
      suspense: disableSuspense ? false : true,
      onSettled: (d, err) =>
        logQuerySettled(Queries.getSchedule(), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}
