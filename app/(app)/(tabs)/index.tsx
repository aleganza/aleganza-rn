import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { Frame } from "@/components/ui/frame/frame";
import { H1, H4 } from "@/components/ui/headings";
import { Input } from "@/components/ui/input";
import Spacer from "@/components/ui/spacer";
import { Txt } from "@/components/ui/texts";
import { FRAME_MARGIN } from "@/lib/config";
import { Theme } from "@/lib/theme/types";
import { useTheme } from "@/lib/theme/useTheme";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

export default function IndexTabScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { setTheme, activeThemeName } = useTheme();

  const handleSwitchTheme = (themeName: Theme) => {
    setTheme(themeName);
  };

  return (
    <Frame
      scrollable
      useSafeArea
      showHeader
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      <View style={{ paddingHorizontal: FRAME_MARGIN }}>
        <H1 text="Home" />

        <Spacer />

        <Txt>ciao</Txt>

        <Spacer />

        <Input clearable />

        <Spacer />

        <PrimaryButton
          onPress={() => {
            handleSwitchTheme("system");
          }}
        >
          Set system theme
        </PrimaryButton>

        <Spacer />

        <PrimaryButton
          onPress={() => {
            handleSwitchTheme("dark");
          }}
        >
          Set dark theme
        </PrimaryButton>

        <Spacer />

        <PrimaryButton
          onPress={() => {
            handleSwitchTheme("light");
          }}
        >
          Set light theme
        </PrimaryButton>

        <Spacer />

        <SecondaryButton onPress={() => {}}>Premi</SecondaryButton>
      </View>
    </Frame>
  );
}
