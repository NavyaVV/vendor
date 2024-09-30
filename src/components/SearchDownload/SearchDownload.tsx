import { Box } from "@utils/Theme";
import { TextInputProps } from "react-native";
import React from "react";
import { SEARCHBAR_HEIGHT } from "@utils/dimensions";
import Download from "./Download";
import SearchBar from "./SearchBar";

interface SearchDownloadProps extends TextInputProps {
  onDownload?: () => void;
}

export default (props: SearchDownloadProps) => (
  <Box
    width="100%"
    height={SEARCHBAR_HEIGHT}
    paddingHorizontal="ml"
    flexDirection="row"
    marginTop="l"
  >
    <SearchBar {...props} />
    <Download onDownload={props.onDownload} />
  </Box>
);
