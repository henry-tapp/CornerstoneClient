import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography, styled, useTheme } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { ITheme } from "common/App";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnStackFlexBox } from "style/styles";
import { ScheduledDay, WeekItem, scheduledDayOfWeekMapper } from "types";
import ScheduleItemCard from "./ScheduleItemCard";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    padding: 0.25rem;
`);

const Selection = styled("div")<{ color?: string }>(({ theme, color }) => `
    position: absolute;
    z-index: 1000;
    opacity: 0.2;
    width: calc(100% - 0.5rem);
    height: 7rem;
    ${color && `
        border-radius: 1rem;
        background-color: ${color};
    `}
`);

const ColouredBox = styled(Box)<{ color?: string }>(({ theme, color }) => `
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${color};
`);

const Inline = styled("div")(
    ({ theme }) => `
    display: flex;
    align-items: center
  `
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface ScheduleItemSelectionDialogProps {
    open: boolean;
    items: WeekItem[];
    day: ScheduledDay;
    handleClose: () => void;
    onSave: (items: WeekItem[]) => void;
}

export interface SelectedItem {
    item: WeekItem;
    state: ScheduleState;
    dirty: boolean;
}

type ScheduleState = "Unscheduled" | "Scheduled" | "Scheduled Today";


export function ScheduleItemSelectionDialog({ open, items, day, handleClose, onSave }: ScheduleItemSelectionDialogProps) {

    const theme = useTheme() as ITheme;
    const dayTitle = scheduledDayOfWeekMapper.find(x => x.enum === day)?.title;

    const getStateColor = (state: ScheduleState) => {
        switch (state) {
            case "Scheduled": return theme.palette.secondary.dark;
            case "Unscheduled": return undefined;
            case "Scheduled Today": return theme.palette.tertiary.dark;
        }
    }

    const initialSelectItems = useMemo(() => items.map(x => ({ item: x, state: (x.scheduledDayOfWeek === ScheduledDay.None) ? "Unscheduled" : (x.scheduledDayOfWeek === day) ? "Scheduled Today" : "Scheduled" } as SelectedItem)), [items, day]);

    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(initialSelectItems);

    useEffect(() => setSelectedItems(initialSelectItems), [initialSelectItems, setSelectedItems, items]);
    const toggleItemSelected = useCallback((selectedItem: SelectedItem) => {

        setSelectedItems(selectedItems.map(x => {
            if (selectedItem.item.id === x.item.id) {

                if (selectedItem.state === "Scheduled" || selectedItem.state === "Scheduled Today") {

                    x.state = "Unscheduled";
                }
                else {
                    x.state = "Scheduled Today";
                }
                x.dirty = true;
            }
            return x;
        }));
    }, [selectedItems]);

    const handleSave = useCallback(() => {

        onSave(selectedItems.filter(x => x.dirty).map(x => {
            x.item.scheduledDayOfWeek = x.state === "Scheduled Today" ? day : x.state === "Unscheduled" ? ScheduledDay.None : initialSelectItems.find(y => y.item.id === x.item.id)!.item.scheduledDayOfWeek;
            return x.item;
        }));
    }, [selectedItems, initialSelectItems, day, onSave]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="dialog-information-description"
        >
            <DialogTitle>Select items for {dayTitle}
                <ColumnStackFlexBox>
                    <Inline><ColouredBox color={getStateColor("Scheduled")} /> <Typography variant="body2">&nbsp;Item scheduled on another day</Typography></Inline>
                    <Inline><ColouredBox color={getStateColor("Scheduled Today")} /><Typography variant="body2">&nbsp;Scheduled Today</Typography></Inline>
                </ColumnStackFlexBox>
            </DialogTitle>
            <DialogContent>
                {selectedItems.map((selectedItem, idx) => (
                    <Wrapper className="wrapper" key={idx}>
                        <Selection className="selection" color={getStateColor(selectedItem.state)} onClick={() => toggleItemSelected(selectedItem)} />
                        <ScheduleItemCard item={selectedItem.item} />
                    </Wrapper>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{"Close"}</Button>
                <Button onClick={handleSave}>{"Save"}</Button>
            </DialogActions>
        </Dialog>
    )
}