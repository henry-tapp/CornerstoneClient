import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { WeekScheduleView } from "./WeekScheduleView";
import { ITheme } from "common/App";
import { Typography } from "@mui/material";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
`;

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    height: 2rem;
    padding: 1.5rem;    
    background-color: ${(theme as ITheme).palette.shades.g5}; 
    border-radius: 0 0 2rem 2rem ;
    color: ${(theme as ITheme).palette.primary.light}; 
`);

export function Manage() {

  return (
    <SubPage backLast>
      <PageWrapper>
        <Header>
          <Typography variant="h1">SCHEDULE</Typography>
        </Header>
        <WeekScheduleView />
      </PageWrapper >
    </SubPage>
  );
}

export default Manage;
