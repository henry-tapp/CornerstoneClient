import {
  getAllReservationExamples,
  getReservationExamplesById,
} from "mocks/examples/reservationsExamples";
import { rest } from "msw";

import { ReservationState } from "@accesso/loqueue-qsmart-nextgen-shared-components";

const getApiUrl = (path?: string) => {
  // This may require the use of the CRA Proxy during development
  return `http://localhost:3000/v2${path ?? ""}`;
};

export function getReservationHandlers() {
  return (
    rest.get(getApiUrl("/reservations"), (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(getAllReservationExamples()));
    }),
    rest.get(getApiUrl("/reservations/:reservationId"), (req, res, ctx) => {
      let state: ReservationState = "waiting";

      switch (req.params.reservationId) {
        case "1":
          state = "waiting";
          break;
        case "2":
          state = "ready";
          break;
        case "3":
          state = "expires_soon";
          break;
        case "4":
          state = "on_hold";
          break;
      }

      return res(
        ctx.status(200),
        ctx.json(
          getReservationExamplesById(req.params.reservationId as string, state)
        )
      );
    })
  );
}
