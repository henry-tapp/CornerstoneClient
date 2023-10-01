import { Typography, styled, IconButton } from "@mui/material";
import { ITheme } from "common/App";
import { useIntl } from 'react-intl';
import { useCallback } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import 'react-indiana-drag-scroll/dist/style.css';

const Wrapper = styled("div")(({ theme }) => `
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  overflow: hidden;
  justify-items: center;
  align-items: center;
  background-position: center;
`);

const Center = styled("div")`
  margin: auto;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
`;

const StyledGrid = styled("div")(({ theme }) => `
    display: grid;
    justify-items: start;
    grid-template-columns: repeat(7, 1fr);
    padding-bottom: 0.5rem;
    text-align: center;
`);

const GridItemContainer = styled("div")(({ theme }) => `
  width: 100%;
  :nth-of-type(7n-1):last-of-type {
    grid-column: span 2
  }

  & .selected {
    border-radius: 2rem;
    background-color: ${(theme as ITheme).palette.shades.g6};
  }
`);

const FlexColumn = styled("div")<{ selected: boolean }>(({ theme, selected }) => `
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:5rem;
    position: relative;
    ${selected && ` color:  ${(theme as ITheme).palette.shades.g0};`}
`);

const OvalHighlight = styled("div")(({ theme }) => `
    position:absolute;
    border-radius: 2rem;
    z-index: 0;
    background-color: ${(theme as ITheme).palette.shades.g6};
    height:5rem;
    width: 2.5rem; 
`);

const DateTypographies = styled("div")(({ theme }) => `
    display: inherit;
    flex-direction: inherit;
    z-index:1;
    width: 2.5rem; 
`);

const getDaysArray = function (start: Date, end: Date) {
  for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

export interface DayPickerProps {
  weekNumber: number;
  weekStarting: Date,
  weekEnding: Date,
  selectedDate: Date,
  onClick: (newDate: Date) => void;
  setWeek: (newWeek: number) => void
}

export function DayPicker({ weekNumber, weekStarting, weekEnding, selectedDate, onClick, setWeek }: DayPickerProps) {
  const intl = useIntl();

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

  return (
    <Wrapper>
      <>
        <IconButton size="large" disabled={weekNumber === 1} color="secondary" onClick={backbuttonHandle} ><ArrowBackIosIcon /></IconButton>
      </>
      <Center>
        <StyledGrid>
          {getDaysArray(weekStarting, weekEnding).map((date, idx) => {
            return (
              <GridItemContainer key={idx} data-datevalue={date} onClick={(e: React.MouseEvent<HTMLElement>) => onClick(new Date(e.currentTarget.dataset.datevalue ?? selectedDate))}>
                <FlexColumn selected={selectedDate.getDay() === date.getDay()}>
                  <DateTypographies>
                    <Typography variant="overline">{date.getDate()}</Typography>
                    <Typography variant="overline">{date.toLocaleDateString(intl.locale, { weekday: 'short' })}</Typography>
                  </DateTypographies>
                  {selectedDate.getDay() === date.getDay() && (<OvalHighlight />)}
                </FlexColumn>
              </GridItemContainer>
            );
          })}
        </StyledGrid>
      </Center>
      <>
        <IconButton size="large" disabled={weekNumber === 12} color="secondary" onClick={forwardButtonHandle}><ArrowForwardIosIcon /></IconButton>
      </>
    </Wrapper>
  );
}

export default DayPicker;