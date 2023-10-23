import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import { Fade, Slide } from "react-awesome-reveal";
import { HERO, MEMBERSHIP } from ".";
import image from "../../images/CornerstoneGifRepeat1.gif";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    text-align:center;
    max-height: 100vh;
`);

const ImageContainer = styled("div")`
    border-radius: 0 0 1rem 1rem;
    position:relative;
    max-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImg = styled("img")`
    min-height: 100vh;
`

const Title = styled("div")(({ theme }) => `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    color: ${(theme as ITheme).palette.tertiary.main};
`);

const TextContainer = styled("div")(({ theme }) => `
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
`);

const StyledButton = styled(Button)(({ theme }) => `
    background: ${(theme as ITheme).palette.shades.g2};
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 0.5rem;
`);

const Container = styled("div")`
    margin: auto;
    width: 6rem;
    position: relative;
    display:flex;
    flex-direction: column;
    gap:1rem;
`
interface HeroProps {
    handleClick: (elId: number) => void;
}

const HeroSection = (props: HeroProps) => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Wrapper id={`section-${HERO}`}>
            <Title className="title">
                <Fade delay={2250} >
                    <Typography variant="h1">
                        Cornerstone
                    </Typography>
                </Fade>
            </Title>
            <Fade duration={3000}>
                <ImageContainer>
                    <StyledImg src={image} alt="" />
                </ImageContainer>
            </Fade>
            <TextContainer>
                <Slide direction="up">
                    <Container>
                        <StyledButton type="button" onClick={() => props.handleClick(MEMBERSHIP)}>
                            <Typography variant="subtitle1" >Sign Up</Typography>
                        </StyledButton>
                        <StyledButton type="button" onClick={(e) => { e.preventDefault(); loginWithRedirect() }}>
                            <Typography variant="subtitle1">Log In</Typography>
                        </StyledButton>
                    </Container>
                </Slide>
            </TextContainer>
        </Wrapper >
    )
}

export default HeroSection