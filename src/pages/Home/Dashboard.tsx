import { styled } from "@mui/material/styles";
import { DashboardItem } from "./DashboardItem";
import { Typography } from "@mui/material";
import LogoImg from '../../images/Logo.jpg'

const Header = styled(Typography)`
  font-weight: bold;
  padding-left: 0.5rem;
`;

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
    <>
      <img style={{ height: "2rem" }} src={LogoImg} alt="failed"></img>
      <Header variant="h3">RockD</Header>
      <Grid >
        {dashboardItems && dashboardItems.map((item, idx) => (<DashboardItem key={idx} item></DashboardItem>))}
      </Grid>
    </>
  );
}

export default Dashboard;