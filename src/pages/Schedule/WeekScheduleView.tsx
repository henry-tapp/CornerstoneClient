import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { useCornerstoneStableData } from "common/CornerstoneDataProvider";
import { InfoDialog } from "components/Dialog/InfoDialog";
import DraggableItem from "components/Draggable/DraggableItem";
import DroppableZone from "components/Draggable/DroppableZone";
import { LoadingIndicator } from "components/LoadingIndicator";
import { ConvertToDragDropData, Item, useDragDrop } from "hooks/useDragDrop/useDragDrop";
import { useWeekItemUpdate, useWeekItems } from "hooks/useWeekItems/useWeekItems";
import { useCallback, useMemo, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ScheduledDay, UNSCHEDULED, WeekItem, scheduleLists, scheduledDayOfWeekMapper } from "types";
import ScheduleItemCard from "./Components/ScheduleItemCard";
import { ScheduleItemSelectionDialog } from "./Components/ScheduleItemSelectionDialog";
import { ScheduleToolbar } from "./Components/ScheduleToolbar";

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
  padding-top: 1rem;
  padding-inline: 1rem;
`);

const PlaceholderCard = styled("div")(({ theme }) => `
  margin:auto;
  text-align:center;
  color: ${(theme as ITheme).palette.shades.g1};
  padding: 0.5rem;
`);


const DropZoneWrapper = styled("div")(({ theme }) => `
  padding: 1rem;
  border-radius: 1rem;
  background: ${(theme as ITheme).palette.shades.g4};
  margin-bottom: 0.25rem; 
`);

const Header = styled("div")(({ theme }) => `
    text-align:left;
    display: flex;
    gap: 0.5rem;
    padding-inline: 0.25rem 0.25rem;
    padding-top:0.5rem;
    padding-bottom:0.5rem;
    color: ${(theme as ITheme).palette.shades.g1};
`);

export interface ViewProps {
  weekNumber: number;
}

export function WeekScheduleView({ weekNumber }: ViewProps) {

  const { scheduleWeeks } = useCornerstoneStableData();

  const currentWeek = useMemo(() => scheduleWeeks?.find(x => x.weekNumber === weekNumber), [scheduleWeeks, weekNumber])

  const { updateItems } = useWeekItemUpdate();
  const updateItemScheduleDay = useCallback(async (newList: string, items: WeekItem[]) => {
    const newScheduledDay = scheduledDayOfWeekMapper.find(x => x.title === newList)?.enum;
    if (!newScheduledDay) throw new Error("Tried to schedule to a day that doesn't exist");

    await updateItems(items.map(x => {
      x.scheduledDayOfWeek = newScheduledDay;
      return x;
    }));

  }, [updateItems]);

  const { data: weekData } = useWeekItems({ weekId: currentWeek?.id });
  const initialDropZones = ConvertToDragDropData<WeekItem>(scheduleLists, weekData, (weekItem: WeekItem, index: number) => scheduledDayOfWeekMapper[index].enum === weekItem.scheduledDayOfWeek);
  const unscheduledDropZones = ConvertToDragDropData<WeekItem>(scheduleLists, weekData, (weekItem: WeekItem, index: number) => scheduledDayOfWeekMapper[index].enum === ScheduledDay.None);
  const { onDragEnd, moveAllItems, resetList, dropAreas, setDropAreas } = useDragDrop<WeekItem>({ initialDropAreas: initialDropZones, onItemsMoved: updateItemScheduleDay });

  const [selectedItem, setSelctedItem] = useState<WeekItem>();
  const [infoOpen, setInfoOpen] = useState(false);
  const openDialogForItem = useCallback((item: WeekItem) => {
    setSelctedItem(item);
    setInfoOpen(true);
  }, [setInfoOpen, setSelctedItem]);

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const openSelectionDialogForDay = useCallback((prefix: string) => {
    setSelectedDay(prefix);
    setScheduleDialogOpen(true);
  }, [setSelectedDay, setScheduleDialogOpen]);

  const handleSelectionDialogOnSave = useCallback((items: WeekItem[]) => {
    updateItems(items);
    setDropAreas(ConvertToDragDropData<WeekItem>(scheduleLists, weekData, (weekItem: WeekItem, index: number) => scheduledDayOfWeekMapper[index].enum === weekItem.scheduledDayOfWeek));
    setScheduleDialogOpen(false);
  }, [updateItems, setDropAreas, weekData]);

  if (!weekData) {
    return <LoadingIndicator />
  }
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {scheduleLists.map((list, idx) => {
            return (
              <DropZoneWrapper key={list}>
                <Header>
                  <Typography variant="subtitle1">{list}</Typography >
                  <ScheduleToolbar
                    prefix={list}
                    handleUnschedule={(prefix?: string | undefined) => (!prefix)
                      ? resetList(unscheduledDropZones)
                      : moveAllItems(UNSCHEDULED, prefix)}
                    openSelection={openSelectionDialogForDay} />
                </Header>
                <DroppableZone prefix={list} index={idx}>
                  <div key={idx}>
                    {dropAreas && dropAreas.find(x => x.title === list)?.items.map((item: Item<WeekItem>, index: number) => (item.isPlaceholder
                      ? (
                        <PlaceholderCard key={item.content.id}>
                          <Typography variant="button">{item.content.name}</Typography>
                        </PlaceholderCard>)
                      : (
                        <DraggableItem key={item.content.id} index={index} id={item.content.id}>
                          <ScheduleItemCard handleOpenInfo={openDialogForItem} item={item.content} />
                        </DraggableItem>)))
                    }
                  </div>
                </DroppableZone>
              </DropZoneWrapper>
            )
          })}
        </ListGrid>
      </DragDropContext>
      <InfoDialog
        title={selectedItem?.name}
        description={selectedItem?.description}
        handleClose={() => setInfoOpen(false)}
        open={infoOpen}
      />
      <ScheduleItemSelectionDialog
        items={weekData}
        day={ScheduledDay[selectedDay] as ScheduledDay}
        handleClose={() => setScheduleDialogOpen(false)}
        open={scheduleDialogOpen}
        onSave={handleSelectionDialogOnSave}
      />
    </Container >
  )
} 