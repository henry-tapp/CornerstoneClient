import { getSchedule, getScheduleWeek } from "mocks/examples/scheduleExamples";
import { rest } from "msw";

const getApiUrl = (path?: string) => {
  return `http://localhost:3000/${path ?? ""}`;
};

export function getScheduleHandler() {
  return (
    rest.get(getApiUrl("schedule"), (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          getSchedule()
        )
      );
    })
  );
}

export function getScheduleWeekHandler() {

  return (
    rest.get(getApiUrl("schedule/week/:WeekNumber"), (req, res, ctx) => {

      const { WeekNumber } = req.params
      return res(
        ctx.status(200),
        ctx.json(
          getScheduleWeek(parseInt(WeekNumber as string ?? "1"))
        )
      );
    })
  );
}
