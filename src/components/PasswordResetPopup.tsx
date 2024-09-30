import { Box, Image, TrText } from "@utils/Theme";
import React from "react";
import { Modal } from "react-native";
import CustomButton from "./CustomButton";

interface PopupProp {
  email: string;
  visible: boolean;
  onPress?: () => void;
  onClose?: () => void;
}

export default ({ visible, onClose, onPress }: PopupProp) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Box backgroundColor="boxColorTransparent" flex={1}>
        <Box flex={1} />
        <Box
          flex={2.5}
          justifyContent="center"
          marginHorizontal="xl"
          paddingVertical="l"
          backgroundColor="boxColor31"
          borderRadius="x3l"
          elevation={5}
        >
          <Box alignItems="center" marginHorizontal="xxl">
            <Image source={require("@assets/images/success.png")} />
            <TrText variant="regular19" marginTop="xl" color="textColor01">
              PASSWORD RESET
            </TrText>
            <TrText textAlign="center" marginTop="x2l" color="textColor16">
              PASSWORD RESET QUOTE 1
            </TrText>
            <TrText
              textAlign="center"
              marginTop="x2l"
              color="textColor16"
              marginBottom="x2l"
            >
              PASSWORD RESET QUOTE 2
            </TrText>
            <CustomButton label="OK" onPress={onPress} />
          </Box>
        </Box>
        <Box flex={1} />
      </Box>
    </Modal>
  );
};
