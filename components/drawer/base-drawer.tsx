import { useTheme } from "@/lib/theme/useTheme";
import { X } from "lucide-react-native";
import React, { useEffect } from "react";
import { View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CircleIcon } from "../ui/icon-buttons";
import { BaseDrawerProps, DrawerHeaderProps } from "./types";
import { useBaseDrawerDefaultPropsValues } from "./utils";

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  drawerId,
  heading,
  showCloseButton,
}) => {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {heading}

      {showCloseButton && (
        <CircleIcon Icon={X} onPress={() => SheetManager.hide(drawerId)} />
      )}
    </View>
  );
};

export const BaseDrawer: React.FC<BaseDrawerProps> = ({
  children,
  heading,
  showCloseButton,
  id,
  gestureEnabled = true,
  defaultOverlayOpacity = 0.5,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const { containerStyle, indicatorStyle, ...restProps } = props;

  const Wrapper = View; // TODO: add blurred component option

  useEffect(() => {
    // hapticVibrate() // TODO: rebuild client
  }, []);

  const drawerProps = useBaseDrawerDefaultPropsValues(
    containerStyle,
    indicatorStyle
  );

  return (
    <Wrapper style={{ width: "100%" }}>
      <ActionSheet
        id={id}
        {...drawerProps}
        {...restProps}
        gestureEnabled={gestureEnabled}
        defaultOverlayOpacity={defaultOverlayOpacity}
        CustomHeaderComponent={
          <View
            style={[
              {
                height: insets.top,
                alignItems: "center",
              },
            ]}
          >
            <View
              style={[
                {
                  backgroundColor: theme.colors.textMuted,
                  height: 3,
                  width: 36,
                  marginTop: insets.top * 0.2,
                },
                indicatorStyle,
              ]}
            />
          </View>
        }
      >
        {(heading || showCloseButton) && (
          <DrawerHeader
            drawerId={id!}
            heading={heading}
            showCloseButton={showCloseButton}
          />
        )}

        {children}
      </ActionSheet>
    </Wrapper>
  );
};
