import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResponsiveRootLayout } from "./";

export default {
  title: "ResponsiveRootLayout",
  component: ResponsiveRootLayout,
} as ComponentMeta<typeof ResponsiveRootLayout>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ResponsiveRootLayout> = (args) => (
  <ResponsiveRootLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Hello World",
  // width: 200,
  // height: 400,
};
