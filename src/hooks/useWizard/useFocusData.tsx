import { PlanType } from "types";

export const useFocusData = () => {

    return [{
        title: "Bouldering",
        planType: PlanType.Bouldering,
        description: [`THe bouldering plan is your key to unlocking strength and power for bouldering success`,
            `Elevate your climbing game with workouts that target explosive power, enabling you to tackle challenging boulder problems`,
            `Develop a rock-solid core and finger strength, providing the foundation for critical bouldering moves`]
    },
    {
        title: "Sport Climbing",
        planType: PlanType.SportClimbing,
        description: [`The sport climbing training plan is designed to take you from strength and power development to route climbing- specific endurance`,
            `Develop strength and power, providing confidence for challenging routes`,
            `Build the stamina required for longer routes, ensuring you can tackle sustained climbs`,
            `Train your body to handle pump and recover efficiently during difficult climbs`]
    }];
};

export const boulderingMarketing = () => {

    return [
        `Unleash Your Inner Bouldering Beast: Our training plan is your key to unlocking extraordinary strength and power for bouldering success.`,
        `Expertly Crafted Workouts: Designed by bouldering pros and fitness experts, this plan hones in on the specific exercises and techniques you need for optimal strength and power gains.`,
        `Explosive Strength: Elevate your climbing game with workouts that target explosive power, enabling you to tackle even the most challenging boulder problems.`,
        `Dynamic Moves: Master dynamic moves, dynos, and complex holds with precision and confidence.`,
        `Core and Finger Strength: Develop a rock - solid core and finger strength, providing the foundation for those critical bouldering maneuvers.`,
        `Individualized Progression: Tailored workouts that adapt to your current fitness level and goals, ensuring continuous progress and preventing plateaus.`,
        `Campus Board Training: A comprehensive program for improving finger strength and contact strength, essential for tackling steep overhangs and tough bouldering problems.
    `];
}

export const routeClimbingMarketing = () => {

    return [
        `Transform Your Climbing Game: Our 12 - week sport climbing training plan is strategically designed to take you from strength and power development to route climbing - specific endurance, ensuring you become a well - rounded climber.`,
        `Initial Power Boost: The first 6 weeks of the program are dedicated to building explosive strength and power, enabling you to tackle challenging routes with confidence.`,
        `Endurance Emphasis: Transition into the final 6 weeks, where the plan shifts its focus to route climbing - specific endurance training.`,
        `Sustained Stamina: Build the stamina required for longer routes, ensuring you can tackle sustained climbs with ease.`,
        `Pump Management: Train your body to handle the notorious "pump" and recover efficiently during difficult climbs.`,
        `Peak Performance: Maximize your climbing potential and excel in both short, powerful routes and long endurance routes.`,
        `Track Your Progress: Monitor your development throughout the program, witnessing your transformation from a powerful climber into an enduring, well - rounded athlete.`
    ]
}

export const useRepeaterInformation = () => {

    return {
        title: "How to measure your max 60% repeater.",
        description: `First calculate 60% of your max hang score. 
        
For example, a climber that has a max hang of 92kg (70kg bodyweight + 22kg extra load), 60% would be 92 * 0.6 = 55kg.

You will need a hangboard with a pulley system. Attach the 60% measurement above, this would be 55kg in the example.

Then using the 7/3 hangboard repeater protocol, hang for 7 seconds then rest for 3 seconds. 

Repeat until failure. 

Measure the total number of repeats. Multiplied by 10 is the total number of seconds. Record this as the measurement.
`
    };
}

export const useMaxHangInformation = () => {

    return {
        title: "How to measure your max 7s hang (20mm edge).",
        description: `First complete a hangboard warm up, ensuring your heart rate has risen above baseline and include some shoulder engagement exercises. 

Start by hanging on a 20mm edge with your feet taking most of the weight, for 10 seconds. 

After 3 minutes of rest hang from 20mm for 10 seconds.

After 3 minutes of rest between each set, increase attached weight by 2-5kg until a max hang score is achieved. 

Stop immediately if you experience any discomfort.

Your score is the total weight + bodyweight. E.g. a climber who weighs 70kg and can hang with an added 22kg scores 92kg.
`
    };
}

export const useHipFlexibilityInformation = () => {

    return {
        title: "Side Split Measurement",
        description: `Standing up, walk your feet as wide as possible. 
Measure the distance between your heels at the widest point.
`
    };
}

export const useSubmitInformation = (planType: string) => {

    return {
        title: `Creating your ${planType} plan!`,
        description: `We just need to know a few dates..`
    };
}