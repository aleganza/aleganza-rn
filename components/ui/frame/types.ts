import { LucideIcon } from "lucide-react-native";
import {
  ColorValue,
  KeyboardAvoidingViewProps,
  ScrollViewProps,
  ViewProps,
  ViewStyle,
} from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export type HeaderIcon = {
  icon: LucideIcon;
  onPress?: () => void;
  accent?: ColorValue;
};

export interface HeaderProps {
  /**
   * text for collapsible header
   * leave blank for a header without text
   */
  headerText?: string;
  leftIcons?: HeaderIcon[];
  rightIcons?: HeaderIcon[];
  headerProps?: ViewProps;
  headerContentProps?: ViewProps;
  headerCustomContent?: React.ReactNode;
}

export interface FrameProps extends HeaderProps {
  children: React.ReactNode;

  /**
   * pass true if used inside a tab screen
   * to toggle tab-only frame features
   *
   * defaults to false
   */
  isTab?: boolean;

  /**
   * pass true if used inside a fullscreen modal
   * to toggle fullscreen modal-only frame features
   *
   * defaults to false
   */
  isFullScreenModal?: boolean;

  /**
   * pass true if used inside a nested screen
   * to toggle screen-only frame features
   *
   * defaults to false
   */
  isSubScreen?: boolean;

  isMap?: boolean;

  /**
   * adjust content depending safe area and stuff
   * TODO: to be improved
   *
   * defaults to true
   */
  wrapContent?: boolean;

  /**
   * show a collapsible header
   * defaults to false
   */
  showHeader?: boolean;

  heading?: string;

  /**
   * enable an horizontal spacing
   *
   * default to false
   */
  tight?: boolean;

  // scroll behavior
  scrollable?: boolean;
  scrollViewProps?: Omit<ScrollViewProps, "children">;

  // safe area
  useSafeArea?: boolean;
  safeAreaProps?: Omit<SafeAreaViewProps, "children" | "style">;

  // keyboard avoiding
  keyboardAvoiding?: boolean;
  keyboardAvoidingProps?: Omit<KeyboardAvoidingViewProps, "children" | "style">;

  // parallax image
  parallaxImageUrl?: string;
  parallaxImageAspectRatio?: number;

  onHeaderHeightChange?: (height: number) => void;
  onHeaderFullHeightChange?: (height: number) => void;

  bottomAction?: React.ReactNode;

  // style
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}
