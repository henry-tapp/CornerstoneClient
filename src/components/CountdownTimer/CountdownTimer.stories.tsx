import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CountdownTimer } from "./";

export default {
  title: "CountdownTimer",
  component: CountdownTimer,
  parameters: {
    docs: {
      description: {
        component:
          "We can't easily demonstrate the modal dialog here as it would overlay the whole screen. There may be a nice way to demonstrate components like this but I'll need to have a look to figure it out. If nothing else at-least the component attributes etc are shown here for reference.",
      },
    },
  },
} as ComponentMeta<typeof CountdownTimer>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof CountdownTimer> = (args) => (
  <CountdownTimer {...args} />
);

export const Default = Template.bind({});

const expiryDate = new Date();
expiryDate.setMinutes(expiryDate.getMinutes() + 25);

Default.args = {
  expiryTimestamp: expiryDate,
  onExpire: () => console.log("expired"),
};
