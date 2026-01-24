import { useTheme } from "@/lib/theme/useTheme";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient, LinearGradientProps } from "expo-linear-gradient";
import { forwardRef } from "react";
import { Text, TextProps } from "react-native";

const BaseTxt = forwardRef<Text, TextProps>(({ style, ...props }, ref) => {
  const { theme } = useTheme();

  return (
    <Text
      ref={ref}
      style={[
        {
          fontFamily: theme.family.default.regular,
          fontSize: theme.fontSize.md,
          color: theme.colors.text,
          letterSpacing: -0.5,
        },
        style,
      ]}
      {...props}
    />
  );
});

export const Txt = BaseTxt;

type TxtGradientProps = TextProps & {
  gradientProps: LinearGradientProps;
};

export const TxtGradient = forwardRef<Text, TxtGradientProps>(
  ({ style, children, gradientProps, ...textProps }, ref) => {
    return (
      <MaskedView
        maskElement={
          <BaseTxt ref={ref} style={[{ color: "black" }, style]} {...textProps}>
            {children}
          </BaseTxt>
        }
      >
        <LinearGradient
          {...gradientProps}
          style={[
            {
              alignSelf: "flex-start",
            },
            gradientProps?.style,
          ]}
        >
          <BaseTxt style={[{ opacity: 0 }, style]} {...textProps}>
            {children}
          </BaseTxt>
        </LinearGradient>
      </MaskedView>
    );
  }
);
