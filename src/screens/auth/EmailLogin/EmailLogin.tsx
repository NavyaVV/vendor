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
import { ScrollView } from "react-native";

export default () => {
  const errors = useAppSelector(getErrors);
  const loading = useAppSelector(getLoading);
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

  const handleContact = () => navigate(ROUTES.CONTACT);

  const handleSubmit = useCallback(() => {
    const validation = loginValidation({ email });
    dispatch(setError(validation.errorMsg));

    if (!validation.status) dispatch(login({ email }));
  }, [dispatch, email]);

  const handleTextChange = (text: string) => {
    const existingErrors = typeof errors === "object" ? errors : {};
    dispatch(setError({ ...existingErrors, email: null }));
    setEmail(text);
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
              value={email}
              label="EMAIL"
              maxLength={30}
              autoFocus={true}
              placeholder="Email"
              iconLeftName="mail"
              secureTextEntry={false}
              keyboardType="email-address"
              onChangeText={handleTextChange}
              errorMessage={errors?.email}
            />
            <CustomButton
              disabled={!email?.length}
              label="GET OTP"
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
