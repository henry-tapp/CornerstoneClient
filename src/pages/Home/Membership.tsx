
import { Fade, Slide } from "react-awesome-reveal";
import { Button, Typography, styled } from "@mui/material";
import image from '../../images/gen/real-bw-boulderer-2.jpeg';
import { ITheme } from "common/App";
import { Card } from "./Card";
import { List } from "./List";
import { MEMBERSHIP } from ".";

const Wrapper = styled("div")(({ theme }) => `
    padding:1rem;
    min-height:100vh;
    color: ${(theme as ITheme).palette.shades.g4};
`);
export const MembershipPlans = {
    secondText: "Membership Plans",
    cards: [
        {
            amount: 8,
            duration: "day",
            caption: "One Day Training",
            benefits: ["One time access to all clubs", "Group trainer", "Book a Group class", "Fitness orientation"]
        },
        {
            amount: 49,
            duration: "month",
            caption: "12 Months Membership",
            benefits: ["Group classes", "Discuss fitness goals", "Group trainer", "Fitness orientation"]
        },
        {
            amount: 65,
            duration: "month",
            caption: "Pay Every Month",
            benefits: ["Group classes", "Discuss fitness goals", "Group trainer", "Fitness orientation"]
        }
    ]
}


const Membership = () => {
    return (
        <Wrapper id={`section-${MEMBERSHIP}`}>
            <div >
                <Typography variant="h1" className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">{MembershipPlans.secondText}</Typography>
                <Typography variant="h1" className="absolute text-zinc-500/20 md:left-24 lg:left-28 left-20 lg:text-9xl md:text-7xl text-6xl font-extrabold lg:-top-32 md:-top-20 -top-16 -z-10">03</Typography>
            </div>
            <main>
                {
                    MembershipPlans.cards.map((card, index) => (
                        <Card className={`w-full flex flex-col items-center gap-4 border border-zinc-500  transition-all duration-200 cursor-pointer hover:border-red-500/50 ${index === 1 ? "lg:py-16 py-10" : "py-10"}`} key={index}>
                            <Typography variant="h2" className="text-zinc-100 flex items-end gap-0.5">
                                <span className="font-extrabold text-2xl">$</span>
                                <span className={`font-extrabold ${card.amount === 49 ? "text-6xl" : "text-5xl"}`}>{card.amount}</span>
                                <span className="font-medium text-lg">/{card.duration}</span>
                            </Typography>
                            <Typography variant="h3" className={`capitalize text-base font-semibold w-full py-2 text-center  text-zinc-100 my-3 ${card.caption.includes('12') ? "bg-gradient-to-r to-amber-500 from-red-500" : "bg-zinc-800"}`}>{card.caption}</Typography>

                            <ul className="flex flex-col items-center">
                                {
                                    card.benefits.map((benefit, index) => (
                                        <List className="text-zinc-300 py-3 text-base capitalize relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-zinc-700 last:before:w-0" key={index}>{benefit}</List>
                                    ))
                                }
                            </ul>
                        </Card>
                    ))
                }

            </main>
        </Wrapper>
    )
}

export default Membership