import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

// Path alias is not useful here but ensures that aliases work in Storybook
import "@al-ui/button/super-button";
import { SuperButtonTheme } from "@al-ui/button/super-button";

interface SuperButtonStoryAttrs {
  content: string;
  theme: SuperButtonTheme;
  onClick: () => void;
}

export default {
  title: `WCL/components/SuperButton`,
  argTypes: {
    content: { control: "text" },
    theme: { control: "select", options: ["primary", "danger"] },
    onClick: { action: "onClick" },
  },
  args: { content: "My super button!", theme: "primary" },
} as Meta;

const Template: Story<SuperButtonStoryAttrs> = ({
  content,
  theme,
  onClick,
}) => html`<super-button .theme=${theme} @click=${onClick}
  >${content}</super-button
>`;

export const Primary = Template.bind({});
Primary.args = {
  theme: "primary",
};

export const Danger = Template.bind({});
Danger.args = {
  theme: "danger",
};
