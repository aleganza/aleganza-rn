import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SheetManager } from "./manager";
import { BaseBottomSheetProps, BottomSheetRef } from "./types";
import { updateSheetProps } from "./useSheetProps";
import { SHEET_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";

export const BaseBottomSheet = <T = any,>(
  {
    name,
    snapPoints = ["50%"],
    enablePanDownToClose = true,
    scrollable = false,
    keyboardBehavior,
    androidKeyboardInputMode,
    style,
    children,
    footer,
    onPropsChange,
  }: BaseBottomSheetProps<T>,
  ref?: React.Ref<BottomSheetRef<T>>,
) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const hasFooter = Boolean(footer);
  const contentBottomPadding = hasFooter
    ? theme.spacing.md
    : insets.bottom + theme.spacing.lg;

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    stiffness: 500,
    mass: 0.3,
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetProps, setSheetProps] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    updateSheetProps(name, sheetProps);
  }, [name, sheetProps]);

  const internalRef = useRef<BottomSheetRef<T>>({
    expand: (props?: T) => {
      const newProps = props || null;
      setSheetProps(newProps);
      bottomSheetRef.current?.snapToIndex(0);
    },
    close: () => {
      bottomSheetRef.current?.close();
      setSheetProps(null);
    },
    snapToIndex: (index: number) => {
      bottomSheetRef.current?.snapToIndex(index);
    },
  });

  useImperativeHandle(ref, () => internalRef.current);

  useEffect(() => {
    SheetManager.register(name, internalRef as any);
    return () => SheetManager.unregister(name);
  }, [name]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      setIsOpen(index >= 0);

      if (index === -1) {
        setSheetProps(null);
      }
    },
    [name],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <View
        pointerEvents={isOpen ? "auto" : "none"}
        style={StyleSheet.absoluteFill}
      >
        <BottomSheetBackdrop
          {...props}
          enableTouchThrough
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.7}
        />
      </View>
    ),
    [isOpen],
  );

  const content =
    typeof children === "function" ? children(sheetProps) : children;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={renderBackdrop}
      enableDynamicSizing={false}
      animationConfigs={animationConfigs}
      keyboardBehavior={keyboardBehavior}
      android_keyboardInputMode={androidKeyboardInputMode}
      handleIndicatorStyle={{ backgroundColor: theme.colors.mist }}
      style={style}
      backgroundStyle={{ backgroundColor: theme.colors.background }}
    >
      {scrollable ? (
        <BottomSheetScrollView
          style={{
            flex: 1,
            paddingHorizontal: SHEET_MARGIN,
            paddingTop: SHEET_MARGIN,
          }}
          contentContainerStyle={{ paddingBottom: contentBottomPadding }}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView
          style={{
            flex: 1,
            paddingHorizontal: SHEET_MARGIN,
            paddingTop: SHEET_MARGIN,
            paddingBottom: contentBottomPadding,
          }}
        >
          {content}
        </BottomSheetView>
      )}

      {hasFooter ? (
        <View
          style={{
            paddingHorizontal: SHEET_MARGIN,
            paddingTop: theme.spacing.sm,
            paddingBottom: insets.bottom + theme.spacing.md,
            backgroundColor: theme.colors.background,
          }}
        >
          {footer}
        </View>
      ) : null}
    </BottomSheet>
  );
};
