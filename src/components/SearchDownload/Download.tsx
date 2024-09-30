import { IconBold } from "@utils/IconRegular";
import { TouchableBox, useTheme } from "@utils/Theme";
import React from "react";

interface DownloadProps {
  onDownload?: () => void;
}

export default ({ onDownload }: DownloadProps) => {
  const { iconSize } = useTheme();

  return (
    <TouchableBox
      width={40}
      height={40}
      borderWidth={1}
      marginStart="m"
      borderRadius="m"
      alignItems="center"
      paddingHorizontal="m"
      justifyContent="center"
      borderColor="borderColor01"
      backgroundColor="secondary"
      onPress={onDownload}
    >
      <IconBold name="download" color="primary" size={iconSize.xl} />
    </TouchableBox>
  );
};
