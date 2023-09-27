import { styled } from "@mui/material/styles";
import { DashboardItem } from "./DashboardItem";

const Grid = styled("div") <{ cols: number }>`
  display: grid;
  justify-items: start;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0.5rem;
`;

function useDashboardItems() {
    return [{

        
    }];
}


export function Dashboard() {

    const dashboardItems = useDashboardItems();

    return (
        <Grid cols={1}>
            {dashboardItems && dashboardItems.map((item, idx) => (<DashboardItem key={idx} item></DashboardItem>))}
        </Grid>
    );
}

export default Dashboard;