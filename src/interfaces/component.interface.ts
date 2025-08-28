import type { Component, FunctionalComponent } from "vue";

interface DialogComponent<T = Record<string, unknown>> {
  component: Component;
  icon: FunctionalComponent;
  color?: string;
  props?: Record<string, T>;
}

export type { DialogComponent };
