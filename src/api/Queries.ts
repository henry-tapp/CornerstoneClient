import { Reservation } from "../types/Reservation";

/**
 * ALL queries used for caching with the @tanstack/react-query library
 * should be defined here for consistency.
 *
 * A query can be a simple constant array OR a function that given certain parameters
 * generates a constant key array.
 *
 * queries can be used by other queries to build a query hierarchy, for example
 * the `allReservations` query below spreads the `allReservations`
 * query into its output array and then adds the specific attractionId to the array.
 */
export const Queries = {
  getTags: (tagName?: string) => ["getTags", tagName] as const,
  allReservations: (
    filter?: { [key in keyof Partial<Reservation>]: any }, //string | null | undefined },
    fields?: (keyof Reservation)[]
  ) => ["reservations", { filter, fields }] as const,
  detailReservation: (id: string | null | undefined) =>
    [...Queries.allReservations({ id: id })] as const,
  allShopItems: () => ["shopitems"] as const,
  detailShopItems: (id: string | null | undefined) =>
    [...Queries.allShopItems(), id] as const,
  allAttractions: () => ["attractions"] as const,
  detailAttraction: (id: string | null | undefined) =>
    [...Queries.allAttractions(), id] as const,
  reservationBarcode: (barcodeUrl?: string) =>
    ["reservationBarcode", barcodeUrl] as const,
  root: ["root"] as const,
};
