import { Box, Image, Text, TouchableBox } from "@utils/Theme";
import React from "react";

export default ({ item }: any) => {
  return (
    <TouchableBox
      width="100%"
      marginVertical="m"
      flexDirection="row"
      borderRadius="l"
      alignItems="center"
      paddingVertical="xxl"
      backgroundColor="boxColor22"
      borderColor="borderColor01"
      borderWidth={1}
    >
      <Image
        source={{ uri: item.uri }}
        borderRadius="x4l"
        marginLeft="xl"
        height={60}
        width={60}
      />
      <Box marginStart="xl">
        <Text variant="medium15" color="textColorGrey">
          {item.Name}
        </Text>
        <Text variant="regular10" color="textColorGrey" marginVertical="s">
          {item.CampaignStatus}
        </Text>
        <Text variant="regular10" color="textColorGrey">
          {item.Date}
        </Text>
      </Box>
    </TouchableBox>
  );
};
