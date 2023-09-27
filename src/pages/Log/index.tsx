import { styled } from "@mui/material/styles";
import WeekView from "./WeekView";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;

export function Log() {

    return (
        <PageWrapper>
            <WeekView />
        </PageWrapper>
    );
}

export default Log;