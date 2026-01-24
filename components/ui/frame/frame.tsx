import { FRAME_MARGIN } from "@/lib/config";
import { useTheme } from "@/lib/theme/useTheme";
import { router } from "expo-router";
import { ArrowLeft, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ScreenHeading } from "../headings";
import Spacer from "../spacer";
import StaticSpacer from "../static-spacer";
import { Header } from "./header";
import { FrameProps } from "./types";

export const Frame: React.FC<FrameProps> = ({
  children,
  isTab = false,
  isFullScreenModal = false,
  isSubScreen = false,
  wrapContent = true,
  heading,
  tight = false,
  showHeader = true,
  headerText,
  leftIcons,
  rightIcons,
  headerCustomContent,
  scrollable = false,
  scrollViewProps,
  useSafeArea = false,
  safeAreaProps,
  keyboardAvoiding = false,
  keyboardAvoidingProps,
  onHeaderFullHeightChange,
  onHeaderHeightChange,
  style,
  contentContainerStyle,
}) => {
  const { theme } = useTheme();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerFullHeight, setHeaderFullHeight] = useState(0);

  const insets = useSafeAreaInsets();
  const contentTop = wrapContent
    ? (useSafeArea ? insets.top : 0) + headerHeight
    : undefined;

  const ContentLayer = scrollable ? ScrollView : View;

  const contentBaseStyle = [
    {
      flex: scrollable ? undefined : 1,
      flexGrow: scrollable ? 1 : undefined,
      marginHorizontal: tight ? FRAME_MARGIN : 0,
      paddingTop: contentTop,
    },
    contentContainerStyle,
  ];

  const contentProps = scrollable
    ? {
        contentContainerStyle: contentBaseStyle,
        keyboardShouldPersistTaps: "handled" as const,
        ...scrollViewProps,
      }
    : {
        style: contentBaseStyle,
      };

  const WrapperLayer = useSafeArea ? SafeAreaView : View;
  const wrapperProps = useSafeArea
    ? {
        edges: ["bottom", "left", "right"] as const,
        mode: "padding" as const,
        ...safeAreaProps,
      }
    : {};

  if (isSubScreen) {
    leftIcons = [
      {
        icon: ArrowLeft,
        onPress: () => router.back(),
      },
      ...(leftIcons || []),
    ];
  }

  if (isFullScreenModal) {
    rightIcons = [
      ...(rightIcons || []),
      {
        icon: X,
        onPress: () => router.back(),
      },
    ];
  }

  const content = (
    <>
      {showHeader && (
        <Header
          headerText={headerText}
          leftIcons={leftIcons}
          rightIcons={rightIcons}
          headerCustomContent={headerCustomContent}
          headerProps={{
            onLayout: (event) => {
              const { height } = event.nativeEvent.layout;
              setHeaderFullHeight(height);
              if (onHeaderFullHeightChange) onHeaderFullHeightChange(height);
            },
          }}
          headerContentProps={{
            onLayout: (event) => {
              const { height } = event.nativeEvent.layout;
              setHeaderHeight(height);
              if (onHeaderHeightChange) onHeaderHeightChange(height);
            },
          }}
        />
      )}

      {showHeader && <StaticSpacer size={12} />}

      <WrapperLayer
        {...wrapperProps}
        style={[
          {
            flex: 1,
          },
          style,
        ]}
      >
        <ContentLayer {...contentProps}>
          {heading && <ScreenHeading text={heading} />}

          {children}
        </ContentLayer>
      </WrapperLayer>
    </>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        {...keyboardAvoidingProps}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
};
