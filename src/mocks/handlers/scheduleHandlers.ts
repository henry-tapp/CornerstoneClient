import { getSchedule } from "mocks/examples/scheduleExamples";
import { rest } from "msw";

const getApiUrl = (path?: string) => {
  return `http://localhost:3000/${path ?? ""}`;
};

export function getScheduleHandlers() {
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
