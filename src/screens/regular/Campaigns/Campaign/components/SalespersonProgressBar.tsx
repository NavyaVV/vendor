import { Box, Text } from "@utils/Theme";
import React from "react";
export default () => {
  return (
    <Box
      alignItems="center"
      borderWidth={1}
      borderColor="borderColor01"
      marginVertical="xl"
      borderRadius="l"
      width="100%"
    >
      <Box
        flexDirection="row"
        alignItems="center"
        marginVertical="l"
        marginHorizontal="m"
      >
        <Box
          height={10}
          width={250}
          backgroundColor="boxColor16"
          borderRadius="m"
        >
          <Box
            height={10}
            width={100}
            backgroundColor="primary"
            borderRadius="m"
          ></Box>
        </Box>
        <Text marginStart="l">22%</Text>
      </Box>
    </Box>
  );
};
