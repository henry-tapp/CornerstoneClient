import { ApiResponse } from "api";
import { Schedule } from "types";

export function getSchedule() {
  return {
    time: "2023-09-27T14:00:03.000Z",
    expires_in: 1000,
    expires_at: "2023-10-15T14:00:30.000Z",
    data: {
      dateStarting: new Date("2023-07-17"),
      dateEnding: new Date("2023-10-08"),
      numberOfWeeks: 12,
      peakWeek: 11
    }
  } as ApiResponse<Schedule>;
}
