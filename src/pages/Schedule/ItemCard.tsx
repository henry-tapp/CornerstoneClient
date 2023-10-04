import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Item } from "../../types/Item"
import { ITheme } from "common/App";


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
    position:relative;
`);

const TextArea = styled("div")`
    display: grid;
    grid-template-columns: 3fr 1fr 3fr;
    text-align: left;
`

const HeaderArea = styled("div")`

    grid-column: 1;
    grid-row: 1;
`

const DescriptionArea = styled("div")`
    grid-column: 1 / span 2;
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

interface ItemCardProps extends Item {
    imageSrc?: string;
}

export function ItemCard({ name, shortDescription, variation, exercises, estimatedCompletionMinutes, imageSrc }: ItemCardProps) {

    return (
        <ItemCardGridContainer className="itemcard-container" >
            {/* <ItemImage src={imageSrc ?? img} alt={"No Image found"}></ItemImage> */}
            {/* <TypeArea color={variation.Color ?? "#241623"}></TypeArea> */}
            <TextArea>
                <HeaderArea>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>{name}</Typography>
                </HeaderArea>

                <DescriptionArea>
                    <Typography variant="body1">{shortDescription}</Typography>
                </DescriptionArea>
                <RightArea>
                    {estimatedCompletionMinutes !== 0 && exercises && (<>
                        <Typography variant="caption">{exercises} exercise{exercises > 1 && "s"}</Typography >
                        <Typography variant="caption"> &#8226; </Typography>
                        <Typography variant="caption">{estimatedCompletionMinutes}m </Typography >
                    </>
                    )}
                </RightArea>
                <LogButtonArea>
                    <IconButton><ArrowForwardIosIcon /></IconButton>
                </LogButtonArea>
            </TextArea>
        </ItemCardGridContainer>
    );
}