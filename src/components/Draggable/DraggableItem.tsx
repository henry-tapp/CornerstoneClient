import { styled } from "@mui/material/styles";
import { Draggable } from "react-beautiful-dnd";

const DragItem = styled("div")(({ theme }) => `
  margin-bottom: 0.5rem;  
  border-radius: 0.5rem;
  padding-inline: 0.5rem 0.5rem;
  margin-top:0.5rem;
`);

export interface ItemListProps {
    index: number;
    id: string;
};

export function WeekDayItemsList(props: React.PropsWithChildren<ItemListProps>) {

    const { index, id, children } = props;

    return (
        <Draggable key={index} draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        key={index}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        {children}
                    </DragItem>
                );
            }}
        </Draggable>

    );
};

export default WeekDayItemsList;