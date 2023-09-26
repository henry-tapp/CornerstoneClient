import { IconButton, Typography, styled } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import img from '../../images/item-template.jpg'
import { useCallback } from "react";
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { Item } from "./WeekView";

const ItemCardWrapper = styled("div")`
    position:relative;
`;

const ItemCardGridContainer = styled("div")`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr 15fr 1fr;
`;

const TypeArea = styled("div")(
    ({ color }) => `
    grid-column: 1;
    grid-row: 1  / span 3;
    background: ${color};
    width: 0.4rem;
`);

const HeaderArea = styled("div")`
    grid-column: 3 / span 3;
    grid-row: 1 ;
`

const TextArea = styled("div")`
    padding-inline: 0.5rem 0.5rem;
`

const ItemImage = styled("img")`
    height: 4rem;
    grid-column: 2;
    grid-row: 1 / span 3;
`
const MiddleArea = styled("div")`
    grid-column: 3 / span 3;
    grid-row: 2 ;
`

const FooterArea = styled("div")`
    grid-column: 3 / span 3;
    grid-row: 3 ;
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

export function ItemCard({ id, name, variation, exercises, estimatedCompletionMinutes, imageSrc, onClick }: ItemCardProps) {

    const handleClick = useCallback(() => {

        if (onClick) {
            onClick();
        }
    }, [onClick])

    return (
        <LinkPersistQuery pathname={`../item/${id}`}>
            <ItemCardWrapper>
                <ItemCardGridContainer className="itemcard-container" onClick={handleClick}>
                    <TypeArea color={variation.Color ?? "#241623"}></TypeArea>
                    <ItemImage src={imageSrc ?? img} alt={"No Image found"}></ItemImage>
                    <TextArea>
                        <HeaderArea>
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>{name}</Typography >
                        </HeaderArea>
                        <MiddleArea>
                            <Typography variant="caption">{exercises} exercise{exercises > 1 && "s"}</Typography >
                        </MiddleArea>
                        <FooterArea>
                            <Typography variant="caption">{estimatedCompletionMinutes}m </Typography >
                        </FooterArea>
                    </TextArea>
                    <LogButtonArea>
                        <IconButton><ArrowForwardIosIcon /></IconButton>
                    </LogButtonArea>
                </ItemCardGridContainer>
            </ItemCardWrapper>
        </LinkPersistQuery>
    );
}
