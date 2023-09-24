import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ConfirmationDialog } from "./";

export default {
  title: "ConfirmationDialog",
  component: ConfirmationDialog,
  parameters: {
    docs: {
      description: {
        component:
          "We can't easily demonstrate the modal dialog here as it would overlay the whole screen. There may be a nice way to demonstrate components like this but I'll need to have a look to figure it out. If nothing else at-least the component attributes etc are shown here for reference.",
      },
    },
  },
} as ComponentMeta<typeof ConfirmationDialog>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ConfirmationDialog> = (args) => (
  <ConfirmationDialog {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: "This is an example Confirmation Dialog.",
};
