import { images } from "@utils/Images";
import { Box, Image, TrText } from "@utils/Theme";
import React from "react";

export default () => (
  <Box flex={2} alignItems="center">
    <Image
      source={images.catImage.source}
      height={166 * images.catImage.aspectRatio}
      width={166}
      position="absolute"
      top={180}
    />
    <Box position="absolute" alignItems="center" bottom={300}>
      <TrText variant="semibold20" color="textColor01">
        ITS LONELY
      </TrText>
      <TrText variant="regular12" color="textColorAsh03">
        ADD SOME ITEMS TO
      </TrText>
    </Box>
  </Box>
);
