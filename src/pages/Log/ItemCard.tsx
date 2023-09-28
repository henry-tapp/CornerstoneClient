import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img from '../../images/item-template.jpg'
import { useCallback } from "react";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { Item } from "../../types/Item"
import { ITheme } from "common/App";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    border-radius:0.5rem;
    border: 0.1rem solid ${(theme as ITheme).palette.shades.g5};
    background-color: ${(theme as ITheme).palette.shades.g5};
`);

const ItemCardGridContainer = styled("div")(
    ({ theme }) => `
    width: 100%;
    height: 7rem;
    display: grid;
    grid-template-columns: 1fr 1fr 15fr 1fr;
`);


const ItemImage = styled("img")(({ theme }) => `
    grid-column: 1;
    grid-row: 1 / span 3;
    height: 6rem;
    margin: 0.5rem;
    border: 0.1rem solid ${(theme as ITheme).palette.shades.g4};
    border-radius: 0.5rem;
`);

const TypeArea = styled("div")(
    ({ color }) => `
    grid-column: 2;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    height: 6rem;
    background: ${color};
    width: 0.2rem;
`);

const TextArea = styled("div")`
    grid-column: 3 / span 5;
    grid-row: 1;
    display: inherit;
`

const HeaderArea = styled("div")`

    margin-top:1rem;
    grid-row: 1;
`

const DescriptionArea = styled("div")`
    grid-row: 2;
`


const FooterArea = styled("div")`
    grid-row: 3;
`

const LogButtonArea = styled("div")`
    grid-column: 4;
    grid-row: 1 / span 3;
    display: flex;
    justify-items: center;
    align-items: center;
`

interface ItemCardProps extends Item {
    imageSrc?: string;
    onClick?: () => void;
}

export function ItemCard({ id, name, shortDescription, variation, exercises, estimatedCompletionMinutes, imageSrc, onClick }: ItemCardProps) {

    const handleClick = useCallback(() => {

        if (onClick) {
            onClick();
        }
    }, [onClick])

    return (
        <Wrapper>
            <LinkPersistQuery pathname={`item/${id}`}>
                <ItemCardGridContainer className="itemcard-container" onClick={handleClick}>
                    <ItemImage src={imageSrc ?? img} alt={"No Image found"}></ItemImage>
                    <TypeArea color={variation.Color ?? "#241623"}></TypeArea>
                    <TextArea>
                        <HeaderArea>
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>{name}</Typography>
                        </HeaderArea>
                        <DescriptionArea>
                            <Typography variant="body1">{shortDescription}</Typography>
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
            </LinkPersistQuery>
        </Wrapper>
    );
}
