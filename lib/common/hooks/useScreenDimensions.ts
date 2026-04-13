import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

interface ScreenDimensions {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
  min: number;
  max: number;
}

export const useScreenDimensions = (): ScreenDimensions => {
  const [screen, setScreen] = useState<ScreenDimensions>(() => {
    const { width, height, scale, fontScale } = Dimensions.get('window');
    return {
      width,
      height,
      scale,
      fontScale,
      min: Math.min(width, height),
      max: Math.max(width, height),
    };
  });

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      const { width, height, scale, fontScale } = window;
      setScreen({
        width,
        height,
        scale,
        fontScale,
        min: Math.min(width, height),
        max: Math.max(width, height),
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return screen;
};