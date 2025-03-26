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

export { RadioFalseIcon, RadioTureIcon, CloseIcon };
