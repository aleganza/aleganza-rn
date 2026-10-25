import { useTheme } from "@/lib/theme/useTheme";
import React from "react";
import { Modal, Pressable, View } from "react-native";

import { DangerButton, PrimaryButton, SecondaryButton } from "../ui/buttons";
import { H4 } from "../ui/headings";
import { Txt } from "../ui/texts";
import { BasePopupProps } from "./types";

export const BasePopup: React.FC<BasePopupProps> = ({
  visible,
  title,
  children,
  confirmText = "OK",
  cancelText = "Cancel",
  destructive = false,
  showCancel = false,
  isLoading = false,
  dismissOnBackdrop = true,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  const handleCancel = () => {
    if (!isLoading) onCancel?.();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleCancel}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.lg,
        }}
        onPress={() => {
          if (dismissOnBackdrop) handleCancel();
        }}
      >
        <View
          onStartShouldSetResponder={() => true}
          style={{
            width: "100%",
            maxWidth: 340,
            backgroundColor: theme.colors.foreground,
            borderRadius: theme.borderRadius.lg,
            overflow: "hidden",
          }}
        >
          {title ? (
            <View
              style={{
                paddingHorizontal: theme.spacing.md,
                paddingTop: theme.spacing.md,
                paddingBottom: theme.spacing.sm,
              }}
            >
              <H4 text={title} style={{ textAlign: "center" }} />
            </View>
          ) : null}

          {children ? (
            <View
              style={{
                paddingHorizontal: theme.spacing.md,
                paddingBottom: theme.spacing.md,
                paddingTop: title ? 0 : theme.spacing.md,
              }}
            >
              {typeof children === "string" ? (
                <Txt
                  style={{
                    textAlign: "center",
                    color: theme.colors.textSupporting,
                  }}
                >
                  {children}
                </Txt>
              ) : (
                children
              )}
            </View>
          ) : null}

          <View
            style={{
              height: 0.75,
              backgroundColor: theme.colors.mist,
            }}
          />

          <View
            style={{
              padding: theme.spacing.md,
              gap: theme.spacing.sm,
            }}
          >
            {destructive ? (
              <DangerButton fullWidth onPress={onConfirm} loading={isLoading}>
                {confirmText}
              </DangerButton>
            ) : (
              <PrimaryButton fullWidth onPress={onConfirm} loading={isLoading}>
                {confirmText}
              </PrimaryButton>
            )}

            {showCancel ? (
              <SecondaryButton
                fullWidth
                onPress={handleCancel}
                disabled={isLoading}
              >
                {cancelText}
              </SecondaryButton>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};
