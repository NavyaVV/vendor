import CustomButton from "@components/CustomButton";
import Header from "@components/Header";
import SucessPopup from "@components/SucessPopup";
import { Box, Image, Text, TrText } from "@utils/Theme";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";

export default ({ route }) => {
  const [successPopup, setSuccessPopup] = useState(false);
  const amountPayable = route?.params?.value;

  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="PAYMENT" iconName="menu" />

      <SucessPopup
        visible={successPopup}
        close={() => setSuccessPopup(false)}
      />

      <ScrollView>
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginTop="xxxx3l"
            marginBottom="xxx4l"
          >
            <TrText variant="medium15" color="textColor01">
              TOTAL PAYABLE AMOUNT
            </TrText>
            <Text variant="medium18" color="textColor01">
              {amountPayable}
            </Text>
          </Box>
          <Box marginHorizontal="xxl">
            <Box alignItems="center">
              <Image
                source={require("@assets/images/icic.png")}
                height={72}
                width={70}
              />
              <Text variant="semibold20" color="textColor01">
                ICIC Bank
              </Text>
            </Box>
            <CustomTextInput keyboardType="number-pad" />
            <CustomButton
              label="VALIDATE"
              onPress={() => setSuccessPopup(true)}
            />
            <Box alignItems="center">
              <Text variant="medium12" color="textColor01" marginBottom="xx3l">
                OTP will expire in 4:50 Minutes
              </Text>
              <Text variant="regular13">
                You can always complete the transaction on your Bank's
              </Text>
              <Box alignItems="center" flexDirection="row" marginTop="m">
                <Text variant="regular13">website.</Text>
                <Text variant="regular13" color="primary">
                  Redirect to banks page
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box alignItems="center" marginBottom="xxl">
          <TrText variant="medium10">DO NOT CLOSE</TrText>
        </Box>
      </ScrollView>
    </Box>
  );
};
