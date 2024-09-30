import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import PasswordResetPopup from "@components/PasswordResetPopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { forgotPasswordValidation, sendOtp } from "@helpers/auth";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setError } from "@store/reducers/auth";
import { getErrors } from "@store/selector/auth";
import { WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import { Box, Image, TrText } from "@utils/Theme";
import React, { useCallback, useState } from "react";

export default () => {
  const errors = useAppSelector(getErrors);
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleOTP = () => {
    setShowPopup(false);
    navigate(ROUTES.OTP);
  };

  const handleChangeText = (text: string) => {
    setEmail(text);
    dispatch(setError(null));
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    const validation = forgotPasswordValidation({ email });
    dispatch(setError(validation.errorMsg));
    if (!validation.status) {
      const otp = await sendOtp(email);
      if (otp.status === "success") setShowPopup(true);
    }
    setLoading(false);
  }, [dispatch, email]);

  return (
    <Box flex={1} backgroundColor="secondary">
      <Image
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        width={WIDTH}
        position="absolute"
        bottom={0}
      />
      <Box flex={1} justifyContent="center" alignItems="center">
        <Image
          source={images.logo.source}
          height={125 * images.logo.aspectRatio}
          width={125}
        />
      </Box>
      <Box flex={2} marginHorizontal="xl">
        <TrText variant="semibold20" marginBottom="ml" color="textColor01">
          FORGOT PASSWORD
        </TrText>
        <TrText marginBottom="xl" color="textColor16">
          FORGOT PASSWORD QUOTE
        </TrText>
        <CustomTextInput
          placeholder="Email address"
          onChangeText={handleChangeText}
          label="EMAIL"
          maxLength={30}
          keyboardType="email-address"
          secureTextEntry={false}
          iconLeftName="mail"
          errorMessage={errors?.email}
        />
        <Box marginTop="m">
          <CustomButton
            label="SUBMIT"
            disabled={!email?.length}
            onPress={handleSubmit}
            loading={loading}
          />
        </Box>
      </Box>
      <PasswordResetPopup
        email={email}
        visible={showPopup}
        onPress={handleOTP}
        onClose={() => setShowPopup(false)}
      />
    </Box>
  );
};
