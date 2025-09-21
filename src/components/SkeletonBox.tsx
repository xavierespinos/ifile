import { useEffect } from "react";
import { ViewStyle, DimensionValue } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface SkeletonBoxProps {
  width: DimensionValue;
  height: number;
  style?: ViewStyle | ViewStyle[];
}

const SkeletonBox = ({ width, height, style }: SkeletonBoxProps) => {
  const animatedValue = useSharedValue(0);

  useEffect(() => {
    animatedValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animatedValue.value, [0, 1], [0.3, 1]);
    return {
      opacity,
      width,
      height,
      backgroundColor: "#e8e8e8",
      borderRadius: 4,
    };
  });

  return <Animated.View style={[animatedStyle, style]} />;
};

export default SkeletonBox;
