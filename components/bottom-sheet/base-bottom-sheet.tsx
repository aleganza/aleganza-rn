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

import { SheetManager } from "./manager";
import { BaseBottomSheetProps, BottomSheetRef } from "./types";
import { updateSheetProps } from "./useSheetProps";
import { DRAWER_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { collapseTopMarginForChild } from "react-native-render-html";

export const BaseBottomSheet = <T = any,>(
  {
    name,
    snapPoints = ["50%"],
    enablePanDownToClose = true,
    scrollable = false,
    style,
    children,
    onPropsChange,
  }: BaseBottomSheetProps<T>,
  ref?: React.Ref<BottomSheetRef<T>>,
) => {
  const { theme } = useTheme();

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    stiffness: 500,
    mass: 0.3,
  });

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetProps, setSheetProps] = useState<T | null>(null);

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
      if (index === -1) {
        setSheetProps(null);
      }
    },
    [name],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    ),
    [],
  );

  const SheetView = scrollable ? BottomSheetScrollView : BottomSheetView;

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
      handleIndicatorStyle={{backgroundColor: theme.colors.mist}}
      style={style}

      backgroundStyle={{ backgroundColor: theme.colors.background }}
    >
      <SheetView style={{ flex: 1, padding: DRAWER_MARGIN }}>
        {typeof children === "function" ? children(sheetProps) : children}
      </SheetView>
    </BottomSheet>
  );
};
