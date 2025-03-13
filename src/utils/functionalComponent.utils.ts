import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { h, type FunctionalComponent } from "vue";

const RadioFalseIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: ["far", "square"] });
};

const RadioTureIcon: FunctionalComponent = () => {
  return h(FontAwesomeIcon, { icon: "square-check" });
};

export { RadioFalseIcon, RadioTureIcon };
