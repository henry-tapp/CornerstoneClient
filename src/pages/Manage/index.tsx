import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { WeekScheduleView } from "./WeekScheduleView";
import { ITheme } from "common/App";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { useSchedule } from "hooks/useSchedule/useSchedule";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { getCurrentWeek } from "util/dates";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  padding-bottom: 3rem;
`;

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    padding: 1.5rem;    
    background-color: ${(theme as ITheme).palette.shades.g5}; 
    border-radius: 0 0 2rem 2rem ;
    color: ${(theme as ITheme).palette.primary.light}; 
`);

export function Manage() {

  const { data: schedule } = useSchedule({});
  const currentWeek = useMemo(() => (!!schedule?.weekStarting) ? getCurrentWeek(new Date(schedule.weekStarting)) : 1, [schedule]);
  const [navigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);

  return (
    <SubPage backLast>
      <PageWrapper>
        <Header>
          <Typography variant="h1" fontWeight={"bold"}>Schedule</Typography>
        </Header>
        <WeekScheduleView weekNumber={navigatedWeek} />
      </PageWrapper >
    </SubPage>
  );
}

export default Manage;
