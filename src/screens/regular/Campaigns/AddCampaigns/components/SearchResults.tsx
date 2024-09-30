import { IconBold } from "@utils/IconRegular";
import { Box, Text, TrText } from "@utils/Theme";
import React from "react";
export default () => {
  return (
    <Box flex={1} marginTop={"xxxx3l"} marginBottom="xxx4l">
      <TrText marginBottom="l" variant="regular12">
        SEARCH RESULTS
      </TrText>
      <Box flexDirection="row" justifyContent={"space-between"}>
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box
            height={60}
            width={60}
            justifyContent="center"
            alignItems="center"
            backgroundColor="primary"
            borderRadius="x4l"
            marginRight={"ml"}
          >
            <IconBold name="shop" size={22} color="secondary" />
          </Box>
          <Box>
            <Text variant="bold21" color="boxColor24">
              254
            </Text>
            <TrText variant="regular12" color="textColor11">
              SHOPS
            </TrText>
          </Box>
        </Box>
        <Box flex={1} flexDirection="row" alignItems="center">
          <Box
            height={60}
            width={60}
            justifyContent="center"
            alignItems="center"
            backgroundColor="boxColor23"
            borderRadius="x4l"
            marginRight={"ml"}
          >
            <IconBold name="salePersonGroup" size={22} color="secondary" />
          </Box>
          <Box>
            <Text variant="bold21" color="boxColor23">
              254
            </Text>
            <TrText variant="regular12" color="textColor11">
              SALEPERSONS
            </TrText>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
