import { TouchableBox, TrText, useTheme } from "@utils/Theme";
import React from "react";
import { ActivityIndicator } from "react-native";
interface OptionProps {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
}
export default ({
  label,
  onPress,
  disabled,
  loading,
  variant,
}: OptionProps) => {
  const { colors } = useTheme();

  return (
    <TouchableBox
      height={45}
      width="100%"
      marginVertical="xxl"
      justifyContent="center"
      alignItems="center"
      borderRadius="m"
      backgroundColor={variant === "secondary" ? "borderColor02" : "primary"}
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator color={colors.secondary} />
      ) : (
        <TrText
          variant="medium13"
          color={variant === "secondary" ? "primary" : "textColor09"}
        >
          {label}
        </TrText>
      )}
    </TouchableBox>
  );
};
