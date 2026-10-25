import { ChoiceGrid, ChoiceGridItem } from "@/components/app/choice-grid";
import { DemoCard, ShowcaseFrame } from "@/components/showcase";
import { PrimaryButton } from "@/components/ui/buttons";
import { Txt } from "@/components/ui/texts";
import { useTheme } from "@/lib/theme/useTheme";
import React, { useState } from "react";

const items: ChoiceGridItem[] = [
  { key: "monthly", label: "Monthly", description: "Cancel anytime" },
  { key: "yearly", label: "Yearly", description: "Save 20%" },
  { key: "lifetime", label: "Lifetime", description: "One payment" },
  { key: "trial", label: "Trial", description: "7 days", disabled: true },
];

export default function ChoiceGridShowcase() {
  const { theme } = useTheme();
  const [selectedKey, setSelectedKey] = useState<string | null>("monthly");
  const [secondSelectedKey, setSecondSelectedKey] = useState<string | null>(
    "yearly",
  );

  return (
    <ShowcaseFrame
      title="Choice grid"
      subtitle="Two columns, single selection, and pressing the selected card deselects it."
    >
      <DemoCard title="Subscription">
        <ChoiceGrid
          items={items}
          selectedKey={selectedKey}
          onSelect={setSelectedKey}
        />

        <Txt style={{ color: theme.colors.textSupporting }}>
          Selected: {selectedKey ?? "none"}
        </Txt>

        <PrimaryButton onPress={() => setSelectedKey(null)}>
          Clear selection
        </PrimaryButton>
      </DemoCard>

      <DemoCard title="Independent selection">
        <ChoiceGrid
          items={items}
          selectedKey={secondSelectedKey}
          onSelect={setSecondSelectedKey}
        />

        <Txt style={{ color: theme.colors.textSupporting }}>
          Selected: {secondSelectedKey ?? "none"}
        </Txt>
      </DemoCard>
    </ShowcaseFrame>
  );
}
