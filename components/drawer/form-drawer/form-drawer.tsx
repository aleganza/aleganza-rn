import { GhostButton, PrimaryButton } from "@/components/ui/buttons";
import CrossPlatformDatePicker from "@/components/ui/date-picker";
import { H4 } from "@/components/ui/headings";
import { Input } from "@/components/ui/input";
import { SelectFieldInput } from "@/components/ui/select";
import Spacer from "@/components/ui/spacer";
import { Txt } from "@/components/ui/texts";
import { useScreenDimensions } from "@/lib/common/hooks/useScreenDimensions";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BaseDrawer } from "../base-drawer";
import { FieldConfig } from "./types";

export const FormDrawer: React.FC<SheetProps<"form-drawer">> = ({
  payload,
}) => {
  const { height } = useScreenDimensions();
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const options = payload;

  const styles = StyleSheet.create({
    fieldContainer: {
      marginBottom: 12,
    },
    label: {
      marginBottom: 4,
      fontSize: theme.fontSize.md,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
  });

  const [values, setValues] = useState<Record<string, any>>(
    () =>
      options?.fields.reduce((acc, f) => {
        acc[f.key] =
          options.initialValues?.[f.key] ??
          f.defaultValue ??
          (f.type === "switch" ? false : "");
        return acc;
      }, {} as Record<string, any>) || {}
  );

  const [loading, setLoading] = useState(false);

  if (!options) return null;

  const handleChange = (key: string, value: any) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (options.onSubmit) {
      try {
        setLoading(true);
        await options.onSubmit(values);
        setLoading(false);
        if (options.closeOnSubmit ?? true) SheetManager.hide("form-drawer");
      } catch (e) {
        setLoading(false);
        console.warn(e);
      }
    } else {
      SheetManager.hide("form-drawer");
    }
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "text":
      case "textarea":
        return (
          <View key={field.key} style={styles.fieldContainer}>
            {field.label && (
              <Txt style={[styles.label, { color: theme.colors.text }]}>
                {field.label}
              </Txt>
            )}
            <Input
              value={values[field.key]}
              onChangeText={(text) => handleChange(field.key, text)}
              placeholder={field.placeholder}
              multiline={field.multiline ?? false}
              wrapperStyle={{ backgroundColor: theme.colors.mist }}
              clearable
            />
          </View>
        );

      case "number":
        return (
          <View key={field.key} style={styles.fieldContainer}>
            {field.label && (
              <Txt style={[styles.label, { color: theme.colors.text }]}>
                {field.label}
              </Txt>
            )}
            <Input
              value={String(values[field.key])}
              onChangeText={(text) => handleChange(field.key, Number(text))}
              keyboardType="numeric"
              wrapperStyle={{ backgroundColor: theme.colors.mist }}
              // clearable // TODO: idk whether is good or overlaps
            />
          </View>
        );

      case "switch":
        return (
          <View key={field.key} style={styles.switchContainer}>
            {field.label && (
              <Txt style={[styles.label, { color: theme.colors.text }]}>
                {field.label}
              </Txt>
            )}
            <Switch
              value={values[field.key]}
              onValueChange={(val) => handleChange(field.key, val)}
            />
          </View>
        );

      case "select":
        return (
          <View key={field.key} style={styles.fieldContainer}>
            {field.label && (
              <Txt style={[styles.label, { color: theme.colors.text }]}>
                {field.label}
              </Txt>
            )}
            <SelectFieldInput
              value={values[field.key]}
              onChange={(val) => handleChange(field.key, val)}
              // options={field.options}
              options={[...field.options]}
              placeholder={field.placeholder}
              searchable
            />
          </View>
        );

      case "datetime":
        return (
          <View key={field.key} style={styles.fieldContainer}>
            {field.label && (
              <Txt style={[styles.label, { color: theme.colors.text }]}>
                {field.label}
              </Txt>
            )}
            <CrossPlatformDatePicker
              value={values[field.key] || new Date()}
              mode="datetime"
              onChange={(d) => handleChange(field.key, d)}
            />
          </View>
        );

      case "custom":
        return (
          <View key={field.key}>
            {field.render({
              value: values[field.key],
              onChange: (val) => handleChange(field.key, val),
              field,
            })}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <BaseDrawer
      id="form-drawer"
      headerAlwaysVisible
      drawUnderStatusBar={false}
      closable={false}
      gestureEnabled={false}
      heading={options.title ? <H4 text={options.title} /> : undefined}
    >
      <Spacer size="md" />

      <ScrollView>{options.fields.map((f) => renderField(f))}</ScrollView>

      <Spacer />

      <View style={{ flexDirection: "column", gap: theme.spacing.sm }}>
        <PrimaryButton
          size="lg"
          fullWidth
          onPress={handleSubmit}
          disabled={loading}
          loading={loading}
        >
          {options.submitLabel ?? "Salva"}
        </PrimaryButton>

        <GhostButton
          size="lg"
          fullWidth
          onPress={() => SheetManager.hide("form-drawer")}
        >
          {options.cancelLabel ?? "Annulla"}
        </GhostButton>
      </View>
    </BaseDrawer>
  );
};
