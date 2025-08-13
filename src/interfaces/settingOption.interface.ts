interface SettingOption {
  title: string;
  component: unknown;
  icon: string;
  description: string;
  props: Record<string, unknown>;
  emits: Record<string, unknown>;
}

export type { SettingOption };
