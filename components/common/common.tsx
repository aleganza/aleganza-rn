/**
 * lacking and not official stuff
 */

import { useTheme } from "@/lib/theme/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "lucide-react-native";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { ExternalLink } from "../ui/external-link";
import { Txt, TxtGradient } from "../ui/texts";

export const CardPropertyBullet = () => {
  const { theme } = useTheme();

  return (
    <Txt
      style={{
        fontSize: theme.fontSize.sm,
        color: theme.colors.textShy,
        fontFamily: theme.family.default.medium,
      }}
    >
      •
    </Txt>
  );
};

export const CardRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        columnGap: theme.spacing.sm - 2,
        rowGap: theme.spacing.xs - 2,
      }}
    >
      {children}
    </View>
  );
};

export const CardProperty: React.FC<{
  text: string;
  gradientProps?: React.ComponentProps<typeof LinearGradient>;
  textColor?: string | ColorValue;
  Icon?: LucideIcon;
  iconColor?: string | ColorValue;
  strong?: boolean;
}> = ({ text, gradientProps, textColor, Icon, iconColor, strong = false }) => {
  const { theme } = useTheme();

  const textStyle = {
    fontFamily: !strong
      ? theme.family.default.medium
      : theme.family.default.regular,
    fontSize: theme.fontSize.sm,
    color: textColor ?? theme.colors.textSupporting,
    letterSpacing: 0,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.unit * 2,
      }}
    >
      {Icon && (
        <Icon
          color={iconColor ?? theme.colors.textShy}
          size={theme.iconSize.xs}
        />
      )}

      {gradientProps ? (
        <TxtGradient style={textStyle} gradientProps={gradientProps}>
          {text}
        </TxtGradient>
      ) : (
        <Txt style={textStyle}>{text}</Txt>
      )}
    </View>
  );
};

export const Property: React.FC<{
  text: string;
  gradientProps?: React.ComponentProps<typeof LinearGradient>;
  textColor?: string | ColorValue;
  Icon: LucideIcon;
  iconColor?: string | ColorValue;
}> = ({ text, gradientProps, textColor, Icon, iconColor }) => {
  const { theme } = useTheme();

  const textStyle = {
    fontFamily: theme.family.default.semi_bold,
    color: textColor ?? theme.colors.textShy,
    fontSize: theme.fontSize.base,
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.unit * 3,
      }}
    >
      <Icon
        color={iconColor ?? theme.colors.textShy}
        size={theme.iconSize.sm - 1.5}
      />

      {gradientProps ? (
        <TxtGradient style={textStyle} gradientProps={gradientProps}>
          {text}
        </TxtGradient>
      ) : (
        <Txt style={textStyle}>{text}</Txt>
      )}
    </View>
  );
};

export const LinkLabelWrapper: React.FC<{
  property: React.ReactNode;
  href: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}> = ({ property, href, wrapperStyle }) => {
  const { theme } = useTheme();

  return (
    <ExternalLink href={href}>
      <View
        style={StyleSheet.flatten([
          {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.borderRadius.full,
            paddingHorizontal: theme.spacing.unit * 8,
            paddingVertical: theme.spacing.unit * 4,
          },
          wrapperStyle,
        ])}
      >
        {property}
      </View>
    </ExternalLink>
  );
};

export const TinyLabel: React.FC<{
  text: string;
  textColor?: string | ColorValue;
  Icon?: LucideIcon;
  iconColor?: string | ColorValue;
}> = ({ text, textColor, Icon, iconColor }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing.unit * 3,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.mist,
        paddingHorizontal: theme.spacing.unit * 8,
        paddingVertical: theme.spacing.unit * 2,
      }}
    >
      {Icon && (
        <Icon
          color={iconColor ?? theme.colors.textShy}
          size={theme.iconSize.xs}
        />
      )}
      <Txt
        style={{
          fontFamily: theme.family.default.semi_bold,
          color: textColor ?? theme.colors.textShy,
          fontSize: theme.fontSize.sm,
        }}
      >
        {text}
      </Txt>
    </View>
  );
};
