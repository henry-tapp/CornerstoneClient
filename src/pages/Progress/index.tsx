import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
  background: white;
  text-align: center;
  margin: auto;
`;

/**
 * This is a page holding reservation components
 */
export function Progress() {


  return (
    <PageWrapper>
      <Typography variant="h2">Progress</Typography>
    </PageWrapper>
  );
}

export default Progress;
