import { IconBold } from "@utils/IconRegular";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
interface functionProp {
  onPressAddNewField?(): void;
}

export default ({ onPressAddNewField }: functionProp) => {
  return (
    <TouchableBox
      borderWidth={1}
      borderStyle="dashed"
      borderColor="boxColor28"
      height={52}
      backgroundColor="boxColor27"
      padding="l"
      borderRadius="l"
      marginVertical="xl"
      onPress={onPressAddNewField}
    >
      <Box flexDirection="row" alignItems="center">
        <IconBold name="addCircle" size={16} color="primary" />
        <TrText variant="regular14" marginLeft="xxl" color="primary">
          ADD NEW FIELD
        </TrText>
      </Box>
    </TouchableBox>
  );
};
