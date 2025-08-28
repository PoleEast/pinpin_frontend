/**
 * FontAwesome 圖示工廠函數集合
 * 提供統一的圖示創建介面，支援預定義圖示、三角形、星星、數字和單選框圖示
 */
import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";
import { h, type FunctionalComponent } from "vue";

interface IconFactoryOptions {
  size?: FontAwesomeIconProps["size"];
  className?: string;
}

const PREDEFINED_ICONS = {
  close: "xmark",
  threePoints: "ellipsis-vertical",
  cloud: "cloud",
  locationDot: "location-dot",
} as const;

const TRIANGLE_DIRECTIONS = {
  left: "caret-left",
  right: "caret-right",
  up: "caret-up",
  down: "caret-down",
} as const;

const STAR_MODES = {
  filled: "star",
  empty: ["far", "star"],
  half: "star-half",
} as const;

const CHECKBOX_MODE = {
  false: ["far", "circle"],
  true: "circle-dot",
} as const;

const RADIO_MODE = {
  false: ["far", "square"],
  true: "square-check",
} as const;

type NumberMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type TriangleDirection = keyof typeof TRIANGLE_DIRECTIONS;
type StarMode = keyof typeof STAR_MODES;
type RadioMode = keyof typeof RADIO_MODE;
type PredefinedIconName = keyof typeof PREDEFINED_ICONS;

/**
 * 創建 FontAwesome 圖示的工廠函數
 */
const create = (
  icon: string | readonly [string, string],
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return () =>
    h(FontAwesomeIcon, {
      icon,
      size: options.size,
      class: options.className,
    });
};

const createPredefinedIcon = (
  iconName: PredefinedIconName,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(PREDEFINED_ICONS[iconName], options);
};

const createTriangleIcon = (
  direction: TriangleDirection,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(TRIANGLE_DIRECTIONS[direction], options);
};

const createStarIcon = (mode: StarMode, options: IconFactoryOptions = {}): FunctionalComponent => {
  return create(STAR_MODES[mode], options);
};

const createNumberIcon = (
  num: NumberMode,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(num.toString(), options);
};

const createCheckboxIcon = (
  mode: RadioMode,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(CHECKBOX_MODE[mode], options);
};

const createRadioIcon = (
  mode: RadioMode,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(RADIO_MODE[mode], options);
};

const createCustomIcon = (
  iconStr: string,
  options: IconFactoryOptions = {},
): FunctionalComponent => {
  return create(iconStr, options);
};

export {
  createStarIcon,
  createTriangleIcon,
  createNumberIcon,
  createPredefinedIcon,
  createCheckboxIcon,
  createCustomIcon,
  createRadioIcon,
  type TriangleDirection,
  type StarMode,
  type IconFactoryOptions,
  type NumberMode,
};
