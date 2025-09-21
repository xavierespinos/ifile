import { FC } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Text,
} from "react-native";

interface CustomInputProps extends TextInputProps {
  style?: ViewStyle;
  label?: string;
}

const CustomInput: FC<CustomInputProps> = ({ style, label, ...props }) => {
  return (
    <>
      {label && <Text style={{ marginBottom: 8 }}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#999"
        {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
});

export default CustomInput;
