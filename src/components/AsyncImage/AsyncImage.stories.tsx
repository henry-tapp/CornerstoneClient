import testImage from "mocks/images/128_Megacoaster_thumb.jpg";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { AsyncImage } from "./";

export default {
  title: "AsyncImage",
  component: AsyncImage,
} as ComponentMeta<typeof AsyncImage>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof AsyncImage> = (args) => (
  <AsyncImage {...args} />
);

export const Default = Template.bind({});
Default.args = {
  src: [testImage],
  style: {
    height: "100px",
    width: "100px",
  },
};
