import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { alpha, styled, useTheme } from "@mui/material";
import { ITheme } from "common/App";
import { CardList } from 'components/ItemCard/CardList';
import { FlashCardWrapper } from 'components/ItemCard/FlashCardWrapper';
import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { WeekItem } from 'types';
import { ItemCard } from "../../components/ItemCard/ItemCard";
import "./timeline.css";

const TimelineItemWrapper = styled("div")(({ theme }) => `
    background: ${alpha((theme as ITheme).palette.shades.g1, 1)};
    border-radius: 1rem; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
`);

export interface ItemViewProps {
    items?: WeekItem[];
}

export function TimeLineView({ items }: ItemViewProps) {
    const theme = useTheme();
    const [expanded, setExpanded] = useState<boolean | number>(-1);
    return (<VerticalTimeline className="verticalClass">
        {items && items.map((item, idx2) => {
            return (
                <FlashCardWrapper key={idx2} i={idx2 + 1} expanded={expanded} setExpanded={setExpanded}
                    smallChild={
                        <VerticalTimelineElement
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
                            <div key={idx2} >
                                <ItemCard item={item} />
                            </div>
                        </VerticalTimelineElement>}

                    bigChild={
                        <TimelineItemWrapper>
                            <CardList item={item} onBack={() => setExpanded(-1)} />
                        </TimelineItemWrapper>
                    } />);
        })}
    </VerticalTimeline >);
}