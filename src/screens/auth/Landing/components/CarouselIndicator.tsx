import { Box } from "@utils/Theme";
import React from "react";

interface indicatorsProps {
  index: number;
}

export default ({ index }: indicatorsProps) => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Box
        height={7}
        width={7}
        borderRadius="l"
        backgroundColor={index === 0 ? "textColor01" : "boxColor06"}
      />
      <Box
        height={7}
        width={7}
        marginHorizontal="l"
        borderRadius="l"
        backgroundColor={index === 1 ? "textColor01" : "boxColor06"}
      />
      <Box
        height={7}
        width={7}
        borderRadius="l"
        backgroundColor={index === 2 ? "textColor01" : "boxColor06"}
      />
    </Box>
  );
};
