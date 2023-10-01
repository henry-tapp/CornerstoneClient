import { styled, useTheme } from "@mui/material";
import { Item } from "types/Item";
import { ItemCardSmall } from "./ItemCardSmall";
import { ItemCard } from "./ItemCard";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ITheme } from "common/App";

export interface ItemViewProps {
    items?: Item[];
    handleSelectedItem: (itemId: number) => void;
}

const ItemCardWrapper = styled("div")`
    display: grid;
    padding: 1rem;
    gap: 1rem;
`;

export function ItemView({ items }: ItemViewProps) {

    const [Condensed] = useLocalStorage("Condensed", true);

    return (
        <ItemCardWrapper>
            {items && items.map((item, idx2) => {
                return (
                    <LinkPersistQuery key={idx2} pathname={`../schedule/item/${item.id}`}>
                        {(Condensed
                            ? <ItemCardSmall {...item} />
                            : <ItemCard {...item} />)}
                    </LinkPersistQuery>);
            })}
        </ItemCardWrapper>);
}

export default ItemView;

export function TimeLineView({ items, handleSelectedItem }: ItemViewProps) {
    const theme = useTheme();

    return (<VerticalTimeline>
        {items && items.map((item, idx2) => {
            return (
                <VerticalTimelineElement
                    key={idx2}
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ borderRight: `0.5rem solid ${(theme as ITheme).palette.tertiary.main}` }}
                    iconStyle={{ background: (theme as ITheme).palette.tertiary.main, color: (theme as ITheme).palette.shades.g1 }}
                    contentStyle={{
                        background: (theme as ITheme).palette.shades.g5,
                        color: (theme as ITheme).palette.shades.g1,
                        boxShadow: `${(theme as ITheme).palette.secondary.dark} 0px 0px 20px`,
                        padding: 0
                    }}
                    icon={item.state === "complete" ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankRoundedIcon />}
                >
                    <div key={idx2} onClick={() => handleSelectedItem(item.id)}>
                        <ItemCard {...item} />
                    </div>
                </VerticalTimelineElement>);
        })}
    </VerticalTimeline>);
}