import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { usePlan } from "hooks/usePlan/usePlan";
import { SubPage } from "pages/Navigation/SubPage";
import { useMemo } from "react";
import { getCurrentWeek } from "util/dates";
import { WeekScheduleView } from "./WeekScheduleView";

const PageWrapper = styled("div")(({ theme }) => `
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
  padding-bottom: 3rem;
  background-color: ${(theme as ITheme).palette.shades.g5}; 
`);

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    padding: 1.5rem;    
    background-color: ${(theme as ITheme).palette.shades.g5}; 
    border-radius: 0 0 1rem 1rem ;
    color: ${(theme as ITheme).palette.primary.light}; 
`);

export function Manage() {

  const { data: schedule } = usePlan({});
  const currentWeek = useMemo(() => (!!schedule?.dateStarting) ? getCurrentWeek(new Date(schedule.dateStarting)) : 1, [schedule]);
  const [navigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);

  return (
    <SubPage backLast>
      <PageWrapper>
        <Header>
          <Typography variant="h5" fontWeight={"bold"}>Plan your week:</Typography>
        </Header>
        <WeekScheduleView weekNumber={navigatedWeek} />
      </PageWrapper >
    </SubPage>
  );
}

export default Manage;
