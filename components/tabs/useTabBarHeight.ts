import { useTabBarHeightStore } from "@/lib/layout/tabBar";
import { useBottomTabBarHeight } from "expo-router/js-tabs";
import { useEffect } from "react";

export const useRegisterTabBarHeight = () => {
  const height = useBottomTabBarHeight();
  const setHeight = useTabBarHeightStore((state) => state.setHeight);

  useEffect(() => {
    setHeight(height);
  }, [height, setHeight]);

  return height;
};
