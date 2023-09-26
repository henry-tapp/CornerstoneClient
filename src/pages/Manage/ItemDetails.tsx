import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { useParams } from "react-router-dom";

import TimerIcon from '@mui/icons-material/Timer';
import { ITheme } from "common/App";
import { Exercise, GetVariation, ItemGroup } from "types/Item";

const PageWrapper = styled("div")(({ theme }) => `
  width: 100%;
  height: 100%;
  background-color: ${(theme as ITheme).palette.shades.g3};
`);

const ButtonBar = styled("div")(({ theme }) => `
    width: 100%;
    padding: 2rem;
`);

const Description = styled("div")`
  width: 100%;
  height: 100%;
`;

function useMockData() {

    return {
        id: 1,
        name: "Hamstring stretches",
        description: "Flexibility",
        variation: GetVariation("Conditioning"),
        exercises: 4,
        estimatedCompletionMinutes: 12,
        items: [{
            id: 1,
            name: "Good Mornings",
            description: "Flexibility",
        } as Exercise] as Exercise[]
    } as ItemGroup;
}

/**
 * This is a page holding reservation components
 */
export function ItemDetails() {

    const { itemId } = useParams();

    const itemData = useMockData();

    return (
        <SubPage backLast>
            <PageWrapper>
                <ButtonBar>
                    <IconButton><TimerIcon color="primary" /></IconButton>
                </ButtonBar>
                <Description>
                    <Typography variant="body2"></Typography>
                </Description>

            </PageWrapper>
        </SubPage>
    );
}

export default ItemDetails;
