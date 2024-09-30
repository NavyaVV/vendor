import { IconTypes } from "@typings/IconTypes";
import { IconBold } from "@utils/IconRegular";
import { Box } from "@utils/Theme";
import React from "react";
import { StyleSheet } from "react-native";

interface placeholderIconProps {
  icon: IconTypes;
  size: number;
}

export default ({ icon, size }: placeholderIconProps) => (
  <Box
    alignItems="center"
    justifyContent="center"
    backgroundColor="headerColor"
    style={[StyleSheet.absoluteFillObject, { borderRadius: size * 2 }]}
  >
    <IconBold name={icon} size={size} color="primary" />
  </Box>
);
