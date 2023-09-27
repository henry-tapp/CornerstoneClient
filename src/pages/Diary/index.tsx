import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  padding-top: 0.5rem;
  background: white;
  text-align: center;
  margin: auto;
`;


export function Diary() {


  return (
    <SubPage backLast>
      <PageWrapper>
        <Typography variant="h2">Diary</Typography>
      </PageWrapper>
    </SubPage>
  );
}

export default Diary;
