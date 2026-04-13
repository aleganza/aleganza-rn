import { FRAME_MARGIN } from "@/lib/config";
import { AniTouchableOpacity } from "@/lib/reanimated/components";
import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Txt } from "../texts";
import { HeaderIcon, HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({
  headerText,
  leftIcons,
  rightIcons,
  headerProps,
  headerCustomContent,
  headerContentProps,
}) => {
  const { theme } = useTheme();

  const insets = useSafeAreaInsets();

  const renderHeaderIcons = (icons?: HeaderIcon[], prefix?: string) =>
    icons?.map((i, index) => {
      const scale = useSharedValue(1);
      const opacity = useSharedValue(1);

      const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      }));

      if (i.isLoading)
        return <ActivityIndicator key={`${prefix}-icon-${index}`} />;

      return (
        <AniTouchableOpacity
          key={`${prefix}-icon-${index}`}
          activeOpacity={0.5}
          onPress={i.onPress}
          // onPressIn={() => {
          //   scale.value = withTiming(0.9, { duration: 100 });
          //   opacity.value = 0.6;
          // }}
          // onPressOut={() => {
          //   scale.value = withTiming(1, { duration: 100 });
          //   opacity.value = 1;
          // }}
          style={animatedStyle}
        >
          <i.icon
            size={theme.iconSize.md}
            color={i.accent ?? theme.colors.text}
            fill={i.fillIcon ? (i.accent ?? theme.colors.text) : "transparent"}
            {...i.iconProps}
          />
        </AniTouchableOpacity>
      );
    });

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          // borderBottomWidth: 1,
          // borderBottomColor: theme.colors.mist,
          backgroundColor: theme.colors.background,
        },
      ]}
      {...headerProps}
    >
      <View
        style={{
          flex: 1,
          position: "relative",
          paddingHorizontal: FRAME_MARGIN,
          paddingTop: insets.top,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingVertical: headerText !== undefined ? 12 : 0,
          }}
          {...headerContentProps}
        >
          <View
            style={{
              position: "relative",
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {headerText !== undefined && (
              <Txt
                style={[
                  {
                    top: 0,
                    fontFamily: theme.family.accent.bold,
                    fontSize: theme.fontSize.md,
                    maxWidth: "75%",
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {headerText}
              </Txt>
            )}

            {
              <>
                <View
                  style={[
                    {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      flexDirection: "row",
                    },
                  ]}
                >
                  {renderHeaderIcons(leftIcons, "left")}
                </View>
                <View
                  style={[
                    {
                      position: "absolute",
                      top: 0,
                      right: 0,
                      flexDirection: "row",
                    },
                  ]}
                >
                  {renderHeaderIcons(rightIcons, "right")}
                </View>
              </>
            }
          </View>
        </View>
      </View>

      {headerCustomContent && (
        <View style={{ width: "100%", paddingHorizontal: FRAME_MARGIN }}>
          {headerCustomContent}
        </View>
      )}
    </View>
  );
};
