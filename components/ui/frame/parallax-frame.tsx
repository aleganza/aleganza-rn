import { useScreenDimensions } from "@/lib/common/hooks/useScreenDimensions";
import { FRAME_MARGIN } from "@/lib/config";
import platform from "@/lib/env/platform";
import { AniImage, AniView } from "@/lib/reanimated/components";
import { useTheme } from "@/lib/theme/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ArrowLeft, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { ScreenHeading } from "../headings";
import StaticSpacer from "../static-spacer";
import { Header } from "./header";
import { FrameProps } from "./types";

export const ParallaxFrame: React.FC<FrameProps> = ({
  children,
  isFullScreenModal = false,
  isSubScreen = false,
  heading,
  showHeader = true,
  headerText,
  leftIcons,
  rightIcons,
  headerCustomContent,
  scrollViewProps,
  safeAreaProps,
  keyboardAvoiding = false,
  keyboardAvoidingProps,
  style,
  contentContainerStyle,
  parallaxImageUrl,
  parallaxImageAspectRatio = 1,
  onHeaderFullHeightChange,
  onHeaderHeightChange,
  bottomAction,
}) => {
  const { theme } = useTheme();
  const [headerFullHeight, setHeaderFullHeight] = useState(0);
  const [bottomActionHeight, setBottomActionHeight] = useState(0)

  const { width, height } = useScreenDimensions();
  const insets = useSafeAreaInsets();

  const contentThresholdHeight =
    parallaxImageUrl !== undefined
      ? width / parallaxImageAspectRatio
      : headerFullHeight;

  const aniWidth = useSharedValue(width);
  const aniOpacity = useSharedValue(1);
  const aniTop = useSharedValue(0);

  const aniViewStyle = useAnimatedStyle(() => {
    return {
      top: aniTop.value,
    };
  });

  const aniImageStyle = useAnimatedStyle(() => {
    return {
      width: aniWidth.value,
      opacity: aniOpacity.value,
    };
  });

  const contentBaseStyle = StyleSheet.flatten([
    {
      minHeight: "100%",
      marginBottom: -insets.bottom,
      paddingBottom: insets.bottom + bottomActionHeight,
    },
    contentContainerStyle,
  ]) as StyleProp<ViewStyle>;

  const parallaxImageScrollHandler = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;

    if (y < 0) {
      if (platform.is.ios)
        aniWidth.value =
          (width * (contentThresholdHeight - y)) / contentThresholdHeight;
    } else {
      aniOpacity.value = interpolate(
        y,
        [height * 0.3, height * 0.6],
        [1, 0],
        Extrapolation.EXTEND
      );
    }

    aniTop.value = interpolate(
      y,
      [0, height * 0.6],
      [0, -150],
      Extrapolation.CLAMP
    );
  };

  const handleScroll = (event: any) => {
    parallaxImageScrollHandler(event);
  };

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
        />
      )}

      {showHeader && <StaticSpacer size={12} />}

      {bottomAction && (
        <View
          style={{
            zIndex: 1,
            flex: 1,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            paddingBottom: insets.bottom + 0,
            paddingHorizontal: FRAME_MARGIN,
            paddingVertical: FRAME_MARGIN,
            borderTopColor: theme.colors.foreground,
            borderTopWidth: 2,
            backgroundColor: theme.colors.background,
          }}
          onLayout={(event) => {
              const { height } = event.nativeEvent.layout;
              setBottomActionHeight(height);
            }}
        >
          {bottomAction}
        </View>
      )}

      <View style={{ position: "absolute", left: 0, right: 0, width: "100%" }}>
        <AniView style={[aniViewStyle, { flex: 1, alignItems: "center" }]}>
          <AniImage
            source={{
              uri: parallaxImageUrl,
            }}
            resizeMode="cover"
            style={[
              aniImageStyle,
              {
                aspectRatio: parallaxImageAspectRatio,
              },
            ]}
          />
        </AniView>
      </View>

      <SafeAreaView
        edges={["left", "right"] as const}
        mode={"padding" as const}
        {...safeAreaProps}
        style={style}
      >
        <ScrollView
          contentContainerStyle={contentBaseStyle}
          keyboardShouldPersistTaps={"handled" as const}
          onScroll={handleScroll}
          {...scrollViewProps}
        >
          {heading && <ScreenHeading text={heading} />}

          {parallaxImageUrl !== undefined && (
            <LinearGradient
              // colors={["red", "green"]}
              colors={["transparent", theme.colors.background]}
              style={[
                {
                  position: "absolute",
                  width: width,
                  height: contentThresholdHeight,
                  top: 0,
                },
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          )}

          <View
            style={{
              // height: "100%",
              marginTop: contentThresholdHeight,
              paddingHorizontal: FRAME_MARGIN,
              backgroundColor: theme.colors.background,
            }}
          >
            {children}
          </View>
        </ScrollView>
      </SafeAreaView>
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
