import {
  html,
  LitElement,
  PropertyDeclaration,
  PropertyDeclarations,
  TemplateResult,
} from "lit";
import { customElement } from "lit/decorators.js";
import { ClassInfo, classMap } from "lit/directives/class-map.js";

import styling from "@al-ui/components/button/al-button.scss";

export type AlButtonTheme = "primary" | "danger";

export interface AlButtonPropsDeclaration extends PropertyDeclarations {
  theme: PropertyDeclaration;
}

// customElement decorator defines and register the custom element:
// https://lit.dev/docs/api/decorators/#customElement
@customElement("al-button")
export class AlButton extends LitElement {
  /** Button theme, default to "primary" */
  theme!: AlButtonTheme;

  constructor() {
    super();

    this.theme = "primary";
  }

  // some basic button styling to get started.
  static get styles() {
    return [styling];
  }

  static get properties(): AlButtonPropsDeclaration {
    return {
      theme: { type: String },
    };
  }

  /**
   * List of CSS classes to apply to a single elements thanks the built-in
   * `classMap` directive
   *
   * @see classMap https://lit.dev/docs/templates/directives/#classmap
   */
  get cssClasses(): ClassInfo {
    return { "al-button": true, [this.theme]: true };
  }

  render(): TemplateResult {
    return html`<button class=${classMap(this.cssClasses)}>
      <slot></slot>
    </button>`;
  }
}
