import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import {
  Box,
  Image,
  KeyboardAvoidingBox,
  TouchableBox,
  TrText,
} from "@utils/Theme";
import React, { useCallback, useState } from "react";
import { login, setError } from "@store/reducers/auth";
import { getErrors, getLoading } from "@store/selector/auth";
import { loginValidation } from "@helpers/auth";
import { loginParams } from "@typings/auth";
import { Keyboard, ScrollView } from "react-native";

export default () => {
  const errors = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const [visible, setVisible] = useState(true);
  const [loginData, setLoginData] = useState<loginParams>({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();

  const handleForgotPassword = () => navigate(ROUTES.FORGOTPASSWORD);

  const handleContact = () => navigate(ROUTES.CONTACT);

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss();
    const validation = loginValidation(loginData);
    dispatch(setError(validation.errorMsg));

    if (!validation.status) dispatch(login(loginData));
  }, [dispatch, loginData]);

  const handleTextChange = (value: string, text: string) => {
    const existingErrors = typeof errors === "object" ? errors : {};
    dispatch(setError({ ...existingErrors, [value]: null }));
    dispatch(setError(null));
    setLoginData({ ...loginData, [value]: text });
  };

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
            <CustomTextInput
              maxLength={30}
              placeholder="Email"
              label="EMAIL"
              iconLeftName="mail"
              keyboardType="email-address"
              secureTextEntry={false}
              value={loginData.email}
              onChangeText={(text) => handleTextChange("email", text)}
              errorMessage={errors?.email}
            />
            <CustomTextInput
              maxLength={30}
              placeholder="Password"
              label="PASSWORD"
              keyboardType="name-phone-pad"
              value={loginData.password}
              secureTextEntry={visible}
              iconLeftName="lock"
              iconRightName={visible === true ? "show" : "hide"}
              onPressIcon={() => setVisible(!visible)}
              onChangeText={(text) => handleTextChange("password", text)}
              errorMessage={errors?.password}
            />
            <TouchableBox
              alignItems="flex-end"
              marginBottom="xxl"
              onPress={handleForgotPassword}
            >
              <TrText variant="regular14" color="textColor08">
                FORGOT PASSWORD
              </TrText>
            </TouchableBox>
            <CustomButton
              disabled={!loginData.email || !loginData.password}
              label="LOGIN"
              onPress={handleSubmit}
              loading={loading === "pending"}
            />
            <Box
              alignItems="center"
              backgroundColor="boxColor07"
              marginTop="x3l"
            >
              <TouchableBox
                onPress={handleContact}
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
