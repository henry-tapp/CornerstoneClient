import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { IconButton, List, alpha, styled, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ITheme } from 'common/App';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutInformation } from 'types';
const Flexbox = styled("span")(({ theme }) => `
    display:flex;
    justify-content:space-between;
    color:  ${(theme as ITheme).palette.shades.g1};
`);


const StyledList = styled(List)(({ theme }) => `
    width: 100%;
    maxWidth: 360;
    background-color: ${alpha((theme as ITheme).palette.shades.g5, 0.1)};
    color:  ${(theme as ITheme).palette.shades.g1};
    border-radius: 1rem;
    margin-top: -1rem;
`);

export interface WorkoutListProps {
    workouts: WorkoutInformation[];
}

export default function WorkoutList({ workouts }: WorkoutListProps) {

    const navigate = useNavigate();

    const theme = useTheme() as ITheme;

    return (
        <StyledList>
            {workouts.map((workout, i) => (
                <div key={i}>
                    <Divider component="li" />
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
                                        {!workout.completed
                                            ? (<IconButton color='inherit' onClick={() => navigate(`../workout/${workout.weekItemId}/${workout.id}`)}>
                                                <KeyboardArrowRightIcon />
                                            </IconButton>)
                                            : <CheckIcon htmlColor={theme.palette.tertiary.main} />
                                        }

                                    </Flexbox>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    {workouts.length - 1 === i && <Divider component="li" />}
                </div>
            ))}
        </StyledList>
    );
}