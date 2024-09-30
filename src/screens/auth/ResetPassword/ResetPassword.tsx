import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { resetPassword, resetPasswordValidation } from "@helpers/auth";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setError } from "@store/reducers/auth";
import { getErrors } from "@store/selector/auth";
import { AuthStackParamList } from "@typings/Navigation";
import { WIDTH } from "@utils/dimensions";
import { images } from "@utils/Images";
import { Box, Image, TrText } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import { Keyboard } from "react-native";

export default ({
  route,
}: NativeStackScreenProps<AuthStackParamList, ROUTES.RESETPASSWORD>) => {
  const verificationToken = route.params.token;
  const errors = useAppSelector(getErrors);
  const [password, setNewPassword] = useState("");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleVisible = () => setVisible(!visible);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    Keyboard.dismiss();
    const validation = resetPasswordValidation({ password, confirmPassword });
    dispatch(setError(validation.errorMsg));
    if (!validation.status) {
      const res = await resetPassword(password, verificationToken);
      if (res.status === "success") navigate(ROUTES.LOGIN);
    }
    setLoading(false);
  }, [confirmPassword, dispatch, password, verificationToken]);

  const handleTextChange = useCallback(
    (text: string) => {
      dispatch(setError(null));
      setConfirmPassword(text);
    },
    [dispatch]
  );

  return (
    <Box flex={1} backgroundColor="secondary">
      <Image
        source={images.background.source}
        height={WIDTH * images.background.aspectRatio}
        width={WIDTH}
        position="absolute"
        bottom={0}
      />
      <Box flex={1} alignItems="center" justifyContent="center" marginTop="x5l">
        <Image
          source={images.logo.source}
          height={125 * images.logo.aspectRatio}
          width={125}
        />
      </Box>
      <Box flex={6} paddingHorizontal="xl" paddingTop="_x3l">
        <TrText variant="semibold20" marginBottom="ml" color="textColor01">
          RESET PASSWORD
        </TrText>
        <TrText marginBottom="xl" marginTop="xs" color="textColor16">
          RESET PASSWORD QUOTES
        </TrText>
        <CustomTextInput
          maxLength={30}
          secureTextEntry={visible}
          value={password}
          label="NEW PASSWORD"
          placeholder="New Password"
          keyboardType="name-phone-pad"
          iconLeftName="lock"
          iconRightName={visible === true ? "show" : "hide"}
          onChangeText={setNewPassword}
          onPressIcon={handleVisible}
          errorMessage={errors?.password}
        />
        <CustomTextInput
          maxLength={30}
          value={confirmPassword}
          secureTextEntry={visible}
          label="CONFIRM PASSWORD"
          placeholder="Confirm Password"
          keyboardType="name-phone-pad"
          iconLeftName="lock"
          onChangeText={handleTextChange}
          errorMessage={errors?.confirmPassword}
        />
        <CustomButton
          label="SUBMIT"
          disabled={!confirmPassword || !password}
          onPress={handleSubmit}
          loading={loading}
        />
      </Box>
    </Box>
  );
};
