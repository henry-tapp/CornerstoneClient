import { useTheme } from "@mui/material";
import { Item } from "types/Item";
import { ItemCard } from "./ItemCard";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { ITheme } from "common/App";

export interface ItemViewProps {
    items?: Item[];
    handleSelectedItem: (itemId: number) => void;
}

export function TimeLineView({ items, handleSelectedItem }: ItemViewProps) {
    const theme = useTheme();

    return (<VerticalTimeline>
        {items && items.map((item, idx2) => {
            return (
                <VerticalTimelineElement
                    key={idx2}
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ borderRight: `0.5rem solid ${(theme as ITheme).palette.shades.g1}` }}
                    iconStyle={{ background: (theme as ITheme).palette.tertiary.main, color: (theme as ITheme).palette.shades.g1 }}
                    contentStyle={{
                        background: (theme as ITheme).palette.shades.g1,
                        color: (theme as ITheme).palette.shades.g5,
                        boxShadow: `${(theme as ITheme).palette.shades.g1} 0px 0px 20px`,
                        padding: 0,
                        marginLeft: '5rem',
                        marginRight: '1rem'

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