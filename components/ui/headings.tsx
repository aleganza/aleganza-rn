import { useTheme } from "@/lib/theme/useTheme";
import { forwardRef } from "react";
import { Text, TextProps } from "react-native";

import { Txt } from "./texts";

const BaseHeading = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <Txt
        ref={ref}
        style={[
          {
            fontFamily: theme.family.default.bold,
            fontSize: theme.fontSize.lg,
          },
          style,
        ]}
        {...props}
      >
        {text}
      </Txt>
    );
  }
);

export const Heading = BaseHeading;

export const H1 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h1,
            // lineHeight: theme.fontSize.h1,
            fontFamily: theme.family.default.extra_bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export const H2 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h2,
            // lineHeight: theme.fontSize.h2,
            fontFamily: theme.family.default.bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export const H3 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h3,
            // lineHeight: theme.fontSize.h3,
            fontFamily: theme.family.default.bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export const H4 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h4,
            // lineHeight: theme.fontSize.h4,
            fontFamily: theme.family.default.bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export const H5 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h5,
            // lineHeight: theme.fontSize.h5,
            fontFamily: theme.family.default.bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

export const H6 = forwardRef<Text, TextProps & { text: string }>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.h6,
            // lineHeight: theme.fontSize.h6,
            fontFamily: theme.family.default.semi_bold,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);

interface ScreenHeadingProps extends TextProps {
  text: string;
}

export const ScreenHeading = forwardRef<any, ScreenHeadingProps>(
  ({ text, style, ...props }, ref) => {
    const { theme } = useTheme();
    return (
      <BaseHeading
        ref={ref}
        text={text}
        style={[
          {
            fontSize: theme.fontSize.display,
            marginBottom: 16,
          },
          style,
        ]}
        {...props}
      />
    );
  }
);
