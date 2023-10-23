import { styled } from "@mui/material/styles";
import { DashboardItem, ItemViewType } from "./DashboardItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ITheme } from "common/App";
import { IconButton, IconButtonProps, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const Wrapper = styled("div")`
  width:100%;
`;

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    grid-template-columns: 5fr 1fr;
    padding: 1.5rem;
    background-color: ${(theme as ITheme).palette.shades.g5}; 
    border-radius: 0 0 2rem 2rem ;
    color: ${(theme as ITheme).palette.primary.light}; 
`);


const LeftAlign = styled("div")`
  grid-column: 1;
  text-align: left;
`;

const RightAlign = styled("div")`
  grid-column: 2;
  text-align: right;
  padding-top:1rem;
`;

const Grid = styled("div")(({ theme }) => `
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-inline: 1rem 1rem;
`);


const GridItem = styled("div")(({ theme }) => `
  background: ${(theme as ITheme).palette.primary.main};
  color: ${(theme as ITheme).palette.shades.g4};
  margin: 1rem;
  padding-top:1rem; 
  width:100%;
  border: 0.15rem solid ${(theme as ITheme).palette.secondary.dark};
  border-radius:1rem;
`);

const IconButtonStyle = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  backgroundColor: (theme as ITheme).palette.shades.g1,
  color: (theme as ITheme).palette.tertiary.light,

  '&:hover, &.Mui-focusVisible': {
    backgroundColor: (theme as ITheme).palette.tertiary.light,
    color: (theme as ITheme).palette.primary.dark

  },
  '&.Mui-active': {
    backgroundColor: (theme as ITheme).palette.tertiary.light,
    color: (theme as ITheme).palette.primary.dark,
  }
}));

function useDashboardItems() {
  return [{

    item: 1,
    type: "Graph" as ItemViewType
  }];
}

export function Dashboard() {

  const navigate = useNavigate();

  const handleAccountClick = useCallback(() => {

    navigate("../account");
  }, [navigate])

  const dashboardItems = useDashboardItems();

  return (
    <Wrapper>
      <Header>
        <LeftAlign>
          <Typography variant="caption" fontWeight={"bold"}>Hey Henry!</Typography>
          <Typography variant="h1" fontWeight={"bold"}>How's your training going?</Typography>
        </LeftAlign>
        <RightAlign><IconButtonStyle onClick={handleAccountClick}><AccountCircleIcon style={{ transform: 'scale(1.8)' }} /></IconButtonStyle></RightAlign>
      </Header>

      <Grid >
        {dashboardItems && dashboardItems.map((item, idx) => (<GridItem key={idx}><DashboardItem  {...item}></DashboardItem></GridItem>))}
      </Grid>
    </Wrapper>
  );
}

export default Dashboard;