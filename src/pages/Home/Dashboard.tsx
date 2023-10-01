import { styled } from "@mui/material/styles";
import { DashboardItem } from "./DashboardItem";
import LogoImg from '../../images/Logo_white.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ITheme } from "common/App";
import { IconButton, IconButtonProps } from "@mui/material";

const Wrapper = styled("div")`
    margin: auto;
    display:grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
`;

const LeftAlign = styled("div")`
  grid-column: 1;
  text-align: left;
`;

const RightAlign = styled("div")`
  grid-column: 2;
  text-align: right;
`;


const IconButtonStyle = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  backgroundColor: (theme as ITheme).palette.shades.g5,
  color: (theme as ITheme).palette.primary.main,

  '&:hover, &.Mui-focusVisible': {
    backgroundColor: (theme as ITheme).palette.tertiary.light,
    color: (theme as ITheme).palette.primary.dark

  },
  '&.Mui-active': {
    backgroundColor: (theme as ITheme).palette.tertiary.light,
    color: (theme as ITheme).palette.primary.dark,
  }
}));

const Grid = styled("div")`
  font-weight: bold;
  padding-left: 0.5rem;
`;


function useDashboardItems() {
  return [{


  }];
}


export function Dashboard() {

  const dashboardItems = useDashboardItems();

  return (
    <Wrapper>
      <LeftAlign><img style={{ height: "2.5rem" }} src={LogoImg} alt="failed"></img></LeftAlign >
      <RightAlign><IconButtonStyle><AccountCircleIcon style={{ transform: 'scale(1.8)' }} /></IconButtonStyle></RightAlign>
      <Grid >
        {dashboardItems && dashboardItems.map((item, idx) => (<DashboardItem key={idx} item></DashboardItem>))}
      </Grid>
    </Wrapper>
  );
}

export default Dashboard;