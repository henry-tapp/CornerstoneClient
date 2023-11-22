import { Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import 'react-indiana-drag-scroll/dist/style.css';
import { useIntl } from 'react-intl';
import { ScheduleWeekView } from "types";

const Wrapper = styled("div")(({ theme }) => `
  overflow: hidden;
  justify-items: center;
  background-position: center;
  padding-inline: 1.5rem 1.5rem;
`);

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
  scheduleWeek: ScheduleWeekView;
  selectedDate: Date,
  onClick: (newDate: Date) => void;
}

export function DayPicker({ scheduleWeek, selectedDate, onClick }: DayPickerProps) {

  const intl = useIntl();

  return (
    <Wrapper>
      <StyledGrid>
        {getDaysArray(scheduleWeek.weekStarting, scheduleWeek.weekEnding).map((date, idx) => {
          return (
            <GridItemContainer key={idx} data-datevalue={date} onClick={(e: React.MouseEvent<HTMLElement>) => onClick(new Date(e.currentTarget.dataset.datevalue ?? selectedDate))}>
              <FlexColumn selected={selectedDate.getDay() === date.getDay()}>
                <DateTypographies>
                  <Typography variant="subtitle1">{date.getDate()}</Typography>
                  <Typography variant="button">{date.toLocaleDateString(intl.locale, { weekday: 'short' })}</Typography>
                </DateTypographies>
                {selectedDate.getDay() === date.getDay() && (<OvalHighlight />)}
              </FlexColumn>
            </GridItemContainer>
          );
        })}
      </StyledGrid>
    </Wrapper>
  );
}

export default DayPicker;