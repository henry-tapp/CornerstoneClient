import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { WeeklyNavigation } from "pages/Navigation/WeeklyNavigation";
import { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const PageWrapper = styled("div")`
  width: 100%;
`;

const PaddingWrapper = styled("div")`
  padding-top: 5rem;
`;

export function Plan() {

  const { currentWeek } = useParams();
  const [weekNumber, setWeek] = useState<number>(parseInt(currentWeek ?? "1"));

  let navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleWeekSet = useCallback((newWeek: number) => {
    navigate(`../week/${newWeek}/plan?${searchParams}`, { replace: true });
    setWeek(newWeek);
  }, [setWeek, navigate, searchParams]);

  return (
    <PageWrapper>
      <WeeklyNavigation weekNumber={weekNumber} setWeek={handleWeekSet} />
      <PaddingWrapper>
        <SubPage backLast>

        </SubPage>
      </PaddingWrapper>
    </PageWrapper>
  );
}

export default Plan;