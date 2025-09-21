import { FC } from "react";
import { Pressable, Text, StyleSheet, ViewProps } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

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
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPressed: {
    backgroundColor: "#0056CC",
    opacity: 0.8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
