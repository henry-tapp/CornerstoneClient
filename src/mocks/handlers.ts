import { getScheduleHandler, getScheduleWeekHandler } from "./handlers/scheduleHandlers";

export const handlers = [
  getScheduleHandler(),
  getScheduleWeekHandler()
];
