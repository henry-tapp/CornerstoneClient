import { Typography, styled } from "@mui/material";
import { ItemCard } from "components/ItemCard";

const Wrapper = styled("div")`
  width: calc(100% - 2rem);
  padding: 1rem;
`;

const WeekDayItemContainer = styled("div")`
    padding-bottom: 1rem;
`;

export type WeekDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type WorkoutType = "Strength & Power" | "Conditioning";

export interface WeekViewProps {
    weekNumber: number;
    weekItems?: Record<string, Item[]>;
}

export interface Item {
    name: string;
    description: string;
    type: WorkoutType;
}

export function WeekView({ weekItems }: WeekViewProps) {

    return (
        <Wrapper>
            {weekItems && Object.entries(weekItems).map((weekDayItems, idx) => {
                return <div key={idx}>
                    {weekDayItems[0] &&
                        <WeekDayItemContainer className="weekday-item-container">
                            <Typography variant="h4" style={{ fontWeight: "bold" }}> {weekDayItems[0]}</Typography >
                            {weekDayItems[1] && weekDayItems[1].map((item, idx2) => {
                                return (<ItemCard title={item.name} exercises={1} estimatedCompletionMinutes={10}></ItemCard>)
                            })}
                        </WeekDayItemContainer>
                    }
                </div>
            })
            }
        </Wrapper>
    );
}

export default WeekView;