import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { useTheme } from "@mui/material";
import { ITheme } from "common/App";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { WeekItemView } from 'types';
import { ItemCard } from "../../components/ItemCard/ItemCard";
import "./timeline.css";

export interface ItemViewProps {
    items?: WeekItemView[];
    handleSelectedItem: (itemId: string) => void;
}

export function TimeLineView({ items, handleSelectedItem }: ItemViewProps) {
    const theme = useTheme();

    return (<VerticalTimeline className="verticalClass">
        {items && items.map((item, idx2) => {
            return (
                <VerticalTimelineElement
                    key={idx2}
                    className="vertical-timeline-element--work"
                    contentArrowStyle={{ borderRight: `0.5rem solid ${(theme as ITheme).palette.shades.g1}` }}
                    iconStyle={{
                        boxShadow: `0 0 0 4px #000, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)`,
                        background: item.completed ? (theme as ITheme).palette.tertiary.main : (theme as ITheme).palette.fourth.main,
                        color: (theme as ITheme).palette.shades.g1
                    }}
                    contentStyle={{
                        background: (theme as ITheme).palette.shades.g1,
                        color: (theme as ITheme).palette.shades.g5,
                        boxShadow: `${(theme as ITheme).palette.shades.g1} 0px 0px 20px`,
                        padding: 0,
                        marginLeft: '4rem',
                        marginRight: '0.5rem'

                    }}

                    icon={item.completed ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankRoundedIcon />}
                >
                    <div key={idx2} onClick={() => handleSelectedItem(item.id)}>
                        <ItemCard item={item} />
                    </div>
                </VerticalTimelineElement>);
        })}
    </VerticalTimeline >);
}