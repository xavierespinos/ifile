import { FC } from "react";
import { Pressable, Text, StyleSheet, ViewProps } from "react-native";
import LoadingSpinner from "./LoadingSpinner";
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from "constants/theme";

interface Props extends ViewProps {
  isLoading?: boolean;
  onPress: VoidFunction;
  cta: string;
}

const CustomButton: FC<Props> = ({ isLoading, onPress, cta, style }) => {
  return (
    <Pressable
      onPress={isLoading ? null : onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Text style={styles.buttonText}>{cta}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.PRIMARY,
    padding: UNIT.LG,
    borderRadius: BORDER_RADIUS.MD,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: COLORS.PRIMARY_DARK,
    opacity: 0.8,
  },
  buttonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.BOLD,
  },
});

export default CustomButton;
