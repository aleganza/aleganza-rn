import { Frame } from "@/components/ui/frame/frame";
import { H1, H4 } from "@/components/ui/headings";
import { FRAME_MARGIN } from "@/lib/config";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

export default function IndexTabScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Frame
      scrollable
      useSafeArea
      showHeader
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      <View style={{ paddingHorizontal: FRAME_MARGIN }}>
        <H1 text="Video Player" />
      </View>
    </Frame>
  );
}
