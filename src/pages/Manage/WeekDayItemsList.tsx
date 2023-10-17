import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task, Day } from "./WeekScheduleView";
import { Item } from "types";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { ItemCardSmall } from "components/ItemCard/ItemCardSmall";
import { ITheme } from "common/App";

type ComponentType = {
  prefix: string;
  index: number;
  elements: Day | undefined;
};

const Header = styled("div")(({ theme }) => `

  text-align:left;
  color: ${(theme as ITheme).palette.secondary.light};
`);

const DropContainer = styled("div")(({ theme }) => `
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: ${(theme as ITheme).palette.primary.main};
  margin-bottom: 0.25rem;  
`);

const DragItem = styled("div")(({ theme }) => `
  background: ${(theme as ITheme).palette.primary.light};
  margin-bottom: 0.25rem;  
  border-radius: 0.25rem;
  padding-inline: 0.5rem 0.5rem;
`);

const PlaceholderCard = styled("div")(({ theme }) => `
  margin:auto;
  text-align:center;
  color: ${(theme as ITheme).palette.shades.g5};
  padding: 0.5rem;
`);

export function DraggableTask({ prefix, elements, index }: ComponentType) {
  return (
    <DropContainer>
      <Header><Typography variant="h5">{prefix}</Typography ></Header>
      <Droppable droppableId={index.toString()}>
        {(provided) => (
          <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
            {elements && elements.tasks.map((item: Task, itemIndex: number) => (
              item.isPlaceholder ?
                <PlaceholderCard><Typography variant="caption" key={itemIndex}>{item.content.name}</Typography></PlaceholderCard>
                : <Draggable key={itemIndex} draggableId={item.id} index={itemIndex}>
                  {(provided, snapshot) => {
                    return (
                      <DragItem
                        key={itemIndex}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <ItemCardSmall name={item.content.name} description={item.content.description} />
                      </DragItem>
                    );
                  }}
                </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DropContainer>
  );
};

export default DraggableTask;
