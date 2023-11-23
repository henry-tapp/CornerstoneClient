import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { IconButton, Typography, styled } from "@mui/material";
import { ITheme } from 'common/App';
import { useWorkoutDrawer } from 'pages/Schedule/Today/WorkoutDrawerContextProvider';
import { WeekItemWorkout } from 'types';

export const Container = styled("div")`
    background-color: inherit;
    color: inherit;
    width: 100%;
    display:grid; 
    grid-template-columns: 15fr 1fr;
    height:5rem;
    position:relative;
    padding-right: 1rem;
    
`

export const CenteredText = styled(Typography)(({ theme }) => `
    color: ${(theme as ITheme).palette.shades.g5};
`);

export const Left = styled("div")(({ theme }) => `
    grid-column: 1 / span 15;
`);

export const Right = styled("div")(({ theme }) => `
    grid-column: 16;
    
`);

export interface CardListItemProps {
    workout: WeekItemWorkout;
}

export function CardListItem({ workout }: CardListItemProps) {

    const { openWorkout } = useWorkoutDrawer();

    return (
        <Container onClick={() => openWorkout(workout)}>
            <Left>
                <CenteredText variant="subtitle2" style={{ fontWeight: "bold" }}>{workout.name}</CenteredText>
                {workout.description && <CenteredText variant="body2">
                    {workout.description.length > 40 ? workout.description.slice(0, 40).concat("...") : workout.description}
                </CenteredText>}
            </Left>
            <Right>
                {/* @ts-ignore */}
                <IconButton size='small' color='tertiary' ><PlayCircleFilledWhiteIcon fontSize='small' /></IconButton>
            </Right>
        </Container>
    );
}
