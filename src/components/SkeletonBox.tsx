import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface SkeletonBoxProps {
  width: number | string;
  height: number;
  style?: any;
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
    };
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          backgroundColor: "#e8e8e8",
          borderRadius: 4,
        },
        style,
        animatedStyle,
      ]}
    />
  );
};

export default SkeletonBox;