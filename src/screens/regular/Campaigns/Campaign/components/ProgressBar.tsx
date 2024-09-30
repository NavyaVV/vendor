import { Box, Text } from "@utils/Theme";
import React from "react";

import RNProgressBar from "react-native-tooltip-progress-bar";

interface itemProp {
  progress: number;
}

export default ({ progress }: itemProp) => {
  return (
    <Box paddingHorizontal="xl">
      <Box
        alignItems="center"
        borderWidth={1}
        borderColor="borderColor01"
        marginTop="ml"
        borderRadius="x3l"
        width="100%"
      >
        <Box
          flexDirection="row"
          justifyContent={"space-between"}
          alignItems="center"
          marginVertical="l"
          marginHorizontal="xxl"
        >
          <Box height={10} width={"100%"} style={{ marginTop: -10 }}>
            <RNProgressBar
              options={{ leftColor: "#4385f0", rightColor: "#aac0e3" }}
              showTooltip={false}
              low={0}
              high={100}
              value={progress}
            />
          </Box>
          <Text variant="medium10" marginStart="s">
            {`${progress}%`}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
