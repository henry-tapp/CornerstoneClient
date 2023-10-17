import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useSchedule, useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { ids } from "mocks/examples/scheduleExamples";
import { useCallback, useMemo, useState } from "react";
import { getCurrentWeek } from "util/dates";
import { v4 } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import DraggableTask from "./WeekDayItemsList";

import { WeekDays } from "types/WeekDay";


const Container = styled("div")(({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  overflow-y: auto;
`);

const ListGrid = styled("div")(({ theme }) => `
  width: 100%;
  padding: 1rem;
`);

export interface Content {
  name: string;
  description?: string | undefined;
}

export interface Task {
  id: string;
  prefix: string;
  isPlaceholder: boolean;
  content: Content;
}

export interface Day {
  id: string;
  day: string;
  hasPlaceholder: boolean;
  tasks: Task[];
}

const UNSCHEDULED: string = "Unscheduled";

export const PLACEHOLDER: Task = {
  id: v4(),
  prefix: "placeholder",
  isPlaceholder: true,
  content: {
    name: "No workouts currently scheduled."
  }
};


export function WeekScheduleView() {

  const { data: schedule } = useSchedule({});
  const currentWeek = useMemo(() => (!!schedule?.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
  const [navigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);
  const { data: weekData } = useScheduleWeek({ WeekNumber: navigatedWeek });

  const lists = useMemo(() => [UNSCHEDULED].concat(WeekDays), []);

  const days: Day[] = lists.map((list, idx) => {
    return {
      id: idx.toString(),
      day: list,
      hasPlaceholder: list !== UNSCHEDULED,
      tasks: list !== UNSCHEDULED ? [PLACEHOLDER] :
        Object.values(weekData?.items ?? []).flat().flat().map((item, idx) => {
          return {
            id: ids[idx],
            prefix: "task",
            isPlaceholder: false,
            content: {
              name: item.name,
              description: item.shortDescription
            }
          }
        })
    } as Day
  });

  const [elements, setElements] = useState<Day[]>(days);

  const removeFromList = (list: Task[], index: number): [Task, Task[]] => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = useCallback((list: Task[], index: number, element: any) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      document.documentElement.removeAttribute("style");

      const listCopy = JSON.parse(JSON.stringify(elements)) as typeof elements;

      // Get the source day
      const sourceDay = listCopy?.[result.source.droppableId] as Day;

      // Remove it from the list
      const [removedElement, newSourceDay] = removeFromList(
        sourceDay.tasks,
        result.source.index
      );

      // Add placeholder if necessary
      if (sourceDay.day !== UNSCHEDULED && newSourceDay.length === 0) {
        newSourceDay.push(PLACEHOLDER);
        sourceDay.hasPlaceholder = true;
      }

      // assign spliced tasks to source day tasks list
      listCopy[result.source.droppableId].tasks = newSourceDay;

      // Get destination day
      const destinationDay = listCopy[result.destination.droppableId];

      // remove placeholder if necessary
      if (destinationDay.day !== UNSCHEDULED && destinationDay.hasPlaceholder) {
        destinationDay.tasks.pop();
        destinationDay.hasPlaceholder = false;
      }

      // add task to new day
      listCopy[result.destination.droppableId].tasks = addToList(
        destinationDay.tasks,
        result.destination.index,
        removedElement
      );

      setElements(listCopy);
      console.log("DD", result, sourceDay, listCopy);

    },
    [elements, addToList]
  );

  const onDragStart = () => {
    document.documentElement.setAttribute("style", "scroll-behavior: auto");

  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((list, idx) => {
            return (
              <DraggableTask
                elements={elements.find(x => x.day === list)}
                key={list}
                prefix={list}
                index={idx}
              />
            )
          })}
        </ListGrid>
      </DragDropContext>
    </Container>
  )
}