import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

interface selectionTypeProp {
  selectedIndex: number;
  data: Array<string>;
  onSelect: (key: number) => void;
  label?: string;
}

export default ({
  label,
  selectedIndex,
  onSelect,
  data,
}: selectionTypeProp) => {
  return (
    <Box>
      <TrText
        marginBottom="xl"
        variant="regular12"
        color="textColor05"
      >
        {label ?? ""}
      </TrText>
      <Box flexDirection="row" marginBottom="xl">
        {data.map((name, i) => {
          const backgroundColor = selectedIndex === i ? "primary" : "secondary";
          return (
            <TouchableBox
              onPress={() => onSelect(i)}
              flexDirection="row"
              alignItems="center"
              marginRight="x3l"
              key={i.toString()}
            >
              <Box
                width={18}
                height={18}
                borderWidth={1}
                borderColor="boxColor06"
                backgroundColor={backgroundColor}
                borderRadius="l"
                justifyContent="center"
                alignItems="center"
                marginRight="m"
              >
                <Box
                  width={10}
                  height={10}
                  backgroundColor={"secondary"}
                  borderRadius="l"
                />
              </Box>
              <TrText variant="regular12" color="textColor14">
                {name.toUpperCase()}
              </TrText>
            </TouchableBox>
          );
        })}
      </Box>
    </Box>
  );
};
