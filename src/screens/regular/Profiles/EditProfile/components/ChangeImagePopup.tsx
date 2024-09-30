import CustomButton from "@components/CustomButton";
import { Box, Text } from "@utils/Theme";
import React from "react";
import { Modal } from "react-native";
import SelectImageInputType from "./SelectImageInputType";

interface imageProps {
  onCamera?: () => void;
  onLibrary?: () => void;
  onCancel?: () => void;
  visible?: boolean;
  close: () => void;
}

export default ({ onCamera, onLibrary, visible, close }: imageProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      statusBarTranslucent
      onRequestClose={close}
    >
      <Box
        flex={1}
        backgroundColor="boxColorTransparent"
        justifyContent="flex-end"
      >
        <Box
          backgroundColor="secondary"
          borderTopStartRadius="x3l"
          borderTopEndRadius="x3l"
        >
          <Box
            borderTopStartRadius="x3l"
            borderTopEndRadius="x3l"
            borderBottomWidth={1}
            borderColor="borderColor01"
            padding="x3l"
          >
            <Text variant="regular14" color="iconRose">
              Update Image
            </Text>
          </Box>
          <SelectImageInputType
            content="TAKE PHOTO"
            onSelect={onCamera}
            iconName="camera"
          />
          <Box borderWidth={0.25} width="100%" borderColor="borderColor01" />
          <SelectImageInputType
            content="FROM LIBRARY"
            onSelect={onLibrary}
            iconName="imageUpload"
          />
          <Box paddingHorizontal="x3l" paddingVertical="xl">
            <CustomButton label="CANCEL" onPress={close} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
