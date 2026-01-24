import { useTheme } from "@/lib/theme/useTheme";
import { Image } from "expo-image";
import { LucideIcon } from "lucide-react-native";
import { ColorValue, View } from "react-native";
import { Txt } from "../ui/texts";

const HubItemLabel: React.FC<{
  label: string;
  Icon?: LucideIcon;
  imageUri?: string;
  labelColor?: ColorValue;
}> = ({ label, Icon, imageUri, labelColor }) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        // marginRight: 10,
        alignSelf: "center",
        flexDirection: "row",
        gap: theme.spacing.sm,
      }}
    >
      {Icon && (
        <Icon
          style={{ alignSelf: "center" }}
          color={labelColor ?? theme.colors.textMuted}
          size={theme.iconSize.sm}
        />
      )}

      {imageUri && !Icon && (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 50,
            height: 50,
            borderRadius: theme.borderRadius.full,
            backgroundColor: theme.colors.background,
          }}
        />
      )}

      <Txt
        style={{
          alignSelf: "center",
          color: labelColor ?? theme.colors.textSupporting,
          fontSize: theme.fontSize.base,
          fontFamily: theme.family.default.medium,
        }}
        numberOfLines={0}
      >
        {label}
      </Txt>
    </View>
  );
};

export default HubItemLabel;
