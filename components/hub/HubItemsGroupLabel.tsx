import { useTheme } from "@/lib/theme/useTheme";

import { Txt } from "../ui/texts";

const HubItemsGroupLabel = ({ label }: { label: string }) => {
  const { theme } = useTheme();

  return (
    <Txt
      style={{
        // marginLeft: 18,
        color: theme.colors.textMuted,
        fontSize: theme.fontSize.sm,
        fontFamily: theme.family.accent.semi_bold,
        textTransform: "uppercase",
      }}
    >
      {label}
    </Txt>
  );
};

export default HubItemsGroupLabel;
