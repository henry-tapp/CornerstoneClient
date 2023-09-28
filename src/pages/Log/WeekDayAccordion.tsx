
import { Button, Typography, styled } from "@mui/material";

import { ITheme } from "common/App";
import { ItemCard } from "./ItemCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { Item, WeekDay } from "types";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { LinkPersistQuery } from "components/LinkPersistQuery";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";
import { ItemCardSmall } from "./ItemCardSmall";

const WeekDayItemContainer = styled("div")`
    width: calc(100% - 1rem);
    margin: auto;
    max-width: 30rem;
    padding: 0.5rem;
`;

const ItemCardWrapper = styled("div")`
    padding: 0.5rem;
    display: grid;
    gap: 1rem;
`;

const Accordion = styled(MuiAccordion)(({ theme }) => `
    box-shadow: none;
    & .MuiAccordionSummary-root {
        min-height:4.5rem;
    }

    & .MuiAccordionSummary-root.Mui-expanded {
        min-height:2.5rem;
        padding-top:0.5rem;
    }
    
    & .MuiAccordionSummary-content{
        min-height:1rem;
        margin: 0;

    }

    & .MuiCollapse-wrapper {
        padding: 0;
    }
`);

const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => `
    background: transparent;
    border: none;
    margin: 0;
    
`);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => `
    background: transparent;
    border: none;
    padding: 0;
`);


const NavBarLinkPersistQuery = styled(LinkPersistQuery)(
    ({ theme }) => `
    float:right;
    padding: 1rem;

  button {
    min-width: 2.5rem;
    height: 2.5rem;
    border-radius: 4rem;
    background-color: ${(theme as ITheme).palette.shades.g4};
    color:  ${(theme as ITheme).palette.shades.g1};
  }
`
);


export interface WeekDayAccordionProps {
    day: WeekDay;
    items?: Item[];
}

export function WeekDayAccordion({ items, day }: WeekDayAccordionProps) {

    const [Condensed] = useLocalStorage("Condensed", true);

    return (
        <WeekDayItemContainer className="weekday-item-container">
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h4" style={{ fontWeight: "bold" }}> {day}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <>
                        <ItemCardWrapper>
                            {items && items.map((item, idx2) => {
                                return (Condensed ? <ItemCardSmall key={idx2} {...item} /> : <ItemCard key={idx2} {...item} />);
                            })}
                        </ItemCardWrapper>
                        <NavBarLinkPersistQuery pathname="../manage" activeOnEmpty>
                            <Button fullWidth><AddCircleIcon fontSize="small" /><span>Add</span></Button>
                        </NavBarLinkPersistQuery>
                    </>
                </AccordionDetails>
            </Accordion>
        </WeekDayItemContainer>
    );
}

export default WeekDayAccordion;