import { Box, Text } from "@utils/Theme";
import React from "react";

interface ProductProp {
  label: string;
  content: string | number | undefined | null;
}

export default ({ label, content }: ProductProp) => {
  return (
    <Box marginVertical="l">
      <Text variant="regular12" marginVertical="m" color="textColor06">
        {label}
      </Text>
      <Text variant="regular13">{content}</Text>
    </Box>
  );
};
