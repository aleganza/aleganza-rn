import { SheetManager } from "@/components/bottom-sheet";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";

export default function SheetsShowcase() {
  const { theme } = useTheme();
  const [result, setResult] = useState("No sheet interaction yet");

  const openSimple = () => {
    SheetManager.show("simple-sheet", {
      title: "Pick an option",
      options: [
        { label: "First option", value: "first" },
        { label: "Second option", value: "second" },
        { label: "Third option", value: "third" },
      ],
      onSelect: (value: string | number) => setResult(`simple-sheet: ${value}`),
    });
  };

  const openShowcase = () => {
    SheetManager.show("showcase-sheet", {
      title: "Gorhom bottom sheet",
      description:
        "Drag the handle, change snap point, scroll the list, focus the input, and close from the button or the backdrop.",
    });
    setResult("showcase-sheet opened");
  };

  return (
    <ShowcaseFrame
      title="Gorhom bottom sheets"
      subtitle="The global provider is mounted at the root and renders the sheets above the app content."
    >
      <DemoCard title="Open">
        <PrimaryButton onPress={openShowcase}>
          Open showcase sheet
        </PrimaryButton>

        <SecondaryButton onPress={openSimple}>
          Open simple sheet
        </SecondaryButton>
      </DemoCard>

      <DemoCard title="Controls">
        <SecondaryButton
          onPress={() => {
            SheetManager.snapToIndex("showcase-sheet", 1);
            setResult("snapToIndex(1)");
          }}
        >
          Snap showcase to 65%
        </SecondaryButton>

        <SecondaryButton
          onPress={() => {
            SheetManager.hide("showcase-sheet");
            setResult("showcase-sheet hidden");
          }}
        >
          Close showcase sheet
        </SecondaryButton>

        <Txt style={{ color: theme.colors.textSupporting }}>
          Last action: {result}
        </Txt>
      </DemoCard>

      <DemoCard title="Checklist">
        <Txt style={{ color: theme.colors.textSupporting }}>
          Open: the sheet must appear above the screen and the tab bar.
        </Txt>
        <Txt style={{ color: theme.colors.textSupporting }}>
          Drag down or tap the backdrop to close; repeat open/close quickly.
        </Txt>
        <Txt style={{ color: theme.colors.textSupporting }}>
          Snap 30/65/95, scroll the rows, focus the input, then close with the
          keyboard open.
        </Txt>
      </DemoCard>
    </ShowcaseFrame>
  );
}
