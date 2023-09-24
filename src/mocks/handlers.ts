import { getAttractionHandlers } from "./handlers/attractionHandler";
import { getReservationHandlers } from "./handlers/reservationHandler";
import { getRootHandlers } from "./handlers/rootHandler";

/**
 * We can setup handlers however we want here utilising things like
 * localStorage/sessionStorage to create more complex API interaction
 * mockings.
 */
export const handlers = [
  getRootHandlers(),
  getAttractionHandlers(),
  getReservationHandlers(),
];
