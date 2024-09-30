/* eslint-disable prettier/prettier */
import { IconBold } from "@utils/IconRegular";
import { Box, Theme, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

interface optionProps {
  Title: string;
  Message: string;
  action?: string;
  mTop?: keyof Theme["spacing"];
  mBottom?: keyof Theme["spacing"];
}

export default ({ Title, Message, action, mTop, mBottom }: optionProps) => {
  return (
    <Box marginTop="xxl" marginBottom="_s">
      {Title === "INFO" && (
        <TrText marginBottom="ml" variant="medium12" color="textColor07">
          ADD PHOTO
        </TrText>
      )}
      <Box
        padding="xl"
        height={149}
        borderRadius="l"
        backgroundColor="boxColor35"
        marginTop={mTop}
        marginBottom={mBottom}
      >
        <Box flexDirection="row" alignItems="center">
          <IconBold name="info" size={20} color="primary" />
          <TrText marginLeft="l" variant="medium13" color="primary">
            {Title}
          </TrText>
        </Box>
        <TrText variant="light11" marginTop="ml" color="primary">
          {Message}
        </TrText>
        {action !== undefined && (
          <TouchableBox flexDirection="row" alignItems="center" marginTop="x2l">
            <TrText variant="medium12" marginRight="s" color="primary">
              {action}
            </TrText>
            <IconBold name="rightArrow" size={18} color="primary" />
          </TouchableBox>
        )}
      </Box>
    </Box>
  );
};
