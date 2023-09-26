import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { useMemo, useState } from "react";
import { WeeklyNavigation } from "./WeeklyNavigation";
import WeekView, { Item } from "./WeekView";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding-top:1rem;
`;

const WeekViewWrapper = styled("div")`
  
  padding-top:5rem;
`;

function useMockWeekData() {

  return [{
    weekNumber: 1,
    items: {
      "Monday": [{
        name: "5x3 SI",
        description: "Boulder protocol",
        type: "Strength & Power",
      } as Item] as Item[],
      "Tuesday": [{
        name: "Pull Ups",
        description: "Hypertrophy",
        type: "Conditioning"
      } as Item,
      {
        name: "Hamstring stretches",
        description: "Flexibility",
        type: "Conditioning"
      } as Item] as Item[]
    } as Record<string, Item[]>
  }]
}

/**
 * This is a page holding reservation components
 */
export function Schedule() {

  const weeks = useMockWeekData();

  const [weekNumber, setWeek] = useState<number>(1);

  const currentWeekItems = useMemo(() => weeks.find(x => x.weekNumber === weekNumber)?.items, [weeks, weekNumber]);

  return (
    <SubPage backLast>
      <PageWrapper>
        <WeeklyNavigation weekNumber={weekNumber} setWeek={setWeek} />
        <WeekViewWrapper><WeekView weekItems={currentWeekItems} weekNumber={weekNumber} /> </WeekViewWrapper>
      </PageWrapper>
    </SubPage>
  );
}

export default Schedule;
