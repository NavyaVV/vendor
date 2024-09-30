import { IconBold } from "@utils/IconRegular";
import { TouchableBox, useTheme } from "@utils/Theme";
import React from "react";

interface filterProps {
  onFilter?: () => void;
}

export default ({ onFilter }: filterProps) => {
  const { iconSize } = useTheme();

  return (
    <TouchableBox
      width={40}
      height={40}
      borderWidth={1}
      marginStart="m"
      borderRadius="m"
      alignItems="center"
      paddingHorizontal="m"
      justifyContent="center"
      borderColor="borderColor01"
      backgroundColor="boxColor27"
      onPress={onFilter}
    >
      <IconBold name="filter" color="primary" size={iconSize.xl} />
    </TouchableBox>
  );
};
