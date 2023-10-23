
import { Fade, Slide } from "react-awesome-reveal";
import { Typography, styled } from "@mui/material";
import image from '../../images/gen/real-bw-boulderer-2.jpeg';
import { ITheme } from "common/App";
import { ABOUT } from ".";

const Wrapper = styled("div")(({ theme }) => `
    padding:1rem;
    min-height:100vh;
    color: ${(theme as ITheme).palette.shades.g4};
`);

const AboutSection = () => {

    return (
        <Wrapper id={`section-${ABOUT}`}>
            <Typography variant="h5">
                <Slide direction="left">
                    A training companion app for rock climbers. Improve your strength, endurance and flexibility to help reach your climbing goals. Whether you're focused on a boulder project or a sport climbing send, Cornerstone will help to solidify your training habits with weekly workout schedules built from a 12 week plan.
                </Slide>
            </Typography>
            <Fade>
                <img src={image} alt="" width={"100%"} />
            </Fade>
        </Wrapper>
    )
}

export default AboutSection