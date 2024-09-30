/* eslint-disable prettier/prettier */
import { IconBold } from "@utils/IconRegular";
import { images } from "@utils/Images";
import { Box, Image, TouchableBox } from "@utils/Theme";
import React from "react";

export default () => {
  return (
    <Box
      marginTop="xxl"
      marginBottom="xxl"
      justifyContent={"space-between"}
      alignItems="center"
      flexDirection={"row"}
      marginHorizontal="xxl"
    >
      <Image
        source={images.logo.source}
        height={100 * images.logo.aspectRatio}
        width={100}
      />
      <TouchableBox>
        <IconBold name="menu" size={27} color="primary" />
      </TouchableBox>
    </Box>
  );
};
