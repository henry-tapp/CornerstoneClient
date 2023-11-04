import { ApiResponse } from "api";
import { GetVariation, Item, PlanOptions, ScheduleWeek } from "types";
import { addDaysToDate, addWeeksToDate, getMonday } from "util/dates";

export function getSchedule() {
  return {
    dateStarting: new Date("07/17/2023"),
    dateEnding: new Date("10/09/2023"),
    numberOfWeeks: 12,
    PeakWeekDateStarting: 11
  } as PlanOptions;
}


export const ids = [
  '4e4ecab4-4259-4b0c-9c8e-b3fe11a43da7',
  '65ace7ac-84d1-42fc-b72a-47e37f98a56e',
  'd5c0642c-2247-4cfc-a8ca-248c88f1f3b9',
  '3bb8dba5-2987-4e39-86aa-7b918d822314',
  'c5a396a5-e1d3-4951-951b-26f0a56746b8',
  '0dd48d51-4b2b-4c00-b508-2e52c0edda76',
  '4a228f5c-41ff-4ece-8bb7-b101d32532ea',
  '44a71881-c946-4363-b36a-b9ea4dd220ba',
  '85ad59d0-07f4-48c1-a774-158ad1218775',
  '180d65f5-9081-481e-baef-2b803cb8b81d',
  'df2d429e-470a-42da-867b-bb4a1d9ba7e3',
  '8d5417ce-c346-4424-a937-93f12c4ce3ec',
  '08ec80bd-feba-4ee6-8da4-ca2277e5469d'
]


export function getScheduleWeek(weekNumber: number) {

  let schedule = getSchedule();

  let weekStarting = (weekNumber === 1)
    ? schedule.dateStarting
    : getMonday(addWeeksToDate(schedule.dateStarting, weekNumber));
  let weekEnding = addDaysToDate(weekStarting, 6);
  return [{
    id: ids[0],
    name: "5x3 SI",
    shortDescription: "Boulder protocol",
    variation: GetVariation("Strength & Power"),
    exercises: 1,
    estimatedCompletionMinutes: 45,
    state: "complete"
  } as Item
  {
    id: ids[1],
    name: "Pull Ups",
    shortDescription: "Hypertrophy",
    variation: GetVariation("Conditioning"),
    exercises: 1,
    estimatedCompletionMinutes: 7,
    state: "complete"
  } as Item,
  {
    id: ids[2],
    name: "Hamstring stretches",
    shortDescription: "Flexibility",
    variation: GetVariation("Conditioning"),
    exercises: 4,
    estimatedCompletionMinutes: 12,
    state: "complete"
  } as Item,
  {
    id: ids[3],
    name: "Broken 40s",
    shortDescription: "Power Endurance protocol",
    variation: GetVariation("Power Endurance"),
    exercises: 1,
    estimatedCompletionMinutes: 7,
    state: "complete"
  } as Item,
  {
    id: ids[4],
    name: "ARC 30",
    shortDescription: "Endurance building exericse",
    variation: GetVariation("Aerobic Base"),
    exercises: 4,
    estimatedCompletionMinutes: 12,
    state: "complete"
  } as Item
  "Thursday": [{
    id: ids[5],
    name: "Pull Ups",
    shortDescription: "Hypertrophy",
    variation: GetVariation("Conditioning"),
    exercises: 1,
    estimatedCompletionMinutes: 7,
    state: "todo"
  } as Item,
  {
    id: ids[6],
    name: "Hamstring stretches",
    shortDescription: "Flexibility",
    variation: GetVariation("Conditioning"),
    exercises: 4,
    estimatedCompletionMinutes: 12,
    state: "todo"
  } as Item,
  {
    id: ids[7],
    name: "Hangboard",
    shortDescription: "Strength & Power",
    variation: GetVariation("Conditioning"),
    exercises: 2,
    estimatedCompletionMinutes: 12,
    state: "complete"
  } as Item,
  {
    id: ids[8],
    name: "Kilter board",
    shortDescription: "Strength & Power",
    variation: GetVariation("Strength & Power"),
    exercises: 4,
    estimatedCompletionMinutes: 12,
    state: "complete"
  } as Item] as Item[],
    "Friday": [{
      id: ids[9],
      name: "Broken 40s",
      shortDescription: "Power Endurance protocol",
      variation: GetVariation("Power Endurance"),
      exercises: 1,
      estimatedCompletionMinutes: 7,
      state: "complete"
    } as Item,
    {
      id: ids[10],
      name: "ARC 30",
      shortDescription: "Endurance building exericse",
      variation: GetVariation("Aerobic Base"),
      exercises: 4,
      estimatedCompletionMinutes: 12,
      state: "complete"
    } as Item] as Item[],
    "Saturday": [{
      id: ids[11],
      name: "Rest",
      shortDescription: "Rest is important, relax and recover!",
      variation: GetVariation("Rest"),
      state: "partial"
    } as Item] as Item[],
    "Sunday": [{
      id: ids[12],
      name: "Open Climbing",
      shortDescription: "Session for open climbing",
      variation: GetVariation("Fun"),
      exercises: 1,
      estimatedCompletionMinutes: 7,
      state: "todo"
    } as Item]
  } as ApiResponse<ScheduleWeek>;
}
