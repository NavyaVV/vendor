import CustomButton from "@components/CustomButton";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import {
  Box,
  Image,
  KeyboardAvoidingBox,
  TouchableBox,
  TrText,
} from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";

export default () => {
  return (
    <KeyboardAvoidingBox
      flex={1}
      behavior="padding"
      backgroundColor="secondary"
    >
      <Image
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        width={WIDTH}
        position="absolute"
        bottom={0}
      />
      <ScrollView keyboardShouldPersistTaps="always">
        <Box marginTop="x5l">
          <Box alignItems="center" justifyContent="center">
            <Image
              source={images.logo.source}
              height={125 * images.logo.aspectRatio}
              width={125}
            />
          </Box>
          <Box marginHorizontal="xl" marginTop="x4l">
            <TrText variant="semibold25" marginBottom="ml" color="textColor01">
              LOGIN
            </TrText>
            <TrText variant="light14" marginBottom="xl" color="textColor01">
              LOGIN_QUOTE
            </TrText>
            <CustomButton
              label="LOGIN WITH EMAIL"
              onPress={() => navigate(ROUTES.EMAILLOGIN)}
            />
            <CustomButton
              label="LOGIN WITH PHONE"
              onPress={() => navigate(ROUTES.PHONELOGIN)}
            />
            <Box
              alignItems="center"
              backgroundColor="boxColor07"
              marginTop="x3l"
            >
              <TouchableBox
                onPress={() => navigate(ROUTES.CONTACT)}
                position="absolute"
                bottom={0}
                zIndex={1}
              >
                <TrText variant="regular13" color="textColor08">
                  HAVING TROUBLE LOGGING IN
                </TrText>
              </TouchableBox>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingBox>
  );
};
