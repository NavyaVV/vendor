import React from "react";
import { Box, Text, Theme, TouchableBox, TrText } from "@utils/Theme";
import { IconBold } from "@utils/IconRegular";
import { IconTypes } from "@typings/IconTypes";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";

export interface menuItemProps {
  name: string;
  iconName: IconTypes;
  count: number | null;
  color: keyof Theme["colors"];
  iconColor: keyof Theme["colors"];
  navigationPath: ROUTES | null;
}

interface menuProps {
  index: number;
  item: menuItemProps;
}

export default ({ item }: menuProps) => (
  <Box justifyContent="center" alignItems="center">
    <TouchableBox
      height={65}
      justifyContent="center"
      alignItems="center"
      width={65}
      borderRadius="x4l"
      backgroundColor={item.color}
      onPress={() => {
        item.navigationPath !== null && navigate(item.navigationPath);
      }}
    >
      {item.count && (
        <Box
          height={19}
          width={19}
          justifyContent="center"
          alignItems="center"
          borderRadius="xxl"
          backgroundColor="boxColor02"
          position="absolute"
          right={0}
          top={0}
        >
          <Text variant="medium8">{item.count}</Text>
        </Box>
      )}
      <IconBold name={item.iconName} size="25" color={item.iconColor} />
    </TouchableBox>
    <TrText variant="medium13" color="textColor02" marginTop="m">
      {item.name}
    </TrText>
  </Box>
);
