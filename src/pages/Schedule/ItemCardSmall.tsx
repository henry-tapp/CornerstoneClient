import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Item } from "../../types/Item"
import { ITheme } from "common/App";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    background-color: ${(theme as ITheme).palette.primary.light};
    border-radius: 0.5rem;
`);

const ItemCardGridContainer = styled("div")(
    ({ theme }) => `
    width: 100%;
    display: grid;
    height: 3.8rem;
    grid-template-columns: 5fr 1fr;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-inline: 1rem 1rem;
`);

const TextArea = styled("div")`
    grid-column: 1;
    grid-row: 1;
    display: inherit;
`

const HeaderArea = styled("div")`

    grid-row: 1;
`

const DescriptionArea = styled("div")`
    grid-row: 2;
`
const FooterArea = styled("div")`
    grid-row: 3;
`

const LogButtonArea = styled("div")`
    grid-column: 2;
    grid-row: 1 / span 3;
    display: flex;
    justify-items: center;
    align-items: center;
`

interface ItemCardProps extends Item {
    imageSrc?: string;
}

export function ItemCardSmall({ name, shortDescription, exercises, estimatedCompletionMinutes }: ItemCardProps) {


    return (
        <Wrapper>
            <ItemCardGridContainer className="itemcard-container">
                <TextArea>
                    <HeaderArea>
                        <Typography variant="body2">{name}</Typography>
                    </HeaderArea>
                    <DescriptionArea>
                        <Typography variant="body2">{shortDescription}</Typography>
                    </DescriptionArea>
                    <FooterArea>
                        <Typography variant="caption">{exercises} exercise{exercises > 1 && "s"}</Typography >
                        <Typography variant="caption"> &#8226; </Typography>
                        <Typography variant="caption">{estimatedCompletionMinutes}m </Typography >
                    </FooterArea>
                </TextArea>
                <LogButtonArea>
                    <IconButton><ArrowForwardIosIcon /></IconButton>
                </LogButtonArea>
            </ItemCardGridContainer>
        </Wrapper >
    );
}
