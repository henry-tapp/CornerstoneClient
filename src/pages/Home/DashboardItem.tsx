import { styled } from "@mui/material/styles";

const Wrapper = styled("div")`
  display: grid;
  justify-items: start;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 0.5rem;
`;

function useDashboardItems() {

}



export function DashboardItem({item} : DashboardItemProps) {

    return (
        <Wrapper></Wrapper>
    );
}