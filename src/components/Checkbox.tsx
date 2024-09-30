import { Box, Text, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { IconBold } from "@utils/IconRegular";

interface selectionTypeProp {
  data: any;
  onDelete: any;
  onSelect: (key: number) => void;
  label?: string;
}

export default ({ label, onSelect, data, onDelete }: selectionTypeProp) => {
  return (
    <Box>
      <TrText marginBottom="xl" variant="regular12" color="textColor05">
        {label ?? ""}
      </TrText>
      {data.map(({ field_name, is_required, is_default }, i) => {
        const backgroundColor = is_required ? "primary" : "secondary";
        return (
          <Box
            flexDirection="row"
            marginTop={is_default ? "xl" : "m"}
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={i.toString()} // Add key prop here
          >
            <Box flexDirection="row">
              <TouchableBox
                onPress={() => onSelect(i)}
                flexDirection="row"
                marginRight="x3l"
                key={i.toString()} // Add key prop here
              >
                <Box
                  width={18}
                  height={18}
                  borderWidth={1}
                  borderColor="boxColor06"
                  backgroundColor={backgroundColor}
                  // borderRadius="l"
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
                <Text variant="regular12" color="textColor14">
                  {field_name}
                </Text>
              </TouchableBox>
            </Box>
            {!is_default && (
              <TouchableBox
                height={36}
                width={36}
                backgroundColor="boxColor22"
                justifyContent="center"
                alignItems="center"
                borderRadius="xl"
                onPress={() => onDelete(i)}
                key={i.toString()} // Add key prop here
              >
                <IconBold name="trash" size={12} color="tabIconInactive" />
              </TouchableBox>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
