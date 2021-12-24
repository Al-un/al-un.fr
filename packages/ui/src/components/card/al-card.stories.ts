import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

import { Props } from "./al-card";
import "./al-card";

export default {
  title: `Container/card/al-card`,
  argTypes: {
    padded: { control: "boolean" },
  },
  args: {
    padded: false,
  },
  parameters: {
    layout: "centered",
  },
} as Meta<Props>;

const Template: Story<Props> = ({ padded }) =>
  html`<al-card ?padded=${padded} style="color: var(--al-fg-text);"
    >Some content here</al-card
  >`;

export const Default = Template.bind({});

export const Padded = Template.bind({});
Padded.args = {
  padded: true,
};
