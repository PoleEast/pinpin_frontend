import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h, type FunctionalComponent } from "vue";

const RadioFalseIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: ["far", "square"] });
};

const RadioTureIcon: FunctionalComponent = () => {
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

export { RadioFalseIcon, RadioTureIcon, CloseIcon, InvertedTriangleIcon, LeftTriangleIcon, RightTriangleIcon };
