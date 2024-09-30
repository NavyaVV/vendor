/* eslint-disable prettier/prettier */

import CustomTextInput from "@screens/regular/Product/AddProduct/components/CustomTextInput";
import { WIDTH } from "@utils/dimensions";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React, { useState } from "react";
import { FlatList } from "react-native";
import CustomAddButton from "./CustomAddButton";

const listStyle = { justifyContent: "space-between" } as const;
const list = ["200", "500", "1000", "2000"];

export default () => {
  const [amount, setAmount] = useState("2000");

  const card = ({ item }: { item: string }) => {
    return (
      <TouchableBox
        borderColor="borderColor02"
        backgroundColor={amount === item ? "boxColor20" : "secondary"}
        onPress={() => setAmount(item)}
        borderWidth={1}
        padding="m"
        height={32}
        width={WIDTH / 5}
        borderRadius="m"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="regular10" color="textColor08">
          {"+"} {item}
        </Text>
      </TouchableBox>
    );
  };

  return (
    <Box marginHorizontal="xxl" marginVertical="xxl">
      <CustomTextInput
        value={amount}
        label="ADD MONEY TO WALLET"
        onChangeText={setAmount}
      />
      <FlatList
        horizontal
        data={list}
        renderItem={card}
        contentContainerStyle={listStyle}
      />
      <CustomAddButton label="Proceed to add ₹" money={amount} />
    </Box>
  );
};
