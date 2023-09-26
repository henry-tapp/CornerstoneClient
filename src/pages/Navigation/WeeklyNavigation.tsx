import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import { Dispatch, SetStateAction, useCallback } from "react";

import img from '../../images/BannerDark.jpg'

const Wrapper = styled("div")`
  width: calc(100% - 2rem);
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  position: fixed;
  overflow:hidden;
  padding: 1rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  background-image: url(${img});
  background-position: center;
  color: white;
`;

const Left = styled("div")`

`;

const Right = styled("div")`

`;

const Center = styled("div")`
  margin: auto;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
  gap: 0.25rem;
`;

export interface WeeklyNavigationProps {
  weekNumber: number;
  setWeek: Dispatch<SetStateAction<number>>
}

export function WeeklyNavigation({ weekNumber, setWeek }: WeeklyNavigationProps) {

  const backbuttonHandle = useCallback(() => {
    let newWeek = weekNumber >= 1 ? weekNumber - 1 : weekNumber;
    if (newWeek !== weekNumber) {
      setWeek(newWeek);
    }
  }, [setWeek, weekNumber]);

  const forwardButtonHandle = useCallback(() => {
    let newWeek = weekNumber <= 12 ? weekNumber + 1 : weekNumber;
    if (newWeek !== weekNumber) {
      setWeek(newWeek);
    }
  }, [setWeek, weekNumber])


  return (<Wrapper>
    <Left>
      <IconButton size="large" disabled={weekNumber === 1} color="success" onClick={backbuttonHandle} ><ArrowBackIosIcon /></IconButton>
    </Left>
    <Center>
      <Typography variant="h4">Week {weekNumber}</Typography><LeaderboardRoundedIcon />
    </Center>
    <Right>
      <IconButton size="large" disabled={weekNumber === 12} color="success" onClick={forwardButtonHandle}><ArrowForwardIosIcon /></IconButton>
    </Right>
  </Wrapper>
  );
}
