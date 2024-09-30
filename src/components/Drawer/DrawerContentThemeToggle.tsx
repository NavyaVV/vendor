import React, { useState } from "react";
import { IconBold } from "@utils/IconRegular";
import { Box, TouchableBox } from "@utils/Theme";

export default () => {
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Box
      height={17}
      width={35}
      borderRadius="xxl"
      marginRight="xl"
      backgroundColor="secondary"
      justifyContent="center"
      alignItems={isDarkMode ? "flex-end" : "flex-start"}
    >
      <TouchableBox
        height={20}
        width={20}
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
        onPress={() => {
          setDarkMode(!isDarkMode);
        }}
      >
        <IconBold
          name={isDarkMode ? "darkTheme" : "lightTheme"}
          size={12}
          color="primary"
        />
      </TouchableBox>
    </Box>
  );
};
