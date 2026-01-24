import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { Txt } from "./texts";

// ============================================================================
// TYPES
// ============================================================================

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

// ============================================================================
// BASE BUTTON
// ============================================================================

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  // Size configurations
  const sizeConfig = {
    sm: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.base,
      fontSize: theme.fontSize.sm,
      iconGap: theme.spacing.xs,
    },
    md: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.fontSize.base,
      iconGap: theme.spacing.sm,
    },
    lg: {
      paddingVertical: theme.spacing.base,
      paddingHorizontal: theme.spacing.xl,
      fontSize: theme.fontSize.md,
      iconGap: theme.spacing.base,
    },
  };

  // Variant configurations
  const variantConfig = {
    primary: {
      backgroundColor: theme.colors.primary,
      textColor: "#ffffff",
      borderColor: "transparent",
      disabledBackground: theme.colors.mist,
      disabledText: theme.colors.textMuted,
    },
    secondary: {
      backgroundColor: theme.colors.foreground,
      textColor: theme.colors.text,
      borderColor: theme.colors.mist,
      disabledBackground: theme.colors.foreground,
      disabledText: theme.colors.textMuted,
    },
    ghost: {
      backgroundColor: "transparent",
      textColor: theme.colors.primary,
      borderColor: "transparent",
      disabledBackground: "transparent",
      disabledText: theme.colors.textMuted,
    },
    danger: {
      backgroundColor: theme.colors.alert,
      textColor: "#ffffff",
      borderColor: "transparent",
      disabledBackground: theme.colors.mist,
      disabledText: theme.colors.textMuted,
    },
  };

  const currentSize = sizeConfig[size];
  const currentVariant = variantConfig[variant];

  const buttonStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: currentSize.paddingVertical,
    paddingHorizontal: currentSize.paddingHorizontal,
    backgroundColor: disabled
      ? currentVariant.disabledBackground
      : currentVariant.backgroundColor,
    borderRadius: theme.borderRadius.md,
    borderWidth: currentVariant.borderColor !== "transparent" ? 1 : 0,
    borderColor: currentVariant.borderColor,
    width: fullWidth ? "100%" : undefined,
    alignSelf: fullWidth ? "stretch" : "flex-start",
    opacity: disabled ? 0.6 : 1,
  };

  const textStyleConfig: TextStyle = {
    fontSize: currentSize.fontSize,
    fontFamily: theme.family.default.semi_bold,
    color: disabled ? currentVariant.disabledText : currentVariant.textColor,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[buttonStyle, style]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            disabled ? currentVariant.disabledText : currentVariant.textColor
          }
          size="small"
        />
      ) : (
        <>
          {leftIcon && (
            <View style={{ marginRight: currentSize.iconGap }}>{leftIcon}</View>
          )}
          <Txt style={[textStyleConfig, textStyle]}>{children}</Txt>
          {rightIcon && (
            <View style={{ marginLeft: currentSize.iconGap }}>{rightIcon}</View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

// ============================================================================
// BUTTONS
// ============================================================================

interface PrimaryButtonProps extends Omit<BaseButtonProps, "variant"> {}

export const PrimaryButton: React.FC<PrimaryButtonProps> = (props) => {
  return <BaseButton variant="primary" {...props} />;
};

interface SecondaryButtonProps extends Omit<BaseButtonProps, "variant"> {}

export const SecondaryButton: React.FC<SecondaryButtonProps> = (props) => {
  return <BaseButton variant="secondary" {...props} />;
};

interface GhostButtonProps extends Omit<BaseButtonProps, "variant"> {}

export const GhostButton: React.FC<GhostButtonProps> = (props) => {
  return <BaseButton variant="ghost" {...props} />;
};

interface DangerButtonProps extends Omit<BaseButtonProps, "variant"> {}

export const DangerButton: React.FC<DangerButtonProps> = (props) => {
  return <BaseButton variant="danger" {...props} />;
};
