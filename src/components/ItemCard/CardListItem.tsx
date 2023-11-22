import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { IconButton, Typography, styled } from "@mui/material";
import { ITheme } from 'common/App';
import { useWorkoutDrawer } from 'pages/Schedule/Today/WorkoutDrawerContextProvider';
import { WeekItemWorkout } from 'types';
export const Container = styled("div")`
    background-color: inherit;
    color: inherit;
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    height:4rem;
    position:relative;
`


export const Name = styled(Typography)(({ theme }) => `
    color: ${(theme as ITheme).palette.shades.g5};
    display: flex;
    justify-content: center;
    align-items: center;
`);

export const AbsolutePositionWrapper = styled("div")(({ theme }) => `
    position: absolute;
    top: 0;
    right: 0;
`);

export interface CardListItemProps {
    workout: WeekItemWorkout;
}

export function CardListItem({ workout }: CardListItemProps) {

    const { openWorkout } = useWorkoutDrawer();

    return (<Container>
        <Name variant="subtitle2" style={{ fontWeight: "bold" }}>{workout.name}</Name>
        {workout.description &&
            <Typography variant="body2">
                {workout.description.length > 40 ? workout.description.slice(0, 40).concat("...") : workout.description}
            </Typography>}
        <AbsolutePositionWrapper>
            {/* @ts-ignore */}
            <IconButton size='small' color='tertiary' onClick={() => openWorkout(workout)}><PlayCircleFilledWhiteIcon fontSize='small' /></IconButton>
        </AbsolutePositionWrapper>
    </Container>);
}
