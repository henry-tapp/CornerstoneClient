import { Box, styled } from "@mui/material";
import { ITheme } from "common/App";

export const CenterContainer = styled("div")(({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`);

export const RunnerWrapper = styled("div")(({ theme }) => `
    position: relative;
    background-image: linear-gradient(${(theme as ITheme).palette.shades.g4}, ${(theme as ITheme).palette.primary.main});
    height: 100vh;
    width: 100vw;
`);

export const CenterBox = styled("div")(({ theme }) => `
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`);

export const TopBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    width: 25rem;
`);

export const MidBox = styled(Box)(({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding:1rem;
    text-align:center;
`);

export const TextArea = styled("div")(({ theme }) => `
    padding: 2rem;
    border-radius:1rem;
    width: 10rem;
`);


export const Footer = styled(Box)(({ theme }) => `
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding:1rem;
    text-align:center;
`);

export const ButtonBar = styled(Box)(({ theme }) => `
    position: fixed;
    overflow: hidden;
    padding-bottom: 0.75rem;
    padding-top: 0.5rem;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align:center;
    color: ${(theme as ITheme).palette.shades.g5}; 
`);
