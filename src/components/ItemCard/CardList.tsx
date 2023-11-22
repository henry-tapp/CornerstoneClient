import { Typography, styled } from "@mui/material";
import { WeekItem } from 'types';
import { CardListItem } from './CardListItem';

const ItemCardGridContainer = styled("div")(
    ({ theme }) => `
    position:relative;
    background-color: inherit;
    color: inherit;
    border-radius: 0.5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    padding:1rem;
    padding-right:2rem;
    position:relative;
`);

interface CardListProps {
    item: WeekItem;
}

export function CardList({ item }: CardListProps) {

    return (
        <ItemCardGridContainer className="itemcard-container" >
            <Typography variant="subtitle1" >Workouts:</Typography>
            <br />
            {item.workouts.map((workout, i) => {

                return (<CardListItem key={i} workout={workout} />)
            })}
        </ItemCardGridContainer>
    );
}
