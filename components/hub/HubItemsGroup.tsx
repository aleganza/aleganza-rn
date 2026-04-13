import { useTheme } from "@/lib/theme/useTheme";
import { View } from "react-native";

import { Txt } from "../ui/texts";
import HubItemsGroupLabel from "./HubItemsGroupLabel";

const HubItemsGroup: React.FC<{
  label?: string;
  description?: string;
  children: React.ReactNode;
}> = ({ label, description, children }) => {
  const { theme } = useTheme();

  return (
    <View style={{ gap: theme.spacing.sm }}>
      {label && <HubItemsGroupLabel label={label} />}

      <View
        style={{
          width: "100%",
          flexDirection: "column",
          borderRadius: theme.borderRadius.md,
          overflow: "hidden",
        }}
      >
        {children}
      </View>

      {description && (
        <Txt
          style={{
            // marginLeft: 18,
            color: theme.colors.textMuted,
            fontSize: theme.fontSize.sm + 1,
            fontFamily: theme.family.accent.medium,
          }}
        >
          {description}
        </Txt>
      )}
    </View>
  );
};

export default HubItemsGroup;
