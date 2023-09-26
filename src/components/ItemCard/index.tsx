import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import img from '../../images/item-template.jpg'

const ItemCardContainer = styled("div")`
    width: calc(100% - 2rem);
    height: 3rem;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 3fr 15fr;
    align-content:left;
    gap:0.4rem;
`;

const TypeArea = styled("div")`
    grid-row: 1  / span 3;
    background: orange;
    margin: 0.3rem;
    width: 0.3rem;
`

const HeaderArea = styled("div")`
    grid-column: 3 / span 10;
    grid-row: 1 / span 2;
    padding-inline: 0.5rem;

`

const ImageArea = styled("div")`
    grid-column: 2;
    grid-row: 1 / span 3;
`

const ItemImage = styled("img")`
    
    height: 4rem;
`

const FooterArea = styled("div")`
    grid-column: 3 / span 3;
    grid-row: 2 / span 2;
    padding-inline: 0.5rem;
`

interface ItemCardProps {

    title: string;
    exercises: number;
    estimatedCompletionMinutes: number;
    imageSrc?: string;
    onClick?: () => void;
}

export function ItemCard({ title, exercises, estimatedCompletionMinutes, imageSrc, onClick }: ItemCardProps) {
    return (
        <ItemCardContainer onClick={onClick}>
            <TypeArea></TypeArea>
            <ImageArea><ItemImage src={img} alt={img}></ItemImage></ImageArea>
            <HeaderArea>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>{title}</Typography >
            </HeaderArea>
            <FooterArea>
                <Typography variant="body2">{estimatedCompletionMinutes}m : {exercises} exercise</Typography >
            </FooterArea>
        </ItemCardContainer>
    );
}
