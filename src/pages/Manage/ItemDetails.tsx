import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SubPage } from "pages/Navigation/SubPage";
import { useParams } from "react-router-dom";

const PageWrapper = styled("div")`
  width: 100%;
  height: 100%;
`;

/**
 * This is a page holding reservation components
 */
export function ItemDetails() {

    const { itemId } = useParams();

    return (
        <SubPage backLast>
            <PageWrapper>
                <Typography variant="h2">{itemId} Test</Typography>
            </PageWrapper>
        </SubPage>
    );
}

export default ItemDetails;
