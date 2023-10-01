import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useCallback } from "react";

const Wrapper = styled("div")(({ theme }) => `
  width: calc(100% - 2rem);
  height: 3rem;
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  overflow:hidden;
  padding: 1rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  background-position: center;
`);

const Center = styled("div")`
  margin: auto;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
  gap: 0.25rem;
`;

export interface WeeklyNavigationProps {
  weekNumber: number;
  setWeek: (newWeek: number) => void;
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
    <>
      <IconButton size="large" disabled={weekNumber === 1} color="secondary" onClick={backbuttonHandle} ><ArrowBackIosIcon /></IconButton>
    </>
    <Center>
      <Typography variant="caption">Week {weekNumber}</Typography>
    </Center>
    <>
      <IconButton size="large" disabled={weekNumber === 12} color="secondary" onClick={forwardButtonHandle}><ArrowForwardIosIcon /></IconButton>
    </>
  </Wrapper>
  );
}
