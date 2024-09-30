import CustomButton from "@components/CustomButton";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setAlert } from "@store/reducers/common";
import { getAlert } from "@store/selector/common";
import { images } from "@utils/Images";
import { AnimatedBox, Box, Image, Text } from "@utils/Theme";
import { WIDTH } from "@utils/dimensions";
import React from "react";
import { Modal } from "react-native";
//import { Layout } from "react-native-reanimated";

export default () => {
  const alert = useAppSelector(getAlert);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(setAlert(null));
  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!alert?.alert}
      onRequestClose={handleClose}
    >
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="boxColorTransparent"
      >
        <AnimatedBox
          width={WIDTH * 0.8}
          backgroundColor="secondary"
          borderRadius="m"
          padding="l"
         // onLayout={Layout.duration(200)}
       //   entering={SlideInDown}
        //  exiting={SlideOutDown}
        >
          {alert?.success && (
            <Image
              source={images.successGreen.source}
              height={80}
              width={80}
              marginTop="x4l"
              alignSelf="center"
            />
          )}
          {alert?.title && (
            <Text
              variant="bold21"
              color="textColor01"
              textAlign="center"
              marginVertical="l"
            >
              {alert?.title}
            </Text>
          )}
          <Text
            marginVertical="m"
            marginTop={alert?.alert ? "m" : "l"}
            textAlign="center"
          >
            {alert?.message ? alert.message : "An error occured"}
          </Text>
          <CustomButton label="OK" onPress={handleClose} />
        </AnimatedBox>
      </Box>
    </Modal>
  );
};
