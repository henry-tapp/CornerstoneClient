import { Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { ITheme } from "common/App";
import { useCornerstoneStableData } from "common/CornerstoneDataProvider";
import { InfoDialog } from "components/Dialog/InfoDialog";
import DraggableItem from "components/Draggable/DraggableItem";
import DroppableZone from "components/Draggable/DroppableZone";
import { useApi } from "hooks/useApi/useApi";
import { DropArea, Item, PLACEHOLDER, useDragDrop } from "hooks/useDragDrop/useDragDrop";
import { useWeekItems } from "hooks/useWeekItems/useWeekItems";
import { Information } from "hooks/useWizard/useFocusData";
import { useCallback, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ScheduledDay, UNSCHEDULED, WeekItem, scheduleLists, scheduledDayOfWeekMapper } from "types";
import ScheduleItemCard from "./ScheduleItemCard";
import { ScheduleToolbar } from "./ScheduleToolbar";

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

const PlaceholderCard = styled("div")(({ theme }) => `
  margin:auto;
  text-align:center;
  color: ${(theme as ITheme).palette.shades.g5};
  padding: 0.5rem;
`);


const DropZoneWrapper = styled("div")(({ theme }) => `
  padding: 1rem;
  border-radius: 1rem;
  background: ${(theme as ITheme).palette.primary.light};
  margin: 0.25rem; 
`);

const Header = styled("div")(({ theme }) => `
    text-align:left;
    display: flex;
    gap: 0.5rem;
    padding-left: 0.25rem;
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    color: ${(theme as ITheme).palette.shades.g6};
`);

export interface ViewProps {
  weekNumber: number;
}

export function WeekScheduleView({ weekNumber }: ViewProps) {

  const { scheduleWeeks } = useCornerstoneStableData();

  const currentWeek = useMemo(() => scheduleWeeks?.find(x => x.weekNumber === weekNumber), [scheduleWeeks, weekNumber])

  const { data: weekData } = useWeekItems({ weekId: currentWeek?.id });
  // const { data: itemTypes } = useMultipleWorkoutGroupsForPhase({ phase: currentWeek?.phase ?? PhaseType.Any });
  const current = useMemo(() => scheduleLists.map((list, idx) => {

    const listItems = weekData?.filter(y => scheduledDayOfWeekMapper[idx].enum === y.scheduledDayOfWeek);
    return {
      id: idx.toString(),
      title: list,
      items: listItems?.length === 0 ? [PLACEHOLDER] : listItems?.map((item) => ({
        id: item.id,
        prefix: "task",
        isPlaceholder: false,
        content: item
      }))
    } as DropArea<WeekItem>
  }), [weekData]);

  const api = useApi();
  const { mutateAsync } = useMutation(async (weekItems: WeekItem[]) => await api.updateWeekItem(weekItems));
  const updateItemList = useCallback(async (newList: string, items: WeekItem[]) => {
    await mutateAsync(items.map(x => {
      x.scheduledDayOfWeek = ScheduledDay[newList];
      return x;
    }));
  }, [mutateAsync]);

  const { onDragEnd, moveAllItems, resetList, elements } = useDragDrop({ dropAreas: current, onItemsMoved: updateItemList });

  const allUnscheduled = useMemo(() => scheduleLists.map((list, idx) => {
    return {
      id: idx.toString(),
      title: list,
      items: list !== UNSCHEDULED ? [PLACEHOLDER] : weekData?.map((item) => ({
        id: item.id,
        prefix: "task",
        isPlaceholder: false,
        content: item
      }))
    } as DropArea<WeekItem>
  }), [weekData]);

  // const template = useMemo(() => scheduleLists.map((list, idx) => {
  //   return {
  //     id: idx.toString(),
  //     title: list,
  //     hasPlaceholder: list === UNSCHEDULED,
  //     items: weekData?.map((item) => createScheduleTask(item))
  //   } as DropArea<WeekItem>
  // }), [weekData]);

  const theme = useTheme();

  const color = (prefix: string) => prefix === UNSCHEDULED ? (theme as ITheme).palette.shades.g5 : (theme as ITheme).palette.tertiary.main;

  const borderColor = (prefix: string) => prefix === UNSCHEDULED ? (theme as ITheme).palette.shades.g5 : (theme as ITheme).palette.tertiary.main;

  const unschedule = useCallback((prefix?: string | undefined) => (!prefix) ? resetList(allUnscheduled) : moveAllItems(UNSCHEDULED, prefix), [resetList, moveAllItems, allUnscheduled]);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelctedItem] = useState<Information>();
  const handleToggleDialogForId = useCallback((id: string) => {
    const item = weekData?.find(x => x.id === id);
    setSelctedItem({ title: item?.name ?? "", description: item?.description ?? "" });
    setOpen(true);
  }, [weekData, setOpen, setSelctedItem]);

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {scheduleLists.map((list, idx) => {
            return (
              <DropZoneWrapper
                key={list}>
                <Header>
                  <Typography variant="subtitle1">{list}</Typography >
                  <ScheduleToolbar prefix={list} handleUnschedule={unschedule} />
                </Header>
                <DroppableZone
                  prefix={list}
                  index={idx}
                >
                  <div key={idx}>
                    {elements && elements.find(x => x.title === list)?.items.map((item: Item<WeekItem>, index: number) =>
                    (item.isPlaceholder
                      ? <PlaceholderCard key={item.id}><Typography variant="caption">{item.content.name}</Typography></PlaceholderCard>
                      : <DraggableItem key={item.id} index={index} id={item.id}>
                        <ScheduleItemCard handleOpenInfo={handleToggleDialogForId} item={item.content} />
                      </DraggableItem>
                    ))}
                  </div>
                </DroppableZone>
              </DropZoneWrapper>
            )
          })}
        </ListGrid>
      </DragDropContext>
      <InfoDialog title={selectedItem?.title} description={selectedItem?.description} handleClose={() => setOpen(false)} open={open} />
    </Container >
  )
} 