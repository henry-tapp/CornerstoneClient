import { alpha, styled } from "@mui/material/styles";
import { DashboardItem, ItemViewType } from "./DashboardItem";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ITheme } from "common/App";
import { IconButton, IconButtonProps, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import imgSrc from '../../images/Untitled design.png';

const Wrapper = styled("div")`
  width:100%;
`;

const Header = styled("div")(({ theme }) => `
    margin: auto;
    display:grid;
    grid-template-columns: 5fr 1fr;
    height: 8rem;
    padding: 1.5rem;
    background-image: linear-gradient(
      to bottom,
      ${alpha((theme as ITheme).palette.shades.g4, 0.90)},
      ${alpha((theme as ITheme).palette.shades.g4, 0.75)}
    ),  url('${imgSrc}');
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

const FullLine  = styled(TextField)(({ theme }) => `
  grid-column: 1 /span 2;
  grid-row: 2;
  text-align: center;
  display:flex;
  z-index:1;
  margin:auto;
  width:90%;
  background: linear-gradient(${(theme as ITheme).palette.secondary.dark}, ${(theme as ITheme).palette.primary.main});
  border-radius:0.5rem;
  border: 0.025rem solid ${(theme as ITheme).palette.shades.g1};
  margin-top:1rem;
`);

const Grid = styled("div")`
    margin:auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-inline: 1rem 1rem;
    padding-top:3rem;
`;

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
  }, [])

  const dashboardItems = useDashboardItems();

  return (
    <Wrapper>
      <Header>
        <LeftAlign>
          <Typography variant="caption" fontWeight={"bold" }>Hey Henry!</Typography>
          <Typography variant="h1" fontWeight={"bold" }>How's your training going?</Typography>
        </LeftAlign>
        <RightAlign><IconButtonStyle onClick={handleAccountClick}><AccountCircleIcon style={{ transform: 'scale(1.8)' }} /></IconButtonStyle></RightAlign>
        
      </Header>

      <Grid >
        {dashboardItems && dashboardItems.map((item, idx) => (<DashboardItem key={idx} {...item}></DashboardItem>))}
      </Grid>
    </Wrapper>
  );
}

export default Dashboard;