import { styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionProps {

    i: number;
    expanded: boolean | number;
    setExpanded: (expanded: boolean | number) => void;
    smallChild: JSX.Element;
    bigChild: JSX.Element;
}

const MotionHeader = styled(motion.header)(({ theme }) => `
    
    border-radius: 10px;
    color: white;
    cursor: pointer;
    margin-bottom: 20px;    
`);

const MotionSection = styled(motion.section)(({ theme }) => `
    padding-bottom: 0.5rem;
`);

export function FlashCardWrapper({ i, expanded, setExpanded, smallChild, bigChild }: AccordionProps) {

    const anyOpen = expanded !== -1;

    return (
        <>
            {!anyOpen && <MotionHeader
                initial={false}
                onClick={() => setExpanded(i)}
            >
                {smallChild}
            </MotionHeader>}
            <AnimatePresence initial={false}>
                {anyOpen && (
                    <MotionSection
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "calc(100vh)" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                        onClick={() => setExpanded(-1)}
                    >
                        {bigChild}
                    </MotionSection>
                )}
            </AnimatePresence>
        </>
    );
};
