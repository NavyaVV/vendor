import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { Box, Image, Text, TrText } from "@utils/Theme";
import React from "react";
import { Modal } from "react-native";
import CustomDoubleButton from "./CustomDoubleButton";

interface optionProps {
  close: () => void;
  visible: boolean;
}

export default ({ close, visible }: optionProps) => {
  return (
    <Modal transparent={true} onRequestClose={close} visible={visible}>
      <Box
        flex={1}
        backgroundColor="boxColorTransparent"
        justifyContent="center"
      >
        <Box
          marginHorizontal="xxl"
          backgroundColor="secondary"
          paddingVertical="x2l"
          alignItems="center"
          borderRadius="l"
          paddingHorizontal="x3l"
          shadowColor="textColor01"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={10}
        >
          <Image
            source={require("@assets/images/cat.png")}
            height={100}
            width={100}
          />
          <TrText variant="medium18" color="textColor01" marginBottom="xl">
            CAMPAIGN CREATED
          </TrText>
          <Text
            variant="regular12"
            color="textColor01"
            textAlign="center"
            marginBottom="m"
            lineHeight={20}
          >
            wohooo! Congratulations!!! You have unlocked Upto 250 off on your
            next campaign
          </Text>
          <CustomDoubleButton
            primaryButton={"MAY BE LATER"}
            secondaryButton={"TAKE A LOOK"}
            onPressPrimary={() => {
              close();
              navigate(ROUTES.CAMPAIGNS);
            }}
            onPressSecondary={() => {
              close();
              navigate(ROUTES.CAMPAIGNS);
            }}
          />
        </Box>
      </Box>
    </Modal>
  );
};
