import { Box } from "@utils/Theme";
import { TextInputProps } from "react-native";
import React from "react";
import Search from "./Search";
import Filter from "./Filter";
import { SEARCHBAR_HEIGHT } from "@utils/dimensions";

interface searchFilterProps extends TextInputProps {
  onFilter?: () => void;
}

export default (props: searchFilterProps) => (
  <Box
    width="100%"
    height={SEARCHBAR_HEIGHT}
    paddingHorizontal="m"
    flexDirection="row"
    marginTop="m"
  >
    <Search {...props} />
    <Filter onFilter={props.onFilter} />
  </Box>
);
