import { Button, Typography, styled } from "@mui/material";
import { ITheme } from "common/App";
import { Fade, Slide } from "react-awesome-reveal";
import { StepProps } from ".";
import image from '../../images/gen/real-bw-boulderer-3.jpeg';

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    text-align:center;
    min-height: 100vh;
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
    color: ${(theme as ITheme).palette.shades.g6};
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
    width: 10rem;
    position: relative;
    display:flex;
    flex-direction: column;
    gap:1rem;
`

const Step1 = (props: StepProps) => {

    return (
        <Fade duration={500}>
            <Wrapper>
                <Title className="title">
                    <Typography variant="h1">
                        Cornerstone
                    </Typography>
                </Title>
                <ImageContainer>
                    <StyledImg src={image} alt="" />
                </ImageContainer>
                <TextContainer>
                    <Slide direction="up">
                        <Container>
                            <StyledButton type="button" onClick={() => props.handleStepMove(2, "")}>
                                <Typography variant="subtitle1" >Begin</Typography>
                            </StyledButton>
                        </Container>
                    </Slide>
                </TextContainer>
            </Wrapper>
        </Fade>
    )
}

export default Step1