import { css, html, LitElement, TemplateResult, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";

import styling from "./al-app-base.scss";

@customElement("al-app-base")
export class AlAppBase extends LitElement {
  drawer = "hidden";

  static get styles() {
    return [styling];
  }

  static get properties() {
    return {
      drawer: { type: String },
    };
  }

  render(): TemplateResult {
    return html`
      <nav class="app-nav-drawer">
        <slot name="nav"></slot>
      </nav>

      <header class="app-header">
        <slot name="header"></slot>
      </header>

      <main class="app-content">
        <slot></slot>
      </main>

      <footer class="app-footer">
        <slot name="footer"></slot>
      </footer>
    `;
  }
}
