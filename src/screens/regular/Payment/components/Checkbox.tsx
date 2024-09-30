import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface checkBoxProps {
  label: string;
  value: boolean;
  onPress?(): void;
  valueOfLabel?: string | number;
}

export default ({ label, value, onPress, valueOfLabel }: checkBoxProps) => {
  return (
    <Box
      flexDirection={"row"}
      alignItems="center"
      marginTop="x2l"
      marginBottom="xxxl"
    >
      <TouchableBox
        onPress={onPress}
        borderRadius="s"
        borderColor={"borderColor01"}
        width={16}
        height={16}
        borderWidth={1}
        backgroundColor={"secondary"}
        marginRight="m"
      >
        {value === true && (
          <IconBold
            name="tick"
            color="primary"
            size={23}
            style={{ bottom: 4, end: 4 }}
          />
        )}
      </TouchableBox>
      <Box flexDirection="row">
        <Text>{label}</Text>
        {valueOfLabel && <Text color="primary"> ₹ {valueOfLabel}</Text>}
      </Box>
    </Box>
  );
};
