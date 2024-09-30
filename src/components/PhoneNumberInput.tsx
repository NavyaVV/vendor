import { Box, TextInput, TrText, useTheme } from "@utils/Theme";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet, TextInputProps } from "react-native";
import { normalize } from "@utils/dimensions";
import ErrorMessage from "./ErrorMessage";

const phoneCode = [
  { label: "+91", value: "+91" },
  { label: "+33", value: "+33" },
  { label: "+92", value: "+92" },
  { label: "+94", value: "+94" },
];

interface dropDownProps extends TextInputProps {
  label?: string;
  errorMessage?: Array<string> | string | null;
}

export default ({
  label,
  errorMessage,
  onChangeText,
  ...props
}: dropDownProps) => {
  const { colors, spacing } = useTheme();
  const [code, setCode] = useState(phoneCode[0].value);

  const styles = StyleSheet.create({
    dropdownstyle: {
      height: 45,
      borderRadius: spacing.m,
      paddingHorizontal: 15,
      width: normalize(80),
    },
    textStyle: { color: colors.textColor11, fontSize: 13 },
    constainerstyle: { top: -28, backgroundColor: colors.secondary },
    valueStyle: { color: colors.textColor11 },
    textInputStyle: { flex: 1 },
  });

  return (
    <>
      <Box flexDirection="row" marginTop="m" alignItems="center">
        <TrText variant="regular12" marginBottom="s" color="textColor05">
          {label ?? ""}
        </TrText>
      </Box>
      <Box
        borderWidth={1}
        borderColor="borderColor01"
        borderRadius="m"
        alignItems="center"
        flexDirection="row"
        height={52}
        flex={1}
      >
        <Dropdown
          value={code}
          data={phoneCode}
          maxHeight={300}
          labelField="label"
          valueField="value"
          dropdownPosition="bottom"
          iconColor={colors.primary}
          style={styles.dropdownstyle}
          itemTextStyle={styles.valueStyle}
          selectedTextStyle={styles.textStyle}
          containerStyle={styles.constainerstyle}
          onChange={(item) => setCode(item.value)}
        />
        <Box
          borderWidth={1}
          height="60%"
          borderColor="borderColor01"
          marginRight="ml"
        />
        <TextInput
          {...props}
          style={styles.textInputStyle}
          onChangeText={(text) => onChangeText && onChangeText(text)}
        />
      </Box>
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};
