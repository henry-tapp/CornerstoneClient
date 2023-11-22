import InfoIcon from '@mui/icons-material/Info';
import { IconButton, Typography, styled } from "@mui/material";
import { ITheme } from "common/App";

const Container = styled("div")`
    background-color: inherit;
    color: inherit;
    width: 100%;
    display:flex;
    flex-wrap: wrap;
    height:4rem;
    position:relative;
`


const Name = styled(Typography)(({ theme }) => `
    color: ${(theme as ITheme).palette.shades.g5};
    display: flex;
    justify-content: center;
    align-items: center;
`);

const AbsolutePositionWrapper = styled("div")(({ theme }) => `
    position: absolute;
    top: 0;
    right: 0;
`);

interface ItemCardSmallProps {
    id: string;
    name: string;
    description?: string | undefined;
    handleOpenInfo?: (id: string) => void;
}

export function ItemCardSmall({ id, name, description, handleOpenInfo }: ItemCardSmallProps) {

    return (<>
        <Container>
            <Name variant="subtitle2" style={{ fontWeight: "bold" }}>{name}</Name>
            {description &&
                <Typography variant="body2">
                    {description.length > 40 ? description.slice(0, 40).concat("...") : description}
                </Typography>}
            {handleOpenInfo && <AbsolutePositionWrapper>
                {/* @ts-ignore */}
                <IconButton size='small' color='tertiary' onClick={() => handleOpenInfo(id, true)}><InfoIcon fontSize='small' /></IconButton>
            </AbsolutePositionWrapper>}
        </Container>
    </>
    );
}