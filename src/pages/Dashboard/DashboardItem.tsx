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
  padding:1rem;
  gap: 0.25rem;
`);

const Toolbar = styled("div")(({ theme }) => `
  margin: auto;
  padding-inline: 1rem 1rem;
  display: grid;
  grid-auto-columns: auto;
  gap: 0.5rem;
  padding-top: 1rem;
`);

const StyledButton = styled(Button)(({ theme }) => `
  border: 0.0125rem solid ${(theme as ITheme).palette.shades.g5}; 
  border-radius: 0.25rem;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  color: ${(theme as ITheme).palette.shades.g5};
  background-color: ${(theme as ITheme).palette.secondary.dark};
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
      : <StatisticDashboardItem {...item} />}
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
  const handleChangeView = useCallback((view: number) => {

    let newData = (view === -1) ? initialData : initialData.filter(x => x.type === view);

    setChartData(newData);
    calculateTotals(newData);
  }, []);

  return (
    <DashboardItemWrapper>
      <Toolbar>
        <StyledButton style={{ gridColumn: 1 }} onClick={() => handleChangeView(-1)}><Typography variant="overline">Total</Typography></StyledButton>
        <StyledButton style={{ gridColumn: 2 }} onClick={() => handleChangeView(0)}><Typography variant="overline">Conditioning</Typography></StyledButton>
        <StyledButton style={{ gridColumn: 3 }} onClick={() => handleChangeView(1)}><Typography variant="overline">Strength</Typography></StyledButton>
      </Toolbar>
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

function StatisticDashboardItem({ item }: DashboardItemProps) {

  const initialData = useMockGraphData();

  const [chartTotals] = useState<ChartTotalData>(calculateTotals(initialData));


  return (
    <DashboardItemWrapper>
      <ColumnStackFlexBox>
        <Padding>
          <Typography variant="body1">Total hours trained: {chartTotals.totalHours}</Typography>
          <Typography variant="body1">Workouts Completed: {chartTotals.workouts}</Typography>
        </Padding>
      </ColumnStackFlexBox>
    </DashboardItemWrapper>
  )
}