import { normalize } from "@utils/dimensions";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";

const Data = ["OVERVIEW", "PROGRESS", "CAMPAIGN RESULT", "PAYMENT", "ACTIVITY"];

interface selectionProps {
  selected?: string;
  setSelected?: any;
}

export default ({ selected, setSelected }: selectionProps) => {
  return (
    <Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Data.map((item, i) => (
          <TouchableBox
            key={i.toString()}
            alignItems="center"
            onPress={() => setSelected(item)}
            width={normalize(120)}
            borderBottomWidth={1}
            borderColor="borderColor01"
            paddingBottom="ml"
            paddingTop="xl"
            marginBottom="s"
          >
            <TrText color={selected === item ? "primary" : "borderColor02"}>
              {item}
            </TrText>
            <Box
              borderWidth={2}
              borderColor={selected === item ? "primary" : "glass"}
              width={normalize(100)}
              borderRadius="l"
              position="absolute"
              bottom={-2}
            />
          </TouchableBox>
        ))}
      </ScrollView>
    </Box>
  );
};
