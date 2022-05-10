import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

import "@al-ui/components/app/al-app-base";
import { MenuDrawerPosition, Props } from "@al-ui/components/app/al-app-base";

export default {
  title: `Al-UI/app/AlAppBase`,
  argTypes: {
    menuDrawerPosition: {
      options: [
        MenuDrawerPosition.Expanded,
        MenuDrawerPosition.Collapsed,
        MenuDrawerPosition.Hidden,
      ],
      control: {
        type: "select",
      },
    },
  },
} as Meta<Props>;

const storyBlockStyle = (bgColor: string): string => {
  const size = "width: 100%; height: 100%;";
  const flex = "display: flex; align-items: center; justify-content: center;";
  return `${size} ${flex} background-color: ${bgColor}`;
};

const Template: Story<Props> = ({ menuDrawerPosition }) => html`<al-app-base
  menu-drawer-position=${menuDrawerPosition}
>
  <div slot="nav" style="${storyBlockStyle("burlywood")}">Simple Nav</div>
  <div slot="header" style="${storyBlockStyle("cadetblue")}">Simple Header</div>
  <div slot="header" style="${storyBlockStyle("cadetblue")}">Simple Header</div>
  <div slot="footer" style="${storyBlockStyle("peachpuff")}">Simple Footer</div>

  <div style="${storyBlockStyle("khaki")}">
    Simple content: ${menuDrawerPosition}
  </div>
</al-app-base>`;

export const Expanded = Template.bind({});
Expanded.args = {
  menuDrawerPosition: MenuDrawerPosition.Expanded,
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  menuDrawerPosition: MenuDrawerPosition.Collapsed,
};

export const Hidden = Template.bind({});
Hidden.args = {
  menuDrawerPosition: MenuDrawerPosition.Hidden,
};

export const NoFooter: Story<Props> = ({
  menuDrawerPosition,
}) => html`<al-app-base menu-drawer-position=${menuDrawerPosition}>
  <div slot="nav" style="${storyBlockStyle("burlywood")}">Simple Nav</div>
  <div slot="header" style="${storyBlockStyle("cadetblue")}">Simple Header</div>
  <div style="${storyBlockStyle("khaki")}">Simple content</div>
</al-app-base>`;
export const NoHeader: Story<Props> = ({
  menuDrawerPosition,
}) => html`<al-app-base menu-drawer-position=${menuDrawerPosition}>
  <div slot="nav" style="${storyBlockStyle("burlywood")}">Simple Nav</div>
  <div slot="footer" style="${storyBlockStyle("peachpuff")}">Simple Footer</div>
  <div style="${storyBlockStyle("khaki")}">Simple content</div>
</al-app-base>`;
