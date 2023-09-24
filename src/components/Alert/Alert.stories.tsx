import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Alert } from "./";

export default {
  title: "Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "This is an alert.",
};

export const Error = Template.bind({});
Error.args = {
  severity: "error",
  children: "An error occurred.",
};
