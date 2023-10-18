import { Draggable, Droppable } from "react-beautiful-dnd";
import { Task, Day, UNSCHEDULED, SortType } from "./WeekScheduleView";
import { styled, useTheme } from "@mui/material/styles";
import { IconButton, ListItemIcon, Typography } from "@mui/material";
import { ItemCardSmall } from "components/ItemCard/ItemCardSmall";
import { ITheme } from "common/App";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SortIcon from '@mui/icons-material/Sort';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import { ItemType } from "types";

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

const Toolbar = styled("div")(({ theme }) => `
    display: flex;
    margin-left: auto;
    justify-content: flex-end;
    gap: 1rem;
`);

const ToolbarButton = styled("div")(({ theme }) => `
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


const DragItem = styled("div")(({ theme }) => `
  background: ${(theme as ITheme).palette.primary.dark};
  margin-bottom: 0.5rem;  
  border-radius: 0.5rem;
  padding-inline: 0.5rem 0.5rem;
  margin-top:0.5rem;
`);

const PlaceholderCard = styled("div")(({ theme }) => `
  margin:auto;
  text-align:center;
  color: ${(theme as ITheme).palette.shades.g5};
  padding: 0.5rem;
`);


export interface ItemListProps {
  itemTypes: ItemType[];
  prefix: string;
  index: number;
  elements: Day | undefined;
  handleAutoSort: (type: SortType) => void;
  handleUnschedule: (prefix?: string | undefined) => void;
  handleItemAdd: (id: string) => void;
};


export function WeekDayItemsList({ itemTypes, prefix, elements, index, handleAutoSort, handleUnschedule, handleItemAdd }: ItemListProps) {


  const theme = useTheme();

  const color = prefix === UNSCHEDULED ? (theme as ITheme).palette.shades.g5 : (theme as ITheme).palette.tertiary.main;
  const borderColor = prefix === UNSCHEDULED ? (theme as ITheme).palette.shades.g5 : (theme as ITheme).palette.tertiary.main;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSort = (type?: SortType | undefined) => {

    if (!!type) {
      handleAutoSort(type);
    }
    setAnchorEl(null);
  };

  const handleAdd = (id?: string) => {

    if (!!id) {
      handleItemAdd(id);
    }
    setAnchorEl(null);
  };



  return (

    <Wrapper style={{ border: `0.01rem solid ${borderColor}` }}>
      <Header>
        <Typography style={{ alignSelf: "flex-end", color }} variant="h5">{prefix}</Typography >
        <Toolbar>
          {prefix === UNSCHEDULED &&
            (<>
              <ToolbarButton onClick={handleClick}>
                <SortIcon />
              </ToolbarButton>
              <Menu
                anchorEl={anchorEl}
                id="options-menu"
                open={open}
                onClose={() => handleSort()}
                onClick={() => handleSort()}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => handleSort("previous_week")}>
                  <ListItemIcon>
                    <ReplayIcon fontSize="small" />
                  </ListItemIcon>
                  Use previous week
                </MenuItem>
                <MenuItem onClick={() => handleSort("template")}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Use template
                </MenuItem>
                <MenuItem onClick={() => handleUnschedule()}>
                  <ListItemIcon>
                    <ClearAllIcon fontSize="small" />
                  </ListItemIcon>
                  Unschedule All
                </MenuItem>
              </Menu>
            </>)
          }

          {prefix !== UNSCHEDULED &&
            (<><ToolbarButton onClick={() => handleUnschedule(prefix)}>
              <IconButton style={{ color: color }}><ClearAllIcon /></IconButton>
            </ToolbarButton>
              <ToolbarButton onClick={handleClick}>
                <IconButton style={{ color: color }}><AddIcon /></IconButton>
              </ToolbarButton>
              <Menu
                anchorEl={anchorEl}
                id="add-task-menu"
                open={open}
                onClose={() => handleAdd()}
                onClick={() => handleAdd()}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                {itemTypes.map(item => {
                  return (<MenuItem onClick={() => handleAdd(item.id)}>
                    {item.name}
                  </MenuItem>)
                })
                }
              </Menu></>
            )
          }
        </Toolbar>
      </Header>

      <Droppable droppableId={index.toString()}>
        {(provided) => (
          <div key={index} {...provided.droppableProps} ref={provided.innerRef}>
            {elements && elements.tasks.map((item: Task, itemIndex: number) => (
              item.isPlaceholder ?
                <PlaceholderCard key={itemIndex}><Typography variant="caption">{item.content.name}</Typography></PlaceholderCard>
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
    </Wrapper >
  );
};

export default WeekDayItemsList;
