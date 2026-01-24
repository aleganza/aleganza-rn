import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ScreenDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export const useScreenDimensions = (): ScreenDimensions => {
  const [screen, setScreen] = useState<ScreenDimensions>({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    scale: Dimensions.get('window').scale,
    fontScale: Dimensions.get('window').fontScale,
  });

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setScreen({
        width: window.width,
        height: window.height,
        scale: window.scale,
        fontScale: window.fontScale,
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      // Expo >= 46 usa subscription.remove()
      subscription.remove();
    };
  }, []);

  return screen;
};
