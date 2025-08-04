import { FontAwesomeIcon, type FontAwesomeIconProps } from "@fortawesome/vue-fontawesome";
import { h, type FunctionalComponent } from "vue";

//TODO:更改成工廠模式

const RadioFalseIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: ["far", "square"] });
};

const RadioTrueIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "square-check" });
};

const CloseIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "xmark" });
};

const InvertedTriangleIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "caret-down" });
};

const LeftTriangleIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "caret-left" });
};

const RightTriangleIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "caret-right" });
};

const ThreePointsIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "ellipsis-vertical" });
};

const createTriangleIcon = (direction: "left" | "right" | "up" | "down"): FunctionalComponent => {
  return () =>
    h(FontAwesomeIcon, {
      icon:
        direction === "left"
          ? "caret-left"
          : direction === "right"
            ? "caret-right"
            : direction === "up"
              ? "caret-up"
              : "caret-down",
    });
};

const createStarIcon = (
  mode: "filled" | "empty" | "half",
  size: FontAwesomeIconProps["size"] = "1x",
): FunctionalComponent => {
  return () =>
    h(FontAwesomeIcon, {
      icon: mode === "filled" ? "star" : mode === "empty" ? ["far", "star"] : "star-half",
      size,
    });
};

const createNumberIcon = (
  num: number,
  size: FontAwesomeIconProps["size"] = "1x",
): FunctionalComponent => {
  return () =>
    h(FontAwesomeIcon, {
      icon: num.toString(),
      size,
    });
};

export {
  RadioFalseIcon,
  RadioTrueIcon,
  CloseIcon,
  InvertedTriangleIcon,
  LeftTriangleIcon,
  RightTriangleIcon,
  ThreePointsIcon,
  createStarIcon,
  createTriangleIcon,
  createNumberIcon,
};
