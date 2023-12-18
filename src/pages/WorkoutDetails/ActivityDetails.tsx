import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { ActivityType, ScheduledActivity } from 'types';

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

export interface RoutineDetailsProps {

    activity: ScheduledActivity;
}

export function ActivityDetails({ activity }: RoutineDetailsProps) {

    const {
        description,
        summary,
        instructions,
        estimatedCompletionSeconds: estimatedCompletionMinutes,
        workoutType
    } = activity;

    const formattedEstimatationTime = useMemo(() => {
        return (estimatedCompletionMinutes > 0)
            ? `${Math.floor(estimatedCompletionMinutes / 60)}M`
            : undefined;
    }, [estimatedCompletionMinutes]);

    if (!activity) {
        return <></>;
    }
    return (<>
        <Description>
            <Inline>
                <Typography style={{ alignItems: "flex-start" }} variant="h5">{workoutType && (`${ActivityType[workoutType]} Activity`)}</Typography>
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
        {instructions && (
            <Description>
                <Typography variant="body2">{instructions}</Typography>
            </Description>)}
    </>);
}

export default ActivityDetails;