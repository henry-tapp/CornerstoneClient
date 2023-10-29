import { Button, Typography, alpha, styled } from "@mui/material";
import { ITheme } from "common/App";
import { useFocusData } from "hooks/useWizard/useFocusData";
import { Fade } from "react-awesome-reveal";
import { StepProps } from ".";
import image from '../../images/gen/real-bw-boulderer-1-Clipped.jpeg';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { PlanType } from "types";

const Wrapper = styled("div")(({ theme }) => `
    position:relative;
    min-height: 100vh;
`);

const FlexBox = styled("div")`
    border-radius: 0 0 1rem 1rem;
    position:relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImg = styled("img")`
    height: 100vh;
`

const Title = styled("div")(({ theme }) => `
    padding-inline: 1.5rem 1.5rem;
    padding-top: 2.2rem;
    color: ${(theme as ITheme).palette.shades.g5};
    border-radius: 0.5rem;
`);


const AbsolutePositionWrapper = styled("div")(({ theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100vh;
`);

const ButtonListContainer = styled("div")`
    position: relative;
    display:flex;
    flex-direction: column;
    width: calc(100%- 5rem);
    gap: 2rem;
    margin: auto;
    width: calc(100% - 1rem);
    max-width: 40rem;
`

const Step2 = (props: StepProps) => {

    const quckStartFocusSteps = useFocusData();

    return (
        <Fade duration={1000}>
            <Wrapper>
                <FlexBox>
                    <StyledImg src={image} alt="" />
                    <AbsolutePositionWrapper>
                        <ButtonListContainer>
                            <Title>
                                <Typography variant="h5" >What is your training focus?</Typography>
                            </Title>
                            {quckStartFocusSteps && quckStartFocusSteps.map((x, idx) => {
                                return (<FocusCard key={idx} planType={x.planType} title={x.title} descriptions={x.description} handleClick={props.handleStepMove} />);
                            })}
                        </ButtonListContainer>
                    </AbsolutePositionWrapper>
                </FlexBox>
            </Wrapper>
        </Fade >
    )
}

export default Step2;


const CardContainer = styled("div")`
    position: relative;
    display:flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
    padding-top:2rem;
    padding-bottom:0.5rem;
`

const Content = styled("div")`
    padding-inline: 1rem 1rem;
    text-align:left;
    display: grid;
    grid-template-columns: 1fr 10fr;
`

const StyledButton = styled(Button)(({ theme }) => `
    border-radius: 0.5rem;
    background: ${alpha((theme as ITheme).palette.shades.g1, 0.9)};
    color: ${(theme as ITheme).palette.shades.g5};
    height: 100%;    
    margin-inline: 1rem 1rem;
    align-items: start;
`);

const CenterVertically = styled("div")(({ theme }) => `
    padding-top: 0.2rem;
`);


const HighlightBubble = styled("div")(
    ({ theme }) => `
        width: auto;
        height: 1.5rem;
        padding-left:1rem;
        padding-right:1rem;
        text-align: center;
        border-radius: 2rem;
        background: ${(theme as ITheme).palette.tertiary.main};
        color:  ${(theme as ITheme).palette.shades.g1};
        padding-top: 0.5rem;
        position:absolute;
        top: -1rem;
        left: 1rem;
`);

interface FocusCardProps {
    title: string;
    descriptions: string[];
    planType: PlanType;
    handleClick: (el: number, opt?: number) => void;
}


const FocusCard = ({ title, descriptions, planType, handleClick }: FocusCardProps) => {

    return (
        <StyledButton type="button" onClick={() => handleClick(3, planType)}>
            <CardContainer>
                <HighlightBubble>
                    <Typography variant="subtitle2" >{title}</Typography>
                </HighlightBubble>
                {descriptions.map((description, idx) => {
                    return (
                        <Content key={idx}>
                            {/* @ts-ignore */}
                            <CenterVertically><CheckBoxIcon color="tertiary" fontSize="small" /></CenterVertically>
                            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>{description}</Typography>
                        </Content>
                    )
                })}
            </CardContainer>
        </StyledButton >
    )
}