import { GhostButton, PrimaryButton } from "@/components/ui/buttons";
import CrossPlatformDatePicker from "@/components/ui/date-picker";
import { H4 } from "@/components/ui/headings";
import { CircleIcon } from "@/components/ui/icon-buttons";
import { Input } from "@/components/ui/input";
import { SelectFieldInput } from "@/components/ui/select";
import { Txt } from "@/components/ui/texts";
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";

import { BaseBottomSheet } from "../base-bottom-sheet";
import { useSheetProps } from "../useSheetProps";
import { closeFormSheet } from "./openFormSheet";
import type { FieldConfig, FormSheetOptions } from "./types";

const buildInitialValues = (options: FormSheetOptions) =>
  options.fields.reduce<Record<string, any>>((acc, field) => {
    acc[field.key] =
      options.initialValues?.[field.key] ??
      field.defaultValue ??
      (field.type === "switch" ? false : "");
    return acc;
  }, {});

export const FormSheet = () => {
  const { theme } = useTheme();
  const options = useSheetProps<FormSheetOptions>("form-sheet");
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setValues(options ? buildInitialValues(options) : {});
    setLoading(false);
  }, [options]);

  const handleChange = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!options) return;

    if (!options.onSubmit) {
      closeFormSheet();
      return;
    }

    try {
      setLoading(true);
      await options.onSubmit(values);
      setLoading(false);
      if (options.closeOnSubmit ?? true) closeFormSheet();
    } catch (error) {
      setLoading(false);
      console.warn(error);
    }
  };

  const labelStyle = {
    marginBottom: theme.spacing.xs,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "text":
      case "textarea":
        return (
          <View key={field.key}>
            {field.label ? <Txt style={labelStyle}>{field.label}</Txt> : null}
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
          <View key={field.key}>
            {field.label ? <Txt style={labelStyle}>{field.label}</Txt> : null}
            <Input
              value={String(values[field.key] ?? "")}
              onChangeText={(text) => handleChange(field.key, Number(text))}
              keyboardType="numeric"
              wrapperStyle={{ backgroundColor: theme.colors.mist }}
            />
          </View>
        );

      case "switch":
        return (
          <View
            key={field.key}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {field.label ? (
              <Txt style={{ fontSize: theme.fontSize.md }}>{field.label}</Txt>
            ) : null}
            <Toggle
              value={Boolean(values[field.key])}
              onValueChange={(value) => handleChange(field.key, value)}
              accessibilityLabel={field.label}
            />
          </View>
        );

      case "select":
        return (
          <View key={field.key}>
            {field.label ? <Txt style={labelStyle}>{field.label}</Txt> : null}
            <SelectFieldInput
              value={values[field.key]}
              onChange={(value) => handleChange(field.key, value)}
              options={[...field.options]}
              placeholder={field.placeholder}
              searchable
            />
          </View>
        );

      case "datetime":
        return (
          <View key={field.key}>
            {field.label ? <Txt style={labelStyle}>{field.label}</Txt> : null}
            <CrossPlatformDatePicker
              value={values[field.key] || new Date()}
              mode="datetime"
              onChange={(date) => handleChange(field.key, date)}
            />
          </View>
        );

      case "custom":
        return (
          <View key={field.key}>
            {field.render({
              value: values[field.key],
              onChange: (value) => handleChange(field.key, value),
              field,
            })}
          </View>
        );

      default:
        return null;
    }
  };

  const footer = options ? (
    <View style={{ gap: theme.spacing.sm }}>
      <PrimaryButton
        size="lg"
        fullWidth
        onPress={handleSubmit}
        disabled={loading}
        loading={loading}
      >
        {options.submitLabel ?? "Salva"}
      </PrimaryButton>

      <GhostButton size="lg" fullWidth onPress={closeFormSheet}>
        {options.cancelLabel ?? "Annulla"}
      </GhostButton>
    </View>
  ) : null;

  return (
    <BaseBottomSheet<FormSheetOptions>
      name="form-sheet"
      snapPoints={["90%"]}
      scrollable
      keyboardBehavior="interactive"
      androidKeyboardInputMode="adjustResize"
      footer={footer}
    >
      {() =>
        options ? (
          <View style={{ gap: theme.spacing.md }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: theme.spacing.sm,
              }}
            >
              {options.title ? (
                <H4 text={options.title} />
              ) : (
                <View style={{ flex: 1 }} />
              )}
              <CircleIcon icon="close" onPress={closeFormSheet} />
            </View>

            {options.fields.map(renderField)}
          </View>
        ) : null
      }
    </BaseBottomSheet>
  );
};
