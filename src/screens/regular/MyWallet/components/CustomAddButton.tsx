import { Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface OptionProps {
  label: string;
  opacity?: number;
  disabled?: boolean;
  money?: string;
  onPress?: () => void;
}

export default ({ label, onPress, disabled, money }: OptionProps) => {
  return (
    <TouchableBox
      height={45}
      width="100%"
      marginTop="xxl"
      justifyContent="center"
      alignItems="center"
      borderRadius="m"
      backgroundColor="primary"
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onPress={onPress}
      flexDirection={"row"}
    >
      <Text variant="medium13" color="textColor09">
        {label}
      </Text>
      <Text variant="medium13" color="textColor09">
        {money}
      </Text>
    </TouchableBox>
  );
};
