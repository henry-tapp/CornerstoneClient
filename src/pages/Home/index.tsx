import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "@mui/material/styles";
import { FullpageLoadingIndicator } from "components/LoadingIndicator";
import { useCallback, useEffect, useRef, useState } from "react";
import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";
import Membership from "./Membership";

export const HERO = 1;
export const ABOUT = 2;
export const MEMBERSHIP = 3;

const Wrapper = styled("div")(({ theme }) => `
    max-width: 30rem;
    margin:auto;
`);

const Home = () => {
    const {
        isLoading
    } = useAuth0();

    const [currentElementId, setCurrentElementId] = useState<number>(1);

    const [isScrolling, setIsScrolling] = useState<boolean>(false);

    const handleClickScroll = useCallback((elementId: number) => {

        const element = document.getElementById(`section-${elementId}`);
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth', inline: "start" });
            setCurrentElementId(elementId);
        }
    }, [setCurrentElementId]);

    // The scroll listener
    const handleScrollNext = useCallback(() => {
        if (!isScrolling) {
            setIsScrolling(true);

            handleClickScroll(currentElementId === 3 ? 1 : currentElementId + 1);
            setTimeout(() => setIsScrolling(false), 500);
        }
    }, [handleClickScroll, currentElementId, isScrolling])

    const ref = useRef<HTMLDivElement>(null);

    // Attach the scroll listener to the div
    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.addEventListener("click", handleScrollNext);
        }
    }, [handleScrollNext])


    if (isLoading) {
        return <FullpageLoadingIndicator />;
    }

    return (
        <Wrapper ref={ref}>
            <HeroSection handleClick={handleClickScroll} />
            <AboutSection />
            <Membership />
        </Wrapper>
    )
};

export default Home