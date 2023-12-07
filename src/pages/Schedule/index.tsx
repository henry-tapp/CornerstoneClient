import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import { LinkPersistQuery } from 'components/LinkPersistQuery';
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { usePlan } from "hooks/usePlan/usePlan";
import { useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { Wrapper } from 'style/styles';
import { getCurrentWeek } from "util/dates";
import { WeekScheduleView } from "./WeekScheduleView";

const PageStyle = styled("div")(({ theme }) => `
  text-align: center;
  margin: auto;
  padding-bottom: 1rem;
  background-image: linear-gradient(${(theme as ITheme).palette.primary.light}, ${(theme as ITheme).palette.primary.dark});
`);

const Header = styled("div")(({ theme }) => `
    margin: auto;
    grid-column: 2;

`);

const Content = styled("div")(({ theme }) => `
    padding-top: 4rem;
`);

const Toolbar = styled("div")(({ theme }) => `
    display: grid;
    padding: 1rem;
    grid-template-columns: 1fr 6fr 1fr;
    background-color: ${(theme as ITheme).palette.shades.g4}; 
    border-radius: 0 0 1rem 1rem;
    color: ${(theme as ITheme).palette.primary.light}; 
    position: fixed;
    overflow: hidden;
    width: calc(100% - 2rem);
    z-index: 100;
`);

const LinkButton = styled("div")(({ theme }) => `
  height: inherit;
  width: 2rem;
`);

export function Index() {

  const theme = useTheme() as ITheme;
  const navigate = useNavigate();
  const { data: schedule } = usePlan({});
  const currentWeek = useMemo(() => (!!schedule?.dateStarting) ? getCurrentWeek(new Date(schedule.dateStarting)) : 1, [schedule]);
  const [navigatedWeek] = useLocalStorage("navigatedWeek", currentWeek);

  return (
    <Wrapper>
      <PageStyle>
        <Toolbar>
          <LinkButton style={{ width: "2rem", gridColumn: "1" }}>
            <LinkPersistQuery pathname={".."} onClick={(e) => { e.preventDefault(); navigate(-1); }}>
              <IconButton style={{ color: theme.palette.primary.main, backgroundColor: theme.palette.shades.g3, borderRadius: "0.5rem" }}>
                <KeyboardBackspaceOutlinedIcon fontSize='small' />
              </IconButton>
            </LinkPersistQuery>
          </LinkButton>
          <Header>
            <Typography variant="h4" fontWeight={"bold"}>Week {navigatedWeek}</Typography>
          </Header>
          <LinkButton style={{ width: "2rem", gridColumn: "3" }}>
            <LinkPersistQuery pathname={`/config`}>
              <IconButton style={{
                color: theme.palette.primary.main, backgroundColor: theme.palette.shades.g3, borderRadius: "0.5rem"
              }}><SettingsIcon fontSize='small' /></IconButton>
            </LinkPersistQuery>
          </LinkButton>
        </Toolbar>
        <Content>
          <WeekScheduleView weekNumber={navigatedWeek} />
        </Content>
      </PageStyle>
    </Wrapper>
  );
}

export default Index;
