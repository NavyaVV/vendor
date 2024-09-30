import { Box, Image, Text, TrText } from "@utils/Theme";
import React from "react";
import { Modal } from "react-native";
import CustomButton2 from "./CustomButton2";

export default ({ close }) => {
  return (
    <Modal transparent={true} onRequestClose={close}>
      <Box flex={1}>
        <Box flex={1} />
        <Box
          flex={1.5}
          marginHorizontal="xxl"
          backgroundColor="secondary"
          paddingVertical="x2l"
          alignItems="center"
          borderRadius="l"
          elevation={10}
        >
          <Image
            source={require("@assets/images/cat.png")}
            height={100}
            width={100}
          />
          <TrText marginBottom="xl">CAMPAIGN CREATED</TrText>
          <Text marginBottom="m">
            woohooo! Congratulations!!! You have unlocked
          </Text>
          <Text>Upto 250 off on your next campaign</Text>
          <CustomButton2 />
        </Box>
        <Box flex={1} />
      </Box>
    </Modal>
  );
};
