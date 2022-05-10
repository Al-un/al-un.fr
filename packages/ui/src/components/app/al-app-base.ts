import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import styling from "./al-app-base.scss";

export enum MenuDrawerPosition {
  Hidden = "hidden",
  Collapsed = "collapsed",
  Expanded = "expanded",
}

export interface Props {
  menuDrawerPosition?: MenuDrawerPosition;
}

@customElement("al-app-base")
export class AlAppBase extends LitElement {
  // ---------- Attributes ----------------------------------------------------
  menuDrawerPosition: MenuDrawerPosition = MenuDrawerPosition.Expanded;

  // ---------- Computed ------------------------------------------------------
  static get styles() {
    return [styling];
  }

  static get properties() {
    return {
      menuDrawerPosition: { type: String },
    };
  }

  // ---------- Methods -------------------------------------------------------
  /**
   * @param slotName slot name to find
   * @returns true if the slot defined by the slotName param is not empty
   *
   * @see https://lit.dev/docs/components/shadow-dom/#accessing-slotted-children
   */
  private _hasSlot(slotName: string): boolean {
    const slotted = this.querySelectorAll(`[slot="${slotName}"]`);
    return slotted && slotted.length > 0;
  }

  // ---------- Render --------------------------------------------------------
  render(): TemplateResult {
    const menuDrawer = this._hasSlot("nav")
      ? html` <nav class="app-menu-drawer"><slot name="nav"></slot></nav>`
      : "";
    const header = this._hasSlot("header")
      ? html` <header class="app-header"><slot name="header"></slot></header>`
      : "";
    const footer = this._hasSlot("footer")
      ? html` <footer class="app-footer"><slot name="footer"></slot></footer>`
      : "";

    return html`
      ${menuDrawer}

      <div class="app-menu-drawer-backdrop"></div>

      <div class="app-wrapper">
        ${header}

        <main class="app-content">
          <slot></slot>
        </main>

        ${footer}
      </div>
    `;
  }
}
