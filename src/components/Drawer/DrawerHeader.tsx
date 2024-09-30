import { Box, Image, Text } from "@utils/Theme";
import React from "react";

const uri = "https://unsplash.com/photos/VOQkzFIkF0Y/download?force=true&w=640";

export default () => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      marginBottom="xx3l"
      marginTop="x3l"
      paddingLeft="x3l"
    >
      <Box
        height={84}
        width={84}
        borderRadius="x4l"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          height={78}
          width={78}
          marginRight="xxl"
          borderWidth={4}
          borderColor="boxColor28"
          alignItems="center"
          justifyContent="center"
          borderRadius="x4l"
          overflow="hidden"
        >
          <Image source={{ uri }} height={78} width={78} />
        </Box>
      </Box>
      <Box>
        <Text variant="medium18" color="textColor09">
          Cake Hut
        </Text>
        <Text variant="light11" color="textColor09">
          cakehut@gmail.com
        </Text>
      </Box>
    </Box>
  );
};
