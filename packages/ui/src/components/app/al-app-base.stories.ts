import { html } from "lit";
import { Meta, Story } from "@storybook/web-components";

import "@al-ui/components/app/al-app-base";

const content = `
<template #nav>Simple Nav</template>
<template #header>Simple header</template>

Main content
`;

export default {
  title: `Al-UI/app/AlAppBase`,
  argTypes: {},
  args: {},
} as Meta;

const Template: Story = () => html`<al-app-base class="hidden">
  <div slot="nav">Simple Nav</div>
  <div slot="header">Simple header</div>

  Main content
</al-app-base>`;

export const Default = Template.bind({});
