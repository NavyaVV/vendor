import { Box, Text } from "@utils/Theme";
import React, { useMemo } from "react";

const errorBoxHeight = 15;

interface errorMessageProps {
  errorMessage?: Array<string> | string | null;
}

export default ({ errorMessage }: errorMessageProps) => {
  const error = useMemo(() => {
    if (typeof errorMessage === "string") return errorMessage;
    if (errorMessage?.length) return errorMessage[0];
    return "";
  }, [errorMessage]);

  return (
    <Box height={errorBoxHeight} marginTop="_s">
      <Text variant="regular12" color="textColorRed2" paddingHorizontal="m">
        {error}
      </Text>
    </Box>
  );
};
