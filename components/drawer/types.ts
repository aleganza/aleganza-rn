import ActionSheet from "react-native-actions-sheet";

export type ActionSheetProps = React.ComponentProps<typeof ActionSheet>;

export interface DrawerHeaderProps {
  drawerId: string;
  heading?: React.ReactNode;
  showCloseButton?: boolean;
}

export interface BaseDrawerProps extends ActionSheetProps {
  children: React.ReactNode;
  heading?: React.ReactNode;
  showCloseButton?: boolean;
  blur?: boolean;
}

export interface EventPreviewDrawerProps extends BaseDrawerProps {}
