import { Txt } from '@/components/ui/texts';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, Pressable, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

// react-native
export const AniSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
export const AniPressable = Animated.createAnimatedComponent(Pressable);
export const AniTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
export const AniFlatList = Animated.createAnimatedComponent(FlatList);

// custom
export const AniView = Animated.View;
export const AniImage = Animated.Image;
export const AniTxt = Animated.createAnimatedComponent(Txt);

// libs
export const AniBlurView = Animated.createAnimatedComponent(BlurView);
export const AniLinearGradient = Animated.createAnimatedComponent(LinearGradient);
