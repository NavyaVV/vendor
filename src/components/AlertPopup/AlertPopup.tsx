import { normalize } from "@utils/dimensions";
import {
  AnimatedBox,
  Box,
  Image,
  Text,
  TouchableBox,
  TrText,
} from "@utils/Theme";
import React from "react";
import { Modal } from "react-native";
import { Layout, SlideInDown, SlideOutDown } from "react-native-reanimated";
import attributes from "./attributes";

type confirmationTypes = "Delete" | "Success" | "Error";

interface popupProp {
  visible?: boolean;
  type: confirmationTypes;
  onConfirm?: () => void;
  onClose?: () => void;
  body?: string;
}

export default ({ type, visible, onConfirm, onClose, body }: popupProp) => {
  const { color, image, title } = attributes[type];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Box
        flex={1}
        padding="xx3l"
        backgroundColor="boxColorTransparent"
        justifyContent="center"
        alignItems="center"
      >
        <AnimatedBox
          width="100%"
          marginHorizontal="l"
          paddingVertical="l"
          backgroundColor="secondary"
          borderRadius="x3l"
          layout={Layout.duration(200)}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <Image
            source={image.source}
            height={80}
            width={80}
            marginTop="x4l"
            alignSelf="center"
          />
          <TrText
            variant="regular17"
            paddingHorizontal="xxx3l"
            textAlign="center"
            marginTop="m"
            color={color}
          >
            {title}
          </TrText>
          {body && (
            <Text
              variant="light13"
              marginTop="ml"
              textAlign="center"
              paddingHorizontal="xxxx3l"
            >
              {body}
            </Text>
          )}
          <Box
            width="100%"
            marginVertical="xx3l"
            flexDirection="row"
            justifyContent="center"
          >
            {/* <TouchableBox
              width={normalize(120)}
              height={normalize(45)}
              backgroundColor="headerColor"
              justifyContent="center"
              alignItems="center"
              borderRadius="l"
              onPress={onClose}>
              <TrText variant="medium13" color="primary">
                CANCEL
              </TrText>
            </TouchableBox> */}
            <TouchableBox
              width={normalize(200)}
              height={normalize(45)}
              backgroundColor="primary"
              justifyContent="center"
              alignItems="center"
              borderRadius="l"
              marginStart="m"
              onPress={onConfirm}
            >
              <TrText variant="medium13" color="secondary">
                OK
              </TrText>
            </TouchableBox>
          </Box>
        </AnimatedBox>
      </Box>
    </Modal>
  );
};
