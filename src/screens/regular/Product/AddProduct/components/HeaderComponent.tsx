import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box, TouchableBox, TrText, useTheme } from "@utils/Theme";
import React from "react";

interface functionProp {
  iconLeftName?: IconTypes;
  iconRightName?: IconTypes;
  headerText: string;
}

export default ({ iconLeftName, iconRightName, headerText }: functionProp) => {
  const { iconSize } = useTheme();

  return (
    <Box height={80} backgroundColor="borderColor01" justifyContent="center">
      <Box
        marginHorizontal="xxl"
        marginVertical="xxl"
        justifyContent="space-between"
        alignItems="center"
        flexDirection="row"
      >
        {iconLeftName && (
          <TouchableBox>
            <IconBold name={iconLeftName} size={iconSize.xxl} color="primary" />
          </TouchableBox>
        )}
        <TrText variant="regular17" marginStart="xxl">
          {headerText}
        </TrText>
        {iconRightName && (
          <TouchableBox>
            <IconBold
              name={iconRightName}
              size={iconSize.xxl}
              color="primary"
            />
          </TouchableBox>
        )}
      </Box>
    </Box>
  );
};
