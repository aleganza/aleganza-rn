import { useTheme } from "@/lib/theme/useTheme";
import { Href, router } from "expo-router";
import { ChevronRight, Link, LucideIcon } from "lucide-react-native";
import {
  ActivityIndicator,
  ColorValue,
  Switch,
  TouchableHighlight,
  View,
} from "react-native";

import { Txt } from "../ui/texts";
import HubItemLabel from "./HubItemLabel";

const HubItem: React.FC<{
  /**
   * the label to display to the left of the item
   */
  label: string;
  /**
   * custom label & icon color
   */
  labelColor?: ColorValue;
  /**
   * Icon or Image to show near the label
   * Icon and imageUri are exclusive.
   * of both of them are passed, Icon
   * will be used
   */
  Icon?: LucideIcon;
  imageUri?: string;
  /**
   * isPremium, text, route, action, link, toggle, select and slider are exclusive.
   * if more than one is passed, the higher in this list
   * will be used
   *
   * textColor will work only if text is used
   */
  text?: string;
  textColor?: ColorValue;
  route?: Href;
  action?: (...args: any) => void;
  link?: string;
  toggle?: {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
  };
  customRight?: React.ReactNode;
  isLoading?: boolean;
}> = ({
  label,
  labelColor,
  Icon,
  imageUri,
  text,
  textColor,
  route,
  action,
  link,
  toggle,
  customRight,
  isLoading,
}) => {
  const { theme } = useTheme();

  const handleRoute = () => {
    if (route) router.push(route);
  };

  const handleAction = () => {
    if (action) action();
  };

  const handleLink = async () => {}; // TODO:

  const pressable = route || action || link;

  return (
    <TouchableHighlight
      onPress={() => {
        if (route) handleRoute();
        else if (action) handleAction();
        else if (link) handleLink();
      }}
      underlayColor={theme.colors.mist}
      disabled={!pressable}
      style={{
        width: "100%",
        paddingHorizontal: theme.spacing.base,
        // paddingTop: 0,
        // paddingBottom: 0,
        backgroundColor: theme.colors.foreground,
      }}
    >
      <View>
        <View
          style={{
            height: imageUri && !Icon ? theme.spacing.unit * 75 : theme.spacing.unit * 45, // TODO: static sizes
            flexDirection: "row",
            alignItems: "center",
            justifyContent: isLoading ? "center" : "space-between",
            flexWrap: "nowrap",
          }}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <>
              <HubItemLabel
                label={label}
                Icon={Icon}
                imageUri={imageUri}
                labelColor={labelColor}
              />

              <View
                style={{
                  flexShrink: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {text ? (
                  <Txt
                    style={{
                      color: textColor ?? theme.colors.textMuted,
                      fontSize: theme.fontSize.base,
                      fontFamily: theme.family.default.medium,
                    }}
                  >
                    {text}
                  </Txt>
                ) : toggle ? (
                  <Switch
                    value={toggle.value}
                    onValueChange={toggle.onChange}
                    trackColor={{
                      false: theme.colors.textMuted,
                      true: theme.colors.primary,
                    }}
                    thumbColor={theme.colors.text}
                    disabled={toggle.disabled}
                  />
                ) : route ? (
                  <ChevronRight
                    size={theme.iconSize.base}
                    strokeWidth={2.5}
                    color={theme.colors.textMuted}
                  />
                ) : action ? (
                  <View />
                ) : link ? (
                  <Link
                    size={theme.iconSize.md}
                    color={theme.colors.textMuted}
                  />
                ) : customRight ? (
                  customRight
                ) : (
                  <></>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default HubItem;
