import { LinkPersistQuery } from "components/LinkPersistQuery";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BookIcon from '@mui/icons-material/Book';
import { ITheme } from "common/App";

const NavBarContainer = styled("div")(
  ({ theme }) => `
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  gap: 1rem;
`
);

const NavBarLinkPersistQuery = styled(LinkPersistQuery)(
  ({ theme }) => `
  width: 100%;

  button {
    height: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    border-radius: 1rem;
    background-color: ${(theme as ITheme).palette.shades.g4}
  }

  &:last-child > button {
    border-right: none;
  }

  &.active > button {
    background-color: ${theme.vars.palette.secondary.main};
    color: ${theme.vars.palette.secondary.contrastText};
  }
`
);

export function NavigationButtons() {
  return (
    <NavBarContainer data-testid="navbar" className="wrapper-nav-bar">
      <NavBarLinkPersistQuery pathname="manage" activeOnEmpty>
        <Button fullWidth><AddCircleIcon /><span>Manage</span></Button>
      </NavBarLinkPersistQuery>
      <NavBarLinkPersistQuery pathname="schedule">
        <Button fullWidth><CalendarMonthIcon /><span>Schedule</span></Button>
      </NavBarLinkPersistQuery>
      <NavBarLinkPersistQuery pathname="diary">
        <Button fullWidth><BookIcon />Diary</Button>
      </NavBarLinkPersistQuery>
    </NavBarContainer>
  );
}
