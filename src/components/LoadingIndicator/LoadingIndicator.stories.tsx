import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LoadingIndicator } from "./";

export default {
  title: "LoadingIndicator",
  component: LoadingIndicator,
} as ComponentMeta<typeof LoadingIndicator>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof LoadingIndicator> = (args) => (
  <LoadingIndicator {...args} />
);

export const Default = Template.bind({});
Default.args = {};
