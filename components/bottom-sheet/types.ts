import BottomSheet from "@gorhom/bottom-sheet";
import type { ComponentProps, ReactNode } from "react";

export interface BottomSheetRef<T = any> {
  expand: (props?: T) => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

export interface BaseBottomSheetProps<T = any> {
  name: string;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  scrollable?: boolean;
  keyboardBehavior?: RootBottomSheetProps["keyboardBehavior"];
  androidKeyboardInputMode?: RootBottomSheetProps["android_keyboardInputMode"];
  style?: any;
  children?: ReactNode | ((props: T | null) => ReactNode);
  footer?: ReactNode;
  onPropsChange?: (props: T | null) => void;
}

type RootBottomSheetProps = ComponentProps<typeof BottomSheet>;