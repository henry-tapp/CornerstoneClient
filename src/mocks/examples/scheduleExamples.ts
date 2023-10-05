import { ApiResponse } from "api";
import { GetVariation, Item, Schedule, ScheduleWeek, WeekDayItems } from "types";
import { addDaysToDate, addWeeksToDate, getMonday } from "util/dates";

export function getSchedule() {
  return {
    weekStarting: new Date("07/17/2023"),
    dateEnding: new Date("10/09/2023"),
    numberOfWeeks: 12,
    peakWeek: 11
  } as Schedule;
}


export function getScheduleWeek(weekNumber: number) {

  let schedule = getSchedule();

  let weekStarting = (weekNumber === 1) 
    ? schedule.weekStarting 
    : getMonday(addWeeksToDate(schedule.weekStarting, weekNumber));
  let weekEnding = addDaysToDate(weekStarting, 6);
  return {
    peakWeek: true,
    weekNumber: weekNumber,
    weekStarting: weekStarting,
    weekEnding: weekEnding,
    items: {
      "Monday": [{
        id: 3,
        name: "5x3 SI",
        shortDescription: "Boulder protocol",
        variation: GetVariation("Strength & Power"),
        exercises: 1,
        estimatedCompletionMinutes: 45,
        state: "complete"
      } as Item] as Item[],
      "Tuesday": [{
        id: 2,
        name: "Pull Ups",
        shortDescription: "Hypertrophy",
        variation: GetVariation("Conditioning"),
        exercises: 1,
        estimatedCompletionMinutes: 7,
        state: "complete"
      } as Item,
      {
        id: 1,
        name: "Hamstring stretches",
        shortDescription: "Flexibility",
        variation: GetVariation("Conditioning"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        state: "complete"
      } as Item] as Item[],
      "Wednesday": [{
        id: 2,
        name: "Broken 40s",
        shortDescription: "Power Endurance protocol",
        variation: GetVariation("Power Endurance"),
        exercises: 1,
        estimatedCompletionMinutes: 7,
        state: "complete"
      } as Item,
      {
        id: 1,
        name: "ARC 30",
        shortDescription: "Endurance building exericse",
        variation: GetVariation("Aerobic Base"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        state: "complete"
      } as Item] as Item[],
      "Thursday": [{
        id: 2,
        name: "Pull Ups",
        shortDescription: "Hypertrophy",
        variation: GetVariation("Conditioning"),
        exercises: 1,
        estimatedCompletionMinutes: 7,
        state: "complete"
      } as Item,
      {
        id: 1,
        name: "Hamstring stretches",
        shortDescription: "Flexibility",
        variation: GetVariation("Conditioning"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        state: "complete"
      } as Item,
      {
        id: 1,
        name: "Kilter board",
        shortDescription: "Strength & Power",
        variation: GetVariation("Strength & Power"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        state: "complete"
      } as Item] as Item[],
      "Friday": [{
        id: 2,
        name: "Broken 40s",
        shortDescription: "Power Endurance protocol",
        variation: GetVariation("Power Endurance"),
        exercises: 1,
        estimatedCompletionMinutes: 7,
        state: "complete"
      } as Item,
      {
        id: 1,
        name: "ARC 30",
        shortDescription: "Endurance building exericse",
        variation: GetVariation("Aerobic Base"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        state: "complete"
      } as Item] as Item[],
      "Saturday": [{
        id: 2,
        name: "Rest",
        shortDescription: "Rest is important, relax and recover!",
        variation: GetVariation("Rest"),
        state: "partial"
      } as Item] as Item[],
      "Sunday": [{
        id: 2,
        name: "Open Climbing",
        shortDescription: "Session for open climbing",
        variation: GetVariation("Fun"),
        exercises: 1,
        estimatedCompletionMinutes: 7,
        state: "todo"
      } as Item] as Item[]
    } as WeekDayItems
  } as ApiResponse<ScheduleWeek>;
}
