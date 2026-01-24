import { useTheme } from "@/lib/theme/useTheme";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { CalendarDays, Home, LucideIcon, Map, MessagesSquare, UserRound } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Txt } from "../ui/texts";

const TabBarButton: React.FC<
  { Icon: LucideIcon } & BottomTabBarButtonProps
> = ({
  Icon,
  onPress,
  accessibilityLargeContentTitle,
  "aria-selected": isFocused,
}) => {
  const { theme } = useTheme();

  const color = isFocused ? theme.colors.textSupporting : theme.colors.textMuted;
  const fontFamily = isFocused
    ? theme.family.default.semi_bold
    : theme.family.default.medium;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Icon
          color={color}
          size={theme.iconSize.md}
          strokeWidth={isFocused ? 1.75 : 1.5}
          // fill={isFocused ? color : "transparent"}
          style={{ marginTop: 2 }}
        />
        <Txt
          style={{
            fontFamily,
            marginTop: 2,
            fontSize: theme.fontSize.xs,
            color: color,
          }}
        >
          {accessibilityLargeContentTitle}
        </Txt>
      </View>
    </Pressable>
  );
};

export const TabBarBackground: React.FC<{}> = ({}) => {
  const { theme, activeThemeName } = useTheme();

  return (
    <BlurView
      intensity={40}
      tint={activeThemeName}
      style={{
        backgroundColor: `${theme.colors.foreground.toString()}A9`,
        flex: 1,
      }}
    />
  );
};

export function TabBar() {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        headerBackVisible: false,
        sceneStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarActiveTintColor: theme.colors.primary.toString(),
        tabBarStyle: {
          backgroundColor: "transparent",
          flex: 1,
          position: "absolute",
          overflow: "hidden",
          borderTopWidth: 0,
        },
        tabBarBackground: () => <TabBarBackground />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={(screenProps) => ({
          title: "Home",
          tabBarButton: (buttonProps) => (
            <TabBarButton Icon={Home} {...buttonProps} />
          ),
        })}
      />

      <Tabs.Screen
        name="schedule"
        options={(screenProps) => ({
          title: "Agenda",
          headerShown: false,
          tabBarButton: (buttonProps) => (
            <TabBarButton Icon={CalendarDays} {...buttonProps} />
          ),
        })}
      />

      <Tabs.Screen
        name="discover"
        options={(screenProps) => ({
          title: "Esplora",
          headerShown: false,
          tabBarButton: (buttonProps) => (
            <TabBarButton Icon={Map} {...buttonProps} />
          ),
        })}
      />

      <Tabs.Screen
        name="chat"
        options={(screenProps) => ({
          title: "Chat",
          headerShown: false,
          tabBarButton: (buttonProps) => (
            <TabBarButton Icon={MessagesSquare} {...buttonProps} />
          ),
        })}
      />

      <Tabs.Screen
        name="profile"
        options={(screenProps) => ({
          title: "Profilo",
          tabBarButton: (buttonProps) => (
            <TabBarButton Icon={UserRound} {...buttonProps} />
          ),
        })}
      />
    </Tabs>
  );
}
