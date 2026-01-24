import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
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
    icons?.map((i, index) => (
      <Pressable key={`${prefix}-icon-${index}`} {...i}>
        <i.icon size={theme.iconSize.md} color={theme.colors.text} />
      </Pressable>
    ));

  return (
    <View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
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
        <LinearGradient
          // colors={["red", "red"]}
          colors={[theme.colors.background, "rgba(0,0,0,0)"]}
          style={StyleSheet.absoluteFill}
        />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingVertical: headerText ? 12 : 0,
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
            {headerText && (
              <Txt
                style={[
                  {
                    top: 0,
                    fontFamily: theme.family.default.semi_bold,
                    maxWidth: "75%",
                    textShadowColor: "rgba(0, 0, 0, 0.5)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 2,
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
