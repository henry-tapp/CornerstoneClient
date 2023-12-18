import { PropsWithChildren } from "react";
import { Droppable } from "react-beautiful-dnd";



export interface Workout {
    id: string;
    name: string;
}

export interface ItemListProps {
    prefix: string;
    index: number;
    toolbar?: JSX.Element;
};

export function DroppableZone(props: PropsWithChildren<ItemListProps>) {

    const { index, children } = props;

    return (
        <Droppable droppableId={index.toString()}>
            {(provided, snapshot) => (
                <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
                    {children}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default DroppableZone;