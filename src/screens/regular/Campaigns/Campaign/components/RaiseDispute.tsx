import CustomButton from "@components/CustomButton";
import Dropdown from "@components/Dropdown";
import TextArea from "@components/TextArea";
import { normalize } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { selectReasonData } from "@utils/ServicesDummyData";
import { AnimatedBox, Box, TouchableBox, TrText } from "@utils/Theme";
import React, { useState } from "react";
import { Modal } from "react-native";
import { Layout, SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Rating0 } from "./StarRatings";

interface popupProp {
  visible?: boolean;

  onConfirm?: () => void;
  onClose?: () => void;
  onSubmit?: () => void;
}

export default ({ visible, onSubmit, onClose }: popupProp) => {
  const [reason, setReason] = useState("others");

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
        backgroundColor="boxColorTransparent"
        justifyContent="flex-end"
        alignItems="center"
      >
        <AnimatedBox
          flex={0.6}
          width="100%"
          marginHorizontal="l"
          paddingVertical="l"
          backgroundColor="secondary"
          borderTopLeftRadius="x3l"
          borderTopRightRadius="x3l"
          layout={Layout.duration(200)}
          entering={SlideInDown}
          exiting={SlideOutDown}
        >
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop="xl"
          >
            <TrText
              variant="regular17"
              paddingHorizontal="xxx3l"
              color="primary"
            >
              RAISE A DISPUTE
            </TrText>
            <TouchableBox
              onPress={onClose}
              backgroundColor="borderColor01"
              width={normalize(25)}
              height={normalize(25)}
              alignItems="center"
              justifyContent="center"
              borderRadius="x5l"
              marginEnd="_x3l"
            >
              <IconBold name="close" size={10} color="primary" />
            </TouchableBox>
          </Box>
          <Box height={1} backgroundColor="borderColor01" marginTop="x3l"></Box>
          <Box marginVertical="l" marginHorizontal="xl">
            <Dropdown
              bg="boxColor22"
              value={reason}
              setCategory={setReason}
              label="REASON"
              dropdownData={selectReasonData}
            />
            <Box marginVertical="l">
              <TextArea label="WRITE YOUR COMMENTS" mHeight={150} />
            </Box>

            <Box
              width="100%"
              marginVertical="s"
              flexDirection="row"
              justifyContent="center"
            >
              <CustomButton label="SUBMIT" onPress={onSubmit} />
            </Box>
          </Box>
        </AnimatedBox>
      </Box>
    </Modal>
  );
};
