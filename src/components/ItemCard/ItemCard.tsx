import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton, Typography, styled } from "@mui/material";
import { WeekItem } from 'types';


const ItemCardGridContainer = styled("div")(
    ({ theme }) => `
    position:relative;
    background-color: inherit;
    color: inherit;
    border-radius: 0.5rem;
    width: 100%;
    height: 7rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    align-items: left;
    padding:1rem;
    padding-right:2rem;
    position:relative;
`);

const CardGrid = styled("div")`
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    text-align: left;
`

const HeaderArea = styled("div")`

    grid-column: 1 / span 3;
    grid-row: 1;
`

const DescriptionArea = styled("div")`
    grid-column: 1 / span 3;
    grid-row: 2;
`

const RightArea = styled("div")`
    grid-column: 3;
    grid-row: 1;
    text-align:right;
`

const LogButtonArea = styled("div")`
    position:absolute;
    bottom: 0;
    right: 0;
`

interface ItemCardProps {
    item: WeekItem;
}

export function ItemCard({ item }: ItemCardProps) {


    return (
        <ItemCardGridContainer className="itemcard-container" >
            <CardGrid>
                <HeaderArea>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>{item.name}</Typography>
                </HeaderArea>
                <DescriptionArea>
                    <Typography variant="body1" style={{ wordBreak: "break-all" }}>{item.description}</Typography>
                </DescriptionArea>
                <RightArea>
                    {item.estimatedCompletionMinutes !== 0 && item.type && (<>
                        <Typography variant="caption">{item.type}</Typography >
                        <Typography variant="caption"> &#8226; </Typography>
                        <Typography variant="caption">{item.estimatedCompletionMinutes}m </Typography >
                    </>
                    )}
                </RightArea>
                <LogButtonArea>
                    <IconButton style={{ color: "white" }}><ArrowForwardIosIcon /></IconButton>
                </LogButtonArea>
            </CardGrid>
        </ItemCardGridContainer>
    );
}