import { useQuery } from "@tanstack/react-query";
import { useApi } from "hooks/useApi/useApi";
import { logQuerySettled } from "util/log";
import { Queries } from "../../api";
import { UsePlanData, UsePlanProps, UsePlanWeekData, UsePlanWeekProps } from "./usePlan.types";

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
    {
      enabled: !disabled,
      suspense: disableSuspense ? false : true,
      onSettled: (d, err) =>
        logQuerySettled(Queries.getPlan(), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}

/**
 * A hook to retrieve {@link PlanWeek} data.
 */
export function usePlanWeek({ WeekNumber, disableSuspense, disabled }: UsePlanWeekProps): UsePlanWeekData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getPlanWeek(WeekNumber),
    async () => {

      const response = await api.getPlanWeek(WeekNumber)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    {
      enabled: !disabled && !!WeekNumber,
      suspense: disableSuspense ? false : true,
      refetchOnMount: true,

      onSettled: (d, err) =>
        logQuerySettled(Queries.getPlanWeek(WeekNumber), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}

/**
 * A hook to retrieve {@link ScheduleWeek} data.
 */
export function useSchedulePlanner({ WeekNumber, disableSuspense, disabled }: UsePlanWeekProps): UsePlanWeekData {

  const api = useApi();

  const { data, isLoading, error } = useQuery(
    Queries.getPlanWeek(WeekNumber),
    async () => {

      const response = await api.getPlanWeek(WeekNumber)
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    },
    {
      enabled: !disabled && !!WeekNumber,
      suspense: disableSuspense ? false : true,
      refetchOnMount: true,
      onSettled: (d, err) =>
        logQuerySettled(Queries.getPlanWeek(WeekNumber), d, err),
    }
  );

  return {
    data,
    error: error ? (error as any)?.message : undefined,
    isLoading,
  };
}