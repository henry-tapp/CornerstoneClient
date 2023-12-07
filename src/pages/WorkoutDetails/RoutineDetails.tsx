import { Divider, List, ListItem, ListItemText, Typography, alpha } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { Fragment, useMemo } from "react";
import { RoutineType, ScheduledRoutine } from 'types';

const Description = styled("div")(({ theme }) => `
    padding:1rem;
    word-break: break-all;
`);
const Inline = styled("div")(
    ({ theme }) => `
    display: flex;
    align-items: baseline;
  `
);

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

export interface RoutineDetailsProps {

    routine: ScheduledRoutine;
}

export function RoutineDetails({ routine }: RoutineDetailsProps) {

    const {
        description,
        summary,
        estimatedCompletionSeconds: estimatedCompletionMinutes,
        workoutType
    } = routine;

    const formattedEstimatationTime = useMemo(() => {
        return (estimatedCompletionMinutes > 0)
            ? `${Math.floor(estimatedCompletionMinutes / 60)}M`
            : undefined;
    }, [estimatedCompletionMinutes]);

    if (!routine) {
        return <></>;
    }
    return (<>
        <Description>
            <Inline>
                <Typography style={{ alignItems: "flex-start" }} variant="h5">{workoutType && (`${RoutineType[workoutType]} Routine`)}</Typography>
                {formattedEstimatationTime && (
                    <Typography style={{ alignItems: "flex-end", marginLeft: "auto" }} variant="subtitle2">
                        {formattedEstimatationTime}
                    </Typography>
                )}
            </Inline>
            <Typography variant="body1">{description}</Typography>
        </Description>
        {summary && (
            <Description>
                <Typography variant="body2">{summary}</Typography>
            </Description>)}
        <StyledList>
            {routine.activities.map((activity, i) => (
                <div key={i}>
                    <Divider component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={activity.name}
                            secondary={
                                <Fragment>
                                    <Flexbox>
                                        <Typography
                                            sx={{ display: 'inline', fontWeight: 'bold', wordWrap: "break-word", width: "80%" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {activity.description}
                                        </Typography>
                                    </Flexbox>
                                </Fragment>
                            }
                        />
                    </ListItem>
                </div>
            ))}
        </StyledList>
    </>);
}

export default RoutineDetails;