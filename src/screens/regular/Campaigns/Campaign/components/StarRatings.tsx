import { IconBold } from "@utils/IconRegular";
import { Box, useTheme } from "@utils/Theme";
import React from "react";

export const Rating5 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={80}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />
    </Box>
  );
};
export const Rating4 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={80}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />
    </Box>
  );
};
export const Rating3 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={80}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />
    </Box>
  );
};
export const Rating2 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={80}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />
    </Box>
  );
};
export const Rating1 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={80}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.l} color="boxColor03" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />

      <IconBold name="star" size={iconSize.l} color="boxColor16" />
    </Box>
  );
};
export const Rating0 = () => {
  const { iconSize } = useTheme();

  return (
    <Box
      flexDirection="row"
      height={20}
      width={150}
      alignItems="center"
      marginVertical="m"
      justifyContent="space-evenly"
    >
      <IconBold name="star" size={iconSize.x3l} color="boxColor16" />

      <IconBold name="star" size={iconSize.x3l} color="boxColor16" />

      <IconBold name="star" size={iconSize.x3l} color="boxColor16" />
      <IconBold name="star" size={iconSize.x3l} color="boxColor16" />

      <IconBold name="star" size={iconSize.x3l} color="boxColor16" />
    </Box>
  );
};
