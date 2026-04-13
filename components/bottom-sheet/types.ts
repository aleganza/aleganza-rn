import { ReactNode } from 'react';

export interface BottomSheetRef<T = any> {
  expand: (props?: T) => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

export interface BaseBottomSheetProps<T = any> {
  name: string;
  snapPoints?: string[];
  enablePanDownToClose?: boolean;
  scrollable?: boolean,
  style?: any;
  children?: ReactNode | ((props: T | null) => ReactNode);
  onPropsChange?: (props: T | null) => void;
}