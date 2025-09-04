import React from "react";
import { Text as RNText, TextProps, TextInput as RNTextInput, TextInputProps, StyleSheet } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";

export const Text = ({ style, ...props }: TextProps) => {
  return <RNText style={[globalTextStyles.default, style]} {...props} />;
};

const globalTextStyles = StyleSheet.create({
  default: {
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
});

export const TextInput = ({ style, placeholderTextColor, ...props }: TextInputProps) => {
  return (
    <RNTextInput
      style={[{ fontFamily: "Poppins_500Medium", color: "#000" }, style]}
      placeholderTextColor={placeholderTextColor || "#0000002E"}
      {...props}
    />
  );
};

type PickerProps<T> = React.ComponentProps<typeof RNPicker<T>>;
export const Picker = <T extends string | number>({
  style,
  selectedValue,
  onValueChange,
  children,
  ...props
}: PickerProps<T>) => {
  const isPlaceholder = selectedValue === "" || selectedValue == null;

  return (
    <RNPicker<T>
      selectedValue={selectedValue}
      onValueChange={(itemValue, itemIndex) => {
        onValueChange?.(itemValue, itemIndex);
      }}
      style={[
        {
          fontFamily: "Poppins_400Regular",
          color: isPlaceholder ? "#888" : "#000",
          borderWidth: 1,
          borderColor: "#ddd",
          borderRadius: 8,
        },
        style,
      ]}
      dropdownIconColor="#000"
      {...props}
    >
      {children}
    </RNPicker>
  );
};

Picker.Item = RNPicker.Item;
