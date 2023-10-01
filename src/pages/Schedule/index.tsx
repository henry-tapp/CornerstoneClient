import { Box, Tab, Tabs, styled } from "@mui/material";
import { ITheme } from "common/App";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import TodayView from "./Today";
import WeekView from "./Week";
import { useSchedule } from "hooks/useSchedule/useSchedule";
import { ViewType, ViewTypes } from "./index.types";
import { ScheduleNotFound } from "./ScheduleNotFound";

const Wrapper = styled("div")(({ theme }) => `
    background: ${(theme as ITheme).palette.primary.dark};
    color: ${(theme as ITheme).palette.shades.g5};
`);

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    centered: boolean;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))((({ theme }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 50,
        width: '100%',
        backgroundColor: (theme as ITheme).palette.tertiary.light,
    },
})));

interface StyledTabProps {
    label: string;
}

const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: (theme as ITheme).palette.shades.g5,
    marginTop: '1rem',
    '&.Mui-selected': {
        color: '#fff',
        position: 'relative',
        maxWidth: '23em',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(25),
        borderRadius: '2rem',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
        transition: 'linear',
        transitionTimingFunction: 'ease-in-out',
    },
}));

function setTabPanelId(index: number) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export function Week() {

    let navigate = useNavigate();
    const { view } = useParams();
    const [searchParams] = useSearchParams();

    if (!(view as ViewType)) {
        navigate(`../home`);
    }

    const [currentView, setView] = useState<ViewType>(view as ViewType);

    const { data: schedule } = useSchedule({});

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {

        if (ViewTypes[newValue] as ViewType) {
            handleViewSet(ViewTypes[newValue]);
        }
    };

    const handleViewSet = useCallback((newView: ViewType) => {

        setView(newView);
        navigate(`../schedule/${newView}?${searchParams}`, { replace: true });
    }, [navigate, setView, searchParams]);

    return (
        <Wrapper className="weekview-wrapper">
            {!schedule
                ? (<ScheduleNotFound />)
                : (<TodayView schedule={schedule} />)}
        </Wrapper >
    );
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
            style={{ paddingTop: '1rem' }}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}
export default Week;