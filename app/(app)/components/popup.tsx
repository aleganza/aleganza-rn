import { BasePopup, popup } from "@/components/popup";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Input } from "@/components/ui/input";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";

export default function PopupShowcase() {
  const { theme } = useTheme();
  const [result, setResult] = useState("No interaction yet");
  const [customVisible, setCustomVisible] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);

  const askConfirm = async () => {
    const value = await popup.confirm({
      title: "Confirm action",
      message: "Do you want to continue?",
      confirmText: "Continue",
    });
    setResult(`confirm resolved: ${value}`);
  };

  const askDestructive = async () => {
    const value = await popup.confirm({
      title: "Delete item?",
      message: "This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Keep",
      destructive: true,
    });
    setResult(`destructive resolved: ${value}`);
  };

  const askAlert = async () => {
    await popup.alert({
      title: "Saved",
      message: "Your changes are live.",
      confirmText: "Great",
    });
    setResult("alert dismissed");
  };

  const askQueue = async () => {
    const first = popup.confirm({
      title: "Queue 1",
      message: "First popup in the queue.",
    });
    const second = popup.confirm({
      title: "Queue 2",
      message: "Second popup in the queue.",
    });
    const third = popup.alert({
      title: "Queue 3",
      message: "Last popup in the queue.",
    });

    const [firstResult, secondResult] = await Promise.all([first, second]);
    await third;
    setResult(`queue resolved: ${firstResult}, ${secondResult}`);
  };

  const closeCustom = () => {
    setCustomLoading(true);
    setTimeout(() => {
      setCustomLoading(false);
      setCustomVisible(false);
      setResult("custom popup confirmed");
    }, 1200);
  };

  return (
    <ShowcaseFrame
      title="Popups"
      subtitle="popup.confirm and popup.alert queue one dialog at a time. BasePopup renders custom content with the same chrome."
    >
      <DemoCard title="Promise API">
        <PrimaryButton onPress={askConfirm}>Confirm</PrimaryButton>
        <SecondaryButton onPress={askDestructive}>
          Destructive confirm
        </SecondaryButton>
        <SecondaryButton onPress={askAlert}>Alert</SecondaryButton>
        <SecondaryButton onPress={askQueue}>Queue three</SecondaryButton>
      </DemoCard>

      <DemoCard title="Custom content">
        <PrimaryButton onPress={() => setCustomVisible(true)}>
          Open custom popup
        </PrimaryButton>

        <Txt style={{ color: theme.colors.textSupporting }}>
          Confirm shows a loading spinner for 1.2s and blocks backdrop
          dismissal while loading.
        </Txt>
      </DemoCard>

      <DemoCard title="Result">
        <Txt style={{ color: theme.colors.textSupporting }}>{result}</Txt>
      </DemoCard>

      <BasePopup
        visible={customVisible}
        title="Custom content"
        confirmText="Confirm"
        cancelText="Cancel"
        showCancel
        isLoading={customLoading}
        dismissOnBackdrop={false}
        onConfirm={closeCustom}
        onCancel={() => setCustomVisible(false)}
      >
        <Input placeholder="Type something" />
      </BasePopup>
    </ShowcaseFrame>
  );
}
