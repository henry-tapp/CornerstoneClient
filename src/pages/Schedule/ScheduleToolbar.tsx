import AddIcon from '@mui/icons-material/Add';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import SettingsIcon from '@mui/icons-material/Settings';
import SortIcon from '@mui/icons-material/Sort';
import { IconButton, ListItemIcon, styled } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { UNSCHEDULED } from "types";
import { SortType } from "./WeekScheduleView";

const Toolbar = styled("div")(({ theme }) => `
    display: flex;
    margin-left: auto;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: -0.25rem;
    gap: 1rem;
`);
const ToolbarButton = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    width:1rem;
    height:1rem;
    padding-top:0.25rem;
    padding-right:0.5rem;
    text-align:center;
    position:relative;
    z-index:30;
`);


export interface ScheduleToolbarProps {
    prefix: string;
    handleAutoSort?: (type: SortType) => void;
    handleUnschedule?: (prefix?: string | undefined) => void;
    handleItemAdd?: (id: string) => void;
    handleOpenInfo?: (id: string, newState: boolean) => void;
}
export function ScheduleToolbar(props: ScheduleToolbarProps) {

    const { prefix, handleAutoSort, handleUnschedule } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSort = (type?: SortType | undefined) => {
        if (!!type) {
            handleAutoSort?.(type);
        }
        setAnchorEl(null);
    };

    return (<Toolbar className='toolbar'>
        {prefix === UNSCHEDULED &&
            (<>
                <ToolbarButton onClick={handleClick}>
                    <SortIcon fontSize='medium' />
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
                    {handleUnschedule && (<MenuItem onClick={() => handleUnschedule()}>
                        <ListItemIcon>
                            <ClearAllIcon fontSize="small" />
                        </ListItemIcon>
                        Unschedule All
                    </MenuItem>)}
                </Menu>
            </>)}

        {prefix !== UNSCHEDULED &&
            (<>
                {handleUnschedule &&
                    (<ToolbarButton onClick={() => handleUnschedule(prefix)}>
                        <IconButton color='inherit'><DeleteOutlineIcon /></IconButton>
                    </ToolbarButton>
                    )}
                <ToolbarButton onClick={handleClick}>
                    <IconButton color='inherit'><AddIcon /></IconButton>
                </ToolbarButton></>
            )}
    </Toolbar>);
}
