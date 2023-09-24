import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding:1rem;
`;

/**
 * This is a page holding reservation components
 */
export function Schedule() {


  return (
    <SubPage backLast>
      <PageWrapper>
        
      </PageWrapper >
    </SubPage>
  );
}

export default Schedule;
