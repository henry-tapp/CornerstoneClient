import { styled } from "@mui/material";
import { ITheme } from "common/App";

export const ColumnStackFlexBox = styled("div")(({ theme }) => `
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`);

export const RoundedLayer = styled("div")(({ theme }) => `
    background-image: linear-gradient(${(theme as ITheme).palette.shades.g4}, #254352);
    border-radius: 3rem 0 0 0;
    min-height: calc(100% - 14rem);
    overflow: hidden;
    width: 100%;
    top: 12rem; 
    position:absolute;
`);

export const RoundedLayer2 = styled("div")(({ theme }) => `
    background-color: ${(theme as ITheme).palette.shades.g4};
    z-index: 0;
    border-radius: 1rem 3rem 0 1rem;
    height:12rem;
    width:5rem;
    position:absolute;
    top: 3rem;
    right: -4rem;
`);

export const Pseudo = styled("div")(({ theme }) => `
    background-color: transparent;
    border-radius: 0 0 3rem 0;
    height:5rem;
    width:5rem;
    position:absolute;
    top: 7rem;
    right: 1rem;
    box-shadow: 1rem 1rem 0 0 ${(theme as ITheme).palette.shades.g4};;
`);

export const GradientBox = styled("div")(({ theme }) => `
    position:absolute;
    opacity: 1;
    height:15rem;
    width:100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(#274151, #242c4c);
`);

export const BubbleBox = styled("div")(({ theme }) => `
    position:absolute;
    height:8rem;
    width:100%;
    top: 0;
    left: 0;
    background: ${(theme as ITheme).palette.tertiary.light};
    border-radius: 2rem;
    z-index: 0;
`);