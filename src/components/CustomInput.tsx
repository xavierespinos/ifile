import { FC } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Text,
  View,
} from "react-native";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

interface BaseInputProps
  extends Omit<TextInputProps, "value" | "onChangeText" | "onBlur"> {
  style?: ViewStyle;
  label?: string;
}

interface ControlledInputProps<T extends FieldValues> extends BaseInputProps {
  control: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
}

const CustomInput = <T extends FieldValues>({
  control,
  name,
  rules,
  style,
  label,
  ...props
}: ControlledInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {label && <Text style={styles.label}>{label}</Text>}
          <TextInput
            style={[styles.input, style]}
            placeholderTextColor="#999"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...props}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
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
  errorText: {
    color: "#ff4444",
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;
