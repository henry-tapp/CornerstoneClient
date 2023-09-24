import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SiteError } from "./";

export default {
  title: "SiteError",
  component: SiteError,
} as ComponentMeta<typeof SiteError>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof SiteError> = (args) => (
  <SiteError {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "A custom error title.",
  message: "A custom message to go along with the error.",
};
