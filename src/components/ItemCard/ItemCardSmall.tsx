import { Typography, styled } from "@mui/material";
import { ITheme } from "common/App";

const Container = styled("div")`
    background-color: inherit;
    color: inherit;
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    height:1.5rem;
`


const Name = styled(Typography)(({ theme }) => `
    color: ${(theme as ITheme).palette.tertiary.light};
    display: flex;
    justify-content: center;
    align-items: center;
`);

const Description = styled("div")(({ theme }) => `
    color: ${(theme as ITheme).palette.shades.g5};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:auto;
`);



interface ItemCardSmallProps {
    name: string;
    description: string | undefined;
}

export function ItemCardSmall({ name, description }: ItemCardSmallProps) {

    return (
        <Container>
            <Name variant="caption" style={{ fontWeight: "bold" }}>{name}</Name>
            {description && (<Description><Typography variant="caption" >{description}</Typography></Description>)}
        </Container>
    );
}