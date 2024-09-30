import CustomButton from "@components/CustomButton";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { normalize, WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import { Box, Image, TouchableBox, TrText } from "@utils/Theme";
import React from "react";
import { Linking } from "react-native";

export default () => {
  const handleLogin = () => navigate(ROUTES.PHONELOGIN);

  return (
    <Box flex={1} backgroundColor="secondary">
      <Image
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        width={WIDTH}
        position="absolute"
        bottom={0}
      />
      <Box
        flex={normalize(4)}
        alignItems="center"
        justifyContent="center"
        marginTop="x5l"
      >
        <Image
          height={125 * images.logo.aspectRatio}
          source={images.logo.source}
          width={125}
        />
      </Box>
      <Box flex={6} paddingHorizontal="xl" paddingVertical="_x3l">
        <TrText variant="semibold20" marginBottom="ml" color="textColor01">
          CONTACT HEADING
        </TrText>
        <TrText marginBottom="xl" color="textColor16">
          CONTACT OUR ADMIN TEXT DEMO
        </TrText>
        <CustomButton
          label="CONTACT US"
          disabled={false}
          onPress={() => Linking.openURL(`tel:${7558065982}`)}
        />
        <Box
          alignItems="center"
          marginTop="xl"
          flexDirection="row"
          justifyContent="center"
        >
          <TrText color="textColor16">OR WRITE TO US</TrText>
          <TouchableBox
            onPress={() => Linking.openURL("mailto:contact@salefox.com")}
          >
            <TrText color="textColor16">CONTACT SALEFOX COM</TrText>
          </TouchableBox>
        </Box>
      </Box>
      <Box flex={normalize(4)} alignItems="center" justifyContent="center">
        <TouchableBox
          onPress={handleLogin}
          position="absolute"
          bottom={50}
          zIndex={1}
        >
          <TrText fontSize={13} color="primary">
            BACK TO LOGIN
          </TrText>
        </TouchableBox>
      </Box>
    </Box>
  );
};
