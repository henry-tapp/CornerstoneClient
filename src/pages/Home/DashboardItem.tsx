import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ITheme } from "common/App";
import ActivityLineChart, { ActivityLineChartData } from "components/Graph/ActivityLineChart";
import { useCallback, useState } from "react";
import { ColumnStackFlexBox } from "style/styles";

const DashboardItemWrapper = styled("div")(({ theme }) => `
    display: block;
    position:relative;
    width: 100%;
    border-radius: 0.5rem;
`);

const LineChartWrapper = styled("div")(({ theme }) => `
  padding-top:1rem;
  position:relative;
  height: 8rem;
  width: 100%;
`);

const Padding = styled("div")(({ theme }) => `
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding-top:1rem;
  padding-inline: 1rem 1rem;
`);

const Toolbar = styled("div")(({ theme }) => `
  width: 100%;
  margin: auto;
  padding-inline: 1rem 1rem;
  display: flex;
  gap: 0.5rem;
`);

const StyledButton = styled(Button)(({ theme }) => `
  border: 0.0125rem solid ${(theme as ITheme).palette.shades.g5}; 
  border-radius: 0.25rem;
  padding-inline: 0.5rem 0.5rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  color: ${(theme as ITheme).palette.shades.g5};
  background-color: ${(theme as ITheme).palette.shades.g2};
`);

export type ItemViewType = "Graph";

export interface DashboardItemProps {
  item: any;
  type: ItemViewType;
}

function useMockGraphData() {

  return [...Array(12).keys()].map((i) => (
    {
      label: `Week ${i + 1}`,
      hours: (i * 15) + ((i * (i % 2 === 0 ? 5 : -2))),
      workouts: i * 12,
      type: i % 4
    } as const));
}

export function DashboardItem({ item, type }: DashboardItemProps) {

  return (
    <>{type === "Graph"
      ? <LineChartDashboardItem  {...item} />
      : <></>}
    </>
  );
}

interface ChartTotalData {
  totalHours: number;
  workouts: number;
}

function LineChartDashboardItem({ item }: DashboardItemProps) {

  const initialData = useMockGraphData();

  const [chartData, setChartData] = useState<ActivityLineChartData[]>(initialData);
  const [chartTotals, setChartTotals] = useState<ChartTotalData>(calculateTotals(initialData));
  const handleChangeView = useCallback((view: number) => {


    let newData = (view === -1) ? initialData : initialData.filter(x => x.type === view);

    setChartData(newData);
    setChartTotals(calculateTotals(newData));
  }, []);

  return (
    <DashboardItemWrapper>

      <Toolbar>
        <StyledButton onClick={() => handleChangeView(-1)}><Typography variant="overline">Total</Typography></StyledButton>
        <StyledButton onClick={() => handleChangeView(0)}><Typography variant="overline">Conditioning</Typography></StyledButton>
        <StyledButton onClick={() => handleChangeView(1)}><Typography variant="overline">Strength</Typography></StyledButton>
      </Toolbar>
      <ColumnStackFlexBox>
        <Padding>
          <Typography variant="caption">Total hours trained: {chartTotals.totalHours}</Typography>
          <Typography variant="caption">Workouts Completed: {chartTotals.workouts}</Typography>
        </Padding>
      </ColumnStackFlexBox>
      <LineChartWrapper>
        <ActivityLineChart data={chartData} />
      </LineChartWrapper>

    </DashboardItemWrapper>
  )
}

function calculateTotals(data: ActivityLineChartData[]): ChartTotalData {

  return {
    totalHours: data.reduce((sum, current) => sum + current.hours, 0),
    workouts: data.reduce((sum, current) => sum + current.workouts, 0)
  } as ChartTotalData;
}
