import { styled } from "@mui/material";
import { Item } from "types/Item";
import { ItemCardSmall } from "./ItemCardSmall";
import { ItemCard } from "./ItemCard";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LinkPersistQuery } from "components/LinkPersistQuery";

export interface ItemViewProps {
    items?: Item[];
}

const ItemCardWrapper = styled("div")`
    display: grid;
    padding: 1rem;
    gap: 1rem;
`;

export function ItemView({ items }: ItemViewProps) {

    const [Condensed] = useLocalStorage("Condensed", true);

    return (<ItemCardWrapper>
        {items && items.map((item, idx2) => {
            return (
                <LinkPersistQuery key={idx2} pathname={`../schedule/item/${item.id}`}>
                    {(Condensed ? <ItemCardSmall {...item} /> : <ItemCard {...item} />)}
                </LinkPersistQuery>);
        })}
    </ItemCardWrapper>)
}

export default ItemView;