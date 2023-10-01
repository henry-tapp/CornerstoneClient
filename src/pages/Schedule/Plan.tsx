import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { SubPage } from "pages/Navigation/SubPage";
import { WeeklyNavigation } from "pages/Navigation/WeeklyNavigation";
import { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PageWrapper = styled("div")(({ theme }) => `
  background: ${(theme as ITheme).palette.shades.g5};
`);

const PaddingWrapper = styled("div")`
  padding-top: 5rem;
`;

export function Plan() {

  const { currentWeek } = useParams();
  const [weekNumber, setWeek] = useState<number>(parseInt(currentWeek ?? "1"));

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleWeekSet = useCallback((newWeek: number) => {
    navigate(`../week/plan?${searchParams}`, { replace: true });
    setWeek(newWeek);
  }, [setWeek, navigate, searchParams]);

  return (
    <PageWrapper>
      <WeeklyNavigation weekNumber={weekNumber} setWeek={handleWeekSet} />
      <PaddingWrapper>
        <SubPage backLast>
          <div style={{ height: "50rem" }}></div>
        </SubPage>
      </PaddingWrapper>
    </PageWrapper>
  );
}

export default Plan;