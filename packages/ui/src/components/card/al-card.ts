import { html, LitElement, PropertyDeclarations, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

import styling from "./al-card.scss";

export interface Props {
  padded?: boolean;
}

@customElement("al-card")
export class AlCard extends LitElement {
  // @property({ type: Boolean })
  // padded = false;
  padded!: boolean;

  static get styles() {
    return [styling];
  }

  static get properties(): PropertyDeclarations {
    return { padded: { type: Boolean } };
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }
}
