import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, List, styled } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ITheme } from 'common/App';
import * as React from 'react';
import { WeekItemWorkout } from 'types';
import { useWorkoutDrawer } from './WorkoutDrawerContextProvider';

const Flexbox = styled("span")(({ theme }) => `
    display:flex;
    justify-content:space-between;
`);


const StyledList = styled(List)(({ theme }) => `
    width: 100%;
    maxWidth: 360;
    background-color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 1rem;
`);

export interface WorkoutListProps {
    workouts: WeekItemWorkout[];
}

export default function WorkoutList({ workouts }: WorkoutListProps) {

    const { openWorkout } = useWorkoutDrawer();

    return (
        <StyledList>
            {workouts.map((workout, i) => (
                <div key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={workout.name}
                            secondary={
                                <React.Fragment>
                                    <Flexbox>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 'bold', wordWrap: "break-word", width: "80%" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {workout.description}
                                        </Typography>
                                        <IconButton onClick={() => openWorkout(workout)}><KeyboardArrowRightIcon /></IconButton>
                                    </Flexbox>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </StyledList >
    );
}