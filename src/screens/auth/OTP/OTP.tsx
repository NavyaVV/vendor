import CustomButton from "@components/CustomButton";
import { images } from "@utils/Images";
import { Box, Image, Text, TouchableBox, TrText, useTheme } from "@utils/Theme";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { WIDTH } from "@utils/dimensions";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { login, setError, verifyOtp } from "@store/reducers/auth";
import { getErrors, getLoading } from "@store/selector/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@typings/Navigation";
import { ROUTES } from "@config/routes";
import moment from "moment";
import { getTimeDifference } from "@helpers/auth";
import OtpInput from "./components/OtpInput";

export default ({
  route,
}: NativeStackScreenProps<AuthStackParamList, ROUTES.OTP>) => {
  const { colors } = useTheme();
  const errors = useAppSelector(getErrors);
  const loader = useAppSelector(getLoading);
  const [timerEnd, setTimerEnd] = useState(moment().add(30, "seconds"));
  const [resend, setResend] = useState(false);
  const [value, setValue] = useState("");
  const [timer, setTimer] = useState("0");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!moment().isAfter(timerEnd)) setTimer(getTimeDifference(timerEnd));
      else {
        setTimer("0");
        clearInterval(interval);
        ``;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, timerEnd]);

  const resendOtp = () => {
    setResend(true);
    const callback = () => {
      setResend(false);
      setTimerEnd(moment().add(30, "seconds"));
    };
    dispatch(login({ username: route.params.username, callback }));
  };

  const handleVerify = useCallback(() => {
    dispatch(verifyOtp({ otp: value }));
  }, [value]);

  const handleTextChange = (text:string) => {
    dispatch(setError(null))
    setValue(text)
  }

  return (
    <Box flex={1} backgroundColor="secondary">
      <Image
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        width={WIDTH}
        position="absolute"
        bottom={0}
      />
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={images.logo.source}
          height={125 * images.logo.aspectRatio}
          width={125}
        />
      </Box>
      <Box flex={2} paddingHorizontal="xxl">
        <TrText variant="semibold20" marginBottom="ml" color="textColor01">
          OTP VERIFICATION
        </TrText>
        <TrText color="textColor16">ENTER THE OTP</TrText>
        <OtpInput handleTextChange={handleTextChange} errorMessage={errors?.otp} />
        <Box alignItems="center" marginTop="x3l" justifyContent="center">
          <CustomButton
            label="VERIFY"
            disabled={value.length < 6}
            loading={loader === "pending" && !resend}
            onPress={handleVerify}
          />
          <Box flexDirection="row" marginTop="l">
            <TrText variant="light14" color="textColor16">
              DIDNT RECEIVE THE VERIFICATION CODE
            </TrText>
            <TouchableBox
              marginLeft="xs"
              onPress={resendOtp}
              disabled={resend || parseInt(timer, 10) > 0}
            >
              {resend ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : parseInt(timer, 10) > 0 ? (
                <Text variant="regular14" color="primary">
                  {timer}
                </Text>
              ) : (
                <TrText variant="regular14" color="primary">
                  RESEND AGAIN
                </TrText>
              )}
            </TouchableBox>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
