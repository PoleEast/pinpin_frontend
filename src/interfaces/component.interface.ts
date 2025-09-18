import type { Component, FunctionalComponent } from "vue";

interface DialogComponent {
  component: Component;
  icon: FunctionalComponent;
  color?: string;
  props?: Record<string, unknown>;
}

export type { DialogComponent };
