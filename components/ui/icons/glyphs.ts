import Alert from "@mingcute/react-native/core-regular/alert";
import ArrowLeft from "@mingcute/react-native/core-regular/arrow-left";
import ArrowRight from "@mingcute/react-native/core-regular/arrow-right";
import Camera from "@mingcute/react-native/core-regular/camera";
import Check from "@mingcute/react-native/core-regular/check";
import CheckCircle from "@mingcute/react-native/core-regular/check-circle";
import Close from "@mingcute/react-native/core-regular/close";
import Copy from "@mingcute/react-native/core-regular/copy";
import Delete2 from "@mingcute/react-native/core-regular/delete-2";
import Download from "@mingcute/react-native/core-regular/download";
import Edit2 from "@mingcute/react-native/core-regular/edit-2";
import ExternalLink from "@mingcute/react-native/core-regular/external-link";
import Eye from "@mingcute/react-native/core-regular/eye";
import Filter from "@mingcute/react-native/core-regular/filter";
import Heart from "@mingcute/react-native/core-regular/heart";
import House4 from "@mingcute/react-native/core-regular/home-4";
import Information from "@mingcute/react-native/core-regular/information";
import Layers from "@mingcute/react-native/core-regular/layers";
import LayoutGrid from "@mingcute/react-native/core-regular/layout-grid";
import Link from "@mingcute/react-native/core-regular/link";
import Mail from "@mingcute/react-native/core-regular/mail";
import MapPin from "@mingcute/react-native/core-regular/map-pin";
import Menu from "@mingcute/react-native/core-regular/menu";
import Minimize from "@mingcute/react-native/core-regular/minimize";
import More1 from "@mingcute/react-native/core-regular/more-1";
import Moon from "@mingcute/react-native/core-regular/moon";
import Notification from "@mingcute/react-native/core-regular/notification";
import Phone from "@mingcute/react-native/core-regular/phone";
import Pic from "@mingcute/react-native/core-regular/pic";
import Plus from "@mingcute/react-native/core-regular/plus";
import Right from "@mingcute/react-native/core-regular/right";
import Search from "@mingcute/react-native/core-regular/search";
import Settings3 from "@mingcute/react-native/core-regular/settings-3";
import Share2 from "@mingcute/react-native/core-regular/share-2";
import Star from "@mingcute/react-native/core-regular/star";
import StarHalf from "@mingcute/react-native/core-regular/star-half";
import Sun from "@mingcute/react-native/core-regular/sun";
import Upload from "@mingcute/react-native/core-regular/upload";
import User3 from "@mingcute/react-native/core-regular/user-3";
import Warning from "@mingcute/react-native/core-regular/warning";
import CalendarMonth from "@mingcute/react-native/core-regular/calendar-month";

import CalendarMonthFilled from "@mingcute/react-native/core-filled/calendar-month";
import House4Filled from "@mingcute/react-native/core-filled/home-4";
import InformationFilled from "@mingcute/react-native/core-filled/information";
import LayoutGridFilled from "@mingcute/react-native/core-filled/layout-grid";
import StarFilled from "@mingcute/react-native/core-filled/star";
import StarHalfFilled from "@mingcute/react-native/core-filled/star-half";
import User3Filled from "@mingcute/react-native/core-filled/user-3";

export const ICONS = {
  alert: Alert,
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  camera: Camera,
  check: Check,
  "check-circle": CheckCircle,
  close: Close,
  copy: Copy,
  "delete-2": Delete2,
  download: Download,
  "edit-2": Edit2,
  "external-link": ExternalLink,
  eye: Eye,
  filter: Filter,
  heart: Heart,
  "home-4": House4,
  "home-4-filled": House4Filled,
  information: Information,
  "information-filled": InformationFilled,
  "layout-grid": LayoutGrid,
  "layout-grid-filled": LayoutGridFilled,
  layers: Layers,
  link: Link,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  minimize: Minimize,
  "more-1": More1,
  moon: Moon,
  notification: Notification,
  phone: Phone,
  pic: Pic,
  plus: Plus,
  right: Right,
  search: Search,
  "settings-3": Settings3,
  "share-2": Share2,
  star: Star,
  "star-filled": StarFilled,
  "star-half": StarHalf,
  "star-half-filled": StarHalfFilled,
  sun: Sun,
  upload: Upload,
  "user-3": User3,
  "user-3-filled": User3Filled,
  warning: Warning,
  "calendar-month": CalendarMonth,
  "calendar-month-filled": CalendarMonthFilled,
} as const;

export type IconName = keyof typeof ICONS;
