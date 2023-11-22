import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { PropsWithChildren } from "react";
import { Droppable } from "react-beautiful-dnd";

const Wrapper = styled("div")(({ theme }) => `
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: ${(theme as ITheme).palette.primary.light};
  margin: 0.25rem; 
`);

const Header = styled("div")(({ theme }) => `
    text-align:left;
    display: flex;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-bottom: auto;
    padding-left: 0.25rem;
`);

export const Toolbar = styled("div")(({ theme }) => `
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    gap: 1rem;
`);

export const ToolbarButton = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    width:1rem;
    height:1rem;
    color: ${(theme as ITheme).palette.shades.g5};
    padding-top:0.25rem;
    padding-right:0.5rem;
    text-align:center;
    position:relative;
    z-index:30;
`);

export interface Workout {
    id: string;
    name: string;
}

export interface ItemListProps {
    prefix: string;
    index: number;
    color: string;
    borderColor: string;
    toolbar?: JSX.Element;
};

export function DroppableCard(props: PropsWithChildren<ItemListProps>) {

    const { prefix, index, toolbar, children, color, borderColor } = props;

    return (
        <Wrapper style={{ border: `0.01rem solid ${borderColor}` }}>
            <Header>
                <Typography style={{ alignSelf: "flex-end", color }} variant="subtitle1">{prefix}</Typography >
                {toolbar}
            </Header>
            <Droppable droppableId={index.toString()}>
                {(provided, snapshot) => (
                    <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
                        {children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default DroppableCard;