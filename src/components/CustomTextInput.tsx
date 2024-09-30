import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import {
  Box,
  Text,
  TextInput,
  TouchableBox,
  TrText,
  useTheme,
} from "@utils/Theme";
import React from "react";
import { TextInputProps } from "react-native";
import ErrorMessage from "./ErrorMessage";

const inputStyle = { flex: 1 };

interface OptionProps extends TextInputProps {
  label: string;
  mandatory?: boolean;
  onPressIcon?: () => void;
  iconLeftName?: IconTypes;
  iconRightName?: IconTypes;
  placeHolder?: string;
  errorMessage?: Array<string> | string | null;
}

export default ({
  label,
  onPressIcon,
  iconLeftName,
  iconRightName,
  placeHolder,
  mandatory,
  errorMessage,
  ...props
}: OptionProps) => {
  const { spacing } = useTheme();

  return (
    <Box marginTop="m">
      <Box flexDirection="row">
        <TrText variant="regular12" marginBottom="s" color="textColor05">
          {label}
        </TrText>
        {mandatory === true && <Text color="textColor03"> *</Text>}
      </Box>
      <Box
        height={52}
        borderWidth={1}
        flexDirection="row"
        paddingHorizontal="xl"
        borderRadius="m"
        justifyContent="center"
        alignItems="center"
        borderColor="borderColor01"
      >
        {iconLeftName && (
          <IconBold
            style={{ marginRight: spacing.xss }}
            name={iconLeftName}
            color="primary"
            size={16}
          />
        )}
        <TextInput
          {...props}
          style={inputStyle}
          returnKeyType="done"
          placeholder={placeHolder}
          autoCapitalize="none"
        />
        {iconRightName && (
          <TouchableBox onPress={onPressIcon}>
            <IconBold name={iconRightName} color="primary" size={20} />
          </TouchableBox>
        )}
      </Box>
      <ErrorMessage errorMessage={errorMessage} />
    </Box>
  );
};
