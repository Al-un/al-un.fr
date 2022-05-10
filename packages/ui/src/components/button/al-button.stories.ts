import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

import "@al-ui/components/button/al-button";
import { AlButtonTheme } from "@al-ui/components/button/al-button";

interface AlButtonStoryAttrs {
  content: string;
  theme: AlButtonTheme;
  onClick: () => void;
}

export default {
  title: `Al-UI/button/AlButton`,
  argTypes: {
    content: { control: "text" },
    theme: { control: "select", options: ["primary", "danger"] },
    onClick: { action: "onClick" },
  },
  args: { content: "The Al button!", theme: "primary" },
} as Meta;

const Template: Story<AlButtonStoryAttrs> = ({ content, theme, onClick }) =>
  html`<al-button .theme=${theme} @click=${onClick}>${content}</al-button>`;

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  theme: "danger",
};
