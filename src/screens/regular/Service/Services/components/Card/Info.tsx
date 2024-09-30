import { Text } from "@utils/Theme";
import React from "react";

interface infoProps {
  label: string;
  content?: string | number;
}

export default ({ content, label }: infoProps) => (
  <Text variant="regular10" marginTop="s">
    {label} : {content}
  </Text>
);
