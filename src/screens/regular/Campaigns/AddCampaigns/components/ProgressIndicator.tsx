import { Box, Text } from "@utils/Theme";
import React from "react";

interface prgressProps {
  serialNo1: number;
  serialNo2: number;
  serialNo3: number;
  serialNo4: number;
  setBg: number;
}
export default ({
  serialNo1,
  serialNo2,
  serialNo3,
  serialNo4,
  setBg,
}: prgressProps) => {
  const bgColor = setBg;
  const TextCircle = ({ serialNo, bgColor, TextColor, borderColor }) => {
    return (
      <Box flexDirection="row" alignItems="center">
        <Box
          height={27}
          width={27}
          backgroundColor={bgColor}
          borderRadius="x4l"
          justifyContent="center"
          alignItems="center"
        >
          <Text variant={"medium12"} color={TextColor}>
            {0}
            {serialNo}
          </Text>
        </Box>
        {serialNo < 4 && (
          <Box borderTopWidth={4} borderColor={borderColor} width={60}></Box>
        )}
      </Box>
    );
  };
  return (
    <Box marginTop="xx3l" marginBottom="xl" alignItems="center">
      <Box
        flexDirection="row"
        justifyContent="space-between"
        position="relative"
        bottom={16}
      >
        <TextCircle
          serialNo={serialNo1}
          bgColor={bgColor > 0 ? "primary" : "borderColor01"}
          TextColor={bgColor > 0 ? "textColor09" : "primary"}
          borderColor={bgColor > 1 ? "primary" : "borderColor01"}
        />
        <TextCircle
          serialNo={serialNo2}
          bgColor={bgColor > 1 ? "primary" : "borderColor01"}
          TextColor={bgColor > 1 ? "textColor09" : "primary"}
          borderColor={bgColor > 2 ? "primary" : "borderColor01"}
        />
        <TextCircle
          serialNo={serialNo3}
          bgColor={bgColor > 2 ? "primary" : "borderColor01"}
          TextColor={bgColor > 2 ? "textColor09" : "primary"}
          borderColor={bgColor > 3 ? "primary" : "borderColor01"}
        />
        <TextCircle
          serialNo={serialNo4}
          bgColor={bgColor > 3 ? "primary" : "borderColor01"}
          TextColor={bgColor > 3 ? "textColor09" : "primary"}
        />
      </Box>
    </Box>
  );
};
