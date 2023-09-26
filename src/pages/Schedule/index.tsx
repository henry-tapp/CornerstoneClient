import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { Typography } from "@mui/material";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;



/**
 * This is a page holding reservation components
 */
export function Schedule() {

  return (
    <PageWrapper>
      <SubPage backLast>
        <Typography variant="h1">Schedule</Typography>
      </SubPage>
    </PageWrapper>
  );
}

export default Schedule;
