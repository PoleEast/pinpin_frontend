import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faBars,
  faBell,
  faEye,
  faEyeSlash,
  faGhost,
  faIdBadge,
  faIdCardClip,
  faKey,
  faMugHot,
  faPersonWalkingLuggage,
  faRightToBracket,
  faSquareCheck,
  faUser,
  faEnvelope,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as _FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faGithub,
  faBars,
  faRightToBracket,
  faPersonWalkingLuggage,
  faEye,
  faEyeSlash,
  faSquareCheck,
  faIdCardClip,
  faKey,
  faGhost,
  faMugHot,
  faBell,
  faIdBadge,
  faUser,
  faEnvelope,
  faWrench,
);

export type FontAwesomeIcon = typeof _FontAwesomeIcon;
export default _FontAwesomeIcon;
