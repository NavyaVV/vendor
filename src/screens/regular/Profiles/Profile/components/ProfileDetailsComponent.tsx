import { Box, Text } from "@utils/Theme";
import React from "react";

interface ProductProp {
  label: string | undefined;
  content: string | undefined;
}
export const ProfileDetails = ({ label, content }: ProductProp) => {
  return (
    <Box marginVertical="l">
      <Box marginStart="xl" width={125}>
        <Text variant="regular12" marginVertical="m" color="textColor06">
          {label}
        </Text>
        <Text variant="regular12" color="textColor11">
          {content}
        </Text>
      </Box>
    </Box>
  );
};
