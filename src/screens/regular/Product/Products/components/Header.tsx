import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, useTheme } from "@utils/Theme";
import React from "react";

type headerTypes = "grid" | "list";
interface ClickProp {
  numberOfProducts: number | undefined;
  selected: headerTypes;
  onChange: (change: headerTypes) => void;
}
export default ({ selected, onChange, numberOfProducts }: ClickProp) => {
  const { iconSize } = useTheme();

  return (
    <Box
      height={40}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      marginStart="ml"
      width="100%"
      marginBottom="m"
    >
      <Box marginStart="s">
        <Text variant="semibold14">{numberOfProducts} items</Text>
      </Box>
      <Box flexDirection="row" marginEnd="xl">
        <TouchableBox
          onPress={() => onChange("list")}
          height={40}
          borderWidth={1}
          paddingHorizontal="m"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
          borderColor="borderColor01"
          width={40}
          backgroundColor="secondary"
        >
          <IconBold
            name="listView"
            color={selected === "list" ? "primary" : "boxColor17"}
            size={iconSize.xl}
          />
        </TouchableBox>
        <TouchableBox
          onPress={() => onChange("grid")}
          height={40}
          borderWidth={1}
          paddingHorizontal="m"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
          borderColor="borderColor01"
          width={40}
          marginStart="s"
          backgroundColor="secondary"
        >
          <IconBold
            name="gridView"
            color={selected === "grid" ? "primary" : "boxColor17"}
            size={iconSize.xl}
          />
        </TouchableBox>
      </Box>
    </Box>
  );
};
