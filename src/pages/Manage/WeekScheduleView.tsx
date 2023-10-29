import { styled } from "@mui/material/styles";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { useScheduleWeek } from "hooks/useSchedule/useSchedule";
import { useMultipleWorkoutGroupsForPhase } from "hooks/useWorkouts/useWorkouts";
import { ids } from "mocks/examples/scheduleExamples";
import { useCallback, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { WeekDays } from "types";
import { v4 } from "uuid";
import WeekDayItemsList from "./WeekDayItemsList";

export type SortType = "previous_week" | "template";

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

export const UNSCHEDULED: string = "Unscheduled";

export const PLACEHOLDER: Task = {
  id: v4(),
  prefix: "placeholder",
  isPlaceholder: true,
  content: {
    name: "No workouts currently scheduled."
  }
};

export interface ViewProps {
  weekNumber: number;
}

export function WeekScheduleView({ weekNumber }: ViewProps) {

  const [planId, setPlanId] = useLocalStorage("planId", "");

  const { data: weekData } = useScheduleWeek({ planId: planId, weekNumber: weekNumber });
  const { data: itemTypes } = useMultipleWorkoutGroupsForPhase({ phase: weekData?.weekItems });

  const lists = useMemo(() => [UNSCHEDULED].concat(WeekDays), []);

  const initial = useMemo(() => lists.map((list, idx) => {
    return {
      id: idx.toString(),
      day: list,
      hasPlaceholder: list === UNSCHEDULED,
      tasks: list !== UNSCHEDULED ? [PLACEHOLDER] :
        Object.values(weekData?.weekItems ?? []).flat().flat().map((item, idx2) => {
          return {
            id: ids[idx2],
            prefix: "task",
            isPlaceholder: false,
            content: {
              name: item.name,
              description: item.description
            }
          }
        })
    } as Day
  }), [weekData?.weekItems, lists]);

  let index = 0;
  const template = useMemo(() => lists.map((list, idx) => {
    return {
      id: idx.toString(),
      day: list,
      hasPlaceholder: list === UNSCHEDULED,
      tasks:
        Object.values(weekData?.weekItems ?? []).flat().map((item, idx2) => {

          return {
            id: ids[index++],
            prefix: "task",
            isPlaceholder: false,
            content: {
              name: item.name,
              description: item.description
            }
          }
        })
    } as Day
  }), [weekData?.weekItems, lists, index]);

  const [elements, setElements] = useState<Day[]>(initial);

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

  const unscheduleByPrefix = useCallback((prefix: string) => {
    const listCopy = JSON.parse(JSON.stringify(elements)) as typeof elements;
    let unscheduled = listCopy.find(x => x.day === UNSCHEDULED)!;
    let dayToUnschedule = listCopy.find(x => x.day === prefix)!;
    if (!dayToUnschedule.hasPlaceholder) {
      unscheduled.tasks = unscheduled?.tasks.concat(dayToUnschedule.tasks);
    }
    dayToUnschedule.tasks = [PLACEHOLDER];
    dayToUnschedule.hasPlaceholder = true;
    setElements(listCopy);
  }, [setElements, elements]);


  const autoSort = useCallback((type: SortType) => {

    if (type === "template") {

      setElements(template);
    }

  }, [setElements, template]);

  const unschedule = useCallback((prefix?: string | undefined) => {

    if (!prefix) {
      setElements(initial);
    }
    else {

      unscheduleByPrefix(prefix);
    }
  }, [setElements, unscheduleByPrefix, initial]);

  const handleNewItem = useCallback((id: string) => {

    // todo new items


  }, []);

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {lists.map((list, idx) => {
            return (
              <WeekDayItemsList
                elements={elements.find(x => x.day === list)}
                key={list}
                prefix={list}
                index={idx}
                handleAutoSort={autoSort}
                handleUnschedule={unschedule}
                handleItemAdd={handleNewItem}
                itemTypes={itemTypes ?? []}
              />
            )
          })}
        </ListGrid>
      </DragDropContext>
    </Container>
  )
}