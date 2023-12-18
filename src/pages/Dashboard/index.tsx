import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Wrapper } from 'style/styles';
import { AccountManagementButton } from './AccountManagementButton';
import { DashboardItem, ItemViewType } from "./DashboardItem";

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    grid-template-columns: 5fr 1fr;
    padding: 1.5rem;
    background-color: ${(theme as ITheme).palette.primary.main}; 
    border-radius: 0 0 2rem 2rem ;
    color: ${(theme as ITheme).palette.shades.g4}; 
`);


const LeftAlign = styled("div")`
  grid-column: 1;
  text-align: left;
`;

const RightAlign = styled("div")`
  grid-column: 2;
  text-align: right;
  padding-top:0.5rem;
`;

const Grid = styled("div")(({ theme }) => `
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
`);


const GridItem = styled("div")(({ theme }) => `
  width:100%;
`);

const ColourWrapper = styled("div")(({ theme }) => `
  background-image: linear-gradient(${(theme as ITheme).palette.primary.dark}, ${(theme as ITheme).palette.primary.light});
  color: ${(theme as ITheme).palette.shades.g6};
  border: 0.15rem solid ${(theme as ITheme).palette.secondary.dark};
  border-radius:1rem;
`);

function useDashboardItems() {
  return [
    {

      item: 2,
      type: "stats" as ItemViewType
    }, {

      item: 1,
      type: "Graph" as ItemViewType
    },];
}

export function Dashboard() {

  const navigate = useNavigate();

  const handleAccountClick = useCallback(() => {

    navigate("../account");
  }, [navigate])

  const dashboardItems = useDashboardItems();

  return (
    <Wrapper className="wrapper">
      <Header>
        <LeftAlign>
          <Typography variant="caption" fontWeight={"bold"}>Hey Henry!</Typography>
          <Typography variant="h5" fontWeight={"bold"}>How's your training going?</Typography>
        </LeftAlign>
        <RightAlign>
          <AccountManagementButton onClick={handleAccountClick}>
            <AccountCircleIcon style={{ transform: 'scale(1.8)' }} />
          </AccountManagementButton>
        </RightAlign>
      </Header>
      <Grid >
        {dashboardItems && dashboardItems.map((item, idx) =>
        (
          <GridItem key={idx}>
            <ColourWrapper>
              <DashboardItem {...item} />
            </ColourWrapper>
          </GridItem>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default Dashboard;