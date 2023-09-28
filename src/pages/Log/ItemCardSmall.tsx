import { Typography, styled } from "@mui/material";
import { useCallback } from "react";
import { Item } from "../../types/Item"
import { ITheme } from "common/App";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    border-radius:0.5rem;
    border: 0.1rem solid ${(theme as ITheme).palette.shades.g4};
    background-color: ${(theme as ITheme).palette.shades.g6};
`);

const ItemCardGridContainer = styled("div")(
    ({ theme }) => `
    width: 100%;
    height: 2rem;
    display: grid;
    grid-template-columns: 1fr 15fr;
`);

const HeaderArea = styled("div")`

    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 4rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    text-decoration: none;
    text-overflow: ellipsis;
    overflow: hidden;
`

const TypeArea = styled("div")(
    ({ color }) => `
    grid-column: 1;
    height: 1.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    margin-left: 0.25rem;
    background: ${color};
    width: 0.2rem;
`);

interface ItemCardProps extends Item {
    imageSrc?: string;
    onClick?: () => void;
}

export function ItemCardSmall({ id, name, shortDescription, variation, exercises, estimatedCompletionMinutes, imageSrc, onClick }: ItemCardProps) {

    const handleClick = useCallback(() => {

        if (onClick) {
            onClick();
        }
    }, [onClick])

    return (
        <Wrapper>
            <ItemCardGridContainer className="itemcard-container" onClick={handleClick}>
                <TypeArea color={variation.Color ?? "#241623"}></TypeArea>
                <HeaderArea>
                    <Typography variant="body1" style={{ fontWeight: "bold" }}>{name}</Typography>
                </HeaderArea>
            </ItemCardGridContainer>
        </Wrapper >
    );
}
