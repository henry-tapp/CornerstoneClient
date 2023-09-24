import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PhoneNumberTextField } from "./";

export default {
  title: "PhoneNumberTextField",
  component: PhoneNumberTextField,
} as ComponentMeta<typeof PhoneNumberTextField>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof PhoneNumberTextField> = (args) => (
  <PhoneNumberTextField {...args} />
);

export const Default = Template.bind({});
Default.args = {};
