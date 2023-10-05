import { styled } from "@mui/material";
import { ITheme } from "common/App";

export const ColumnStackFlexBox = styled("div")(({ theme }) => `
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`);

export const RoundedLayer = styled("div")(({ theme }) => `
    background-color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 3rem 0 0 0;
    height: calc(100% - 12rem);
    width: 100%;
    position:absolute;
    top: 12rem; 
`); 

export const RoundedLayer2 = styled("div")(({ theme }) => `
    background-color: ${(theme as ITheme).palette.shades.g6};
    border-radius: 1rem 3rem 0 1rem;
    height:50vh;
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
    box-shadow:  1rem 1rem 0  0 ${(theme as ITheme).palette.shades.g6};
`); 

export const GradientBox = styled("div")(({ theme }) => `
    position:absolute;
    opacity: 0.2;
    height:8rem;
    width:100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(${(theme as ITheme).palette.secondary.light}, ${(theme as ITheme).palette.primary.dark});
`);