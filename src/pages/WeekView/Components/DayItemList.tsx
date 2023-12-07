import { styled } from "@mui/material";
import 'react-vertical-timeline-component/style.min.css';
import { WeekItem } from 'types';
import StockExerciseImage from '../../../images/gen/indoor-boulder-2.jpeg';
import WeekItemCard from "./WeekItemCard";
import WorkoutList from "./WorkoutList";

const ItemListWrapper = styled("div")(({ theme }) => `
    padding-top: 1rem;
    width: 100%;
    text-align: center;
`);


const CardWrapper = styled("div")(({ theme }) => `
    display: inline-block;
    text-align: left;
    padding-bottom: 1rem;
`);

export interface ItemViewProps {
    items?: WeekItem[];
}

export function DayItemList({ items }: ItemViewProps) {
    return (
        <ItemListWrapper className="day-item-list">
            {items && items.map((item, i) => {
                return (<CardWrapper key={i} >
                    <WeekItemCard item={item} imageSrc={StockExerciseImage} onClick={() => { }}>
                        <WorkoutList workouts={item.workouts} />
                    </WeekItemCard>
                </CardWrapper>
                )
            })}
        </ItemListWrapper>);
}