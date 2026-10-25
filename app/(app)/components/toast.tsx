import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import { toaster } from "@/lib/toaster/toaster";
import React from "react";

export default function ToastShowcase() {
  const { theme } = useTheme();

  return (
    <ShowcaseFrame
      title="Toasts"
      subtitle="Toasts stack with a layout animation, keep stable ids, and close themselves. The UI variant is global."
    >
      <DemoCard title="Variants">
        <PrimaryButton
          onPress={() =>
            toaster.success("Saved", "Your changes are live")
          }
        >
          Success with description
        </PrimaryButton>

        <SecondaryButton onPress={() => toaster.error("Upload failed")}>
          Error
        </SecondaryButton>

        <SecondaryButton
          onPress={() =>
            toaster.warning("Connection slow", "Retrying in the background")
          }
        >
          Warning with description
        </SecondaryButton>

        <SecondaryButton onPress={() => toaster.info("Heads up")}>
          Info
        </SecondaryButton>

        <SecondaryButton
          onPress={() => toaster.neutral("Nothing to do", "Come back later")}
        >
          Neutral
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Stack and timing">
        <PrimaryButton
          onPress={() => {
            toaster.info("Queue 1", "first");
            toaster.success("Queue 2", "second");
            toaster.error("Queue 3", "third");
          }}
        >
          Fire three at once
        </PrimaryButton>

        <SecondaryButton
          onPress={() =>
            toaster.info("Long toast", "Visible for six seconds", 6000)
          }
        >
          Long duration
        </SecondaryButton>

        <SecondaryButton
          onPress={() => {
            [1, 2, 3, 4, 5].forEach((index) =>
              setTimeout(
                () => toaster.success(`Toast ${index}`, "staggered"),
                index * 250,
              ),
            );
          }}
        >
          Staggered burst
        </SecondaryButton>

        <Txt style={{ color: theme.colors.textSupporting }}>
          Changing the variant or position requires editing
          lib/toaster/config.ts.
        </Txt>
      </DemoCard>
    </ShowcaseFrame>
  );
}
