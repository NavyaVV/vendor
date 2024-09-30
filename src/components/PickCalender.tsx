import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React from "react";

interface calenderProps {
  onPress: () => void;
  date?: string;
}

export default ({ onPress, date }: calenderProps) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      height={52}
      padding="l"
      borderRadius="m"
      borderWidth={1}
      borderColor="borderColor01"
      paddingVertical="s"
      justifyContent="space-between"
    >
      <Text variant={"regular12"} color="textColor01">
        {date}
      </Text>
      <TouchableBox onPress={onPress}>
        <IconBold name="calender" size={15} color="primary" />
      </TouchableBox>
    </Box>
  );
};
