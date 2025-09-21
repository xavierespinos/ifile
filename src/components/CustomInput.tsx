import React from "react";
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
import { COLORS, UNIT, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT } from "constants/theme";

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
    marginBottom: UNIT.LG,
  },
  label: {
    marginBottom: UNIT.SM,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.TEXT_PRIMARY,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_SECONDARY,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: UNIT.LG,
    paddingVertical: UNIT.MD,
    fontSize: FONT_SIZE.MD,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    color: COLORS.TEXT_PRIMARY,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: FONT_SIZE.XS,
    marginTop: UNIT.XS,
  },
});

export default CustomInput;
