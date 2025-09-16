import { FC } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  isLoading?: boolean;
  onPress: VoidFunction;
  cta: string;
}

const CustomButton: FC<Props> = ({ isLoading, onPress, cta }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
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
