import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import TimerIcon from '@mui/icons-material/Timer';
import { ITheme } from "common/App";

import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import StockExerciseImage from '../../images/gen/synth-climber-3.jpeg';


import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
const BackIconWrapper = styled(IconButton)(
    ({ theme }) => `
  position: absolute;
  left: 1rem;
  top: 1rem;
  border-radius: 0.5rem;
  background-color: rgba(186, 186, 186, 0.75);
`
);

const PageWrapper = styled("div")(({ theme }) => `

    background-color: ${(theme as ITheme).palette.shades.g5};
    color: ${(theme as ITheme).palette.primary.dark};
    height: 100vh;
`);

const ImageArea = styled("img")(({ theme }) => `
    width: 100%;
    margin-bottom: -2rem;
`);

const ButtonBar = styled("div")(({ theme }) => `
    height: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: ${(theme as ITheme).palette.shades.g5};
    z-index:0;
    position:relative;
    border-radius: 2rem 2rem 0 0;
    transition: all 1s;
`);

const Description = styled("div")(({ theme }) => `
    padding:1rem;
`);

const IconButtonStyle = styled(IconButton)(({ theme }) => `
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    color: ${(theme as ITheme).palette.primary.dark};
`);

export interface ItemDetailProps {
    itemId: string;
    onBack?: () => void;
}


export function ItemDetails(props: ItemDetailProps) {

    const { onBack } = props;

    return (
        <PageWrapper>
            {onBack && (<BackIconWrapper onClick={onBack}><KeyboardBackspaceOutlinedIcon /></BackIconWrapper>)}
            <ImageArea src={StockExerciseImage} alt=""></ImageArea>
            <ButtonBar>
                <IconButtonStyle><TimerIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Start Workout</Typography></IconButtonStyle>
                <IconButtonStyle><ContentPasteIcon /><Typography style={{ fontWeight: "bold" }} variant="caption">Log Workout</Typography></IconButtonStyle>
            </ButtonBar>
            <Description>
                <Typography variant="h5">Description</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Typography>
            </Description>
        </PageWrapper>
    );
}

export default ItemDetails;
