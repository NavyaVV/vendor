import { WIDTH } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { Box, TextInput, TouchableBox, TrText } from "@utils/Theme";
import React from "react";

interface counterButtonProps {
  count: number;
  onChange: (count: number) => void;
}

export default ({ count, onChange }: counterButtonProps) => {
  return (
    <Box>
      <TrText variant={"regular12"} marginBottom="m" color="textColor05">
        PRODUCT COUNT
      </TrText>
      <Box
        borderWidth={1}
        borderColor="borderColor01"
        paddingHorizontal="xl"
        height={52}
        flexDirection="row"
        justifyContent="space-between"
        width={WIDTH / 2.5}
        alignItems="center"
        borderRadius="m"
      >
        <TextInput
          value={count.toString()}
          keyboardType="number-pad"
          variant="regular12"
          color="textColor01"
          onChangeText={(text) =>
            onChange(parseInt(text.length ? text : "0", 10))
          }
          inputMode="numeric"
          style={{ maxWidth: "50%" }}
        />
        <Box flexDirection="row">
          <TouchableBox
            onPress={() => onChange(count - 1)}
            backgroundColor="boxColor33"
            disabled={count === 0 && true}
            justifyContent="center"
            alignItems="center"
            borderRadius="m"
            padding="m"
            marginRight="m"
            height={32}
            width={32}
          >
            <IconBold name="minus" size={11} color="primary" />
          </TouchableBox>
          <TouchableBox
            onPress={() => onChange(count + 1)}
            backgroundColor="boxColor33"
            justifyContent="center"
            alignItems="center"
            height={32}
            width={32}
            borderRadius="m"
            padding="m"
          >
            <IconBold name="plus" size={11} color="primary" />
          </TouchableBox>
        </Box>
      </Box>
    </Box>
  );
};
