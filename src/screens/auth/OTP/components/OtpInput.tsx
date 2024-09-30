import ErrorMessage from "@components/ErrorMessage";
import { useTheme } from "@utils/Theme";
import { WIDTH } from "@utils/dimensions";
import React from "react";
import { StyleSheet } from "react-native";
import OTPTextView from "react-native-otp-textinput";

interface otpInputProps {
  handleTextChange: (text: string) => void;
  errorMessage?: Array<string> | string | null;
}

export default ({ handleTextChange, errorMessage }: otpInputProps) => {
  const { colors } = useTheme();
  return (
    <>
      <OTPTextView
        inputCount={6}
        returnKeyType="done"
        keyboardType="numeric"
        secureTextEntry={false}
        tintColor={colors.primary}
        offTintColor={colors.primary}
        handleTextChange={handleTextChange}
        textInputStyle={styles.otpContainer}
        containerStyle={styles.otpViewStyle}
      />
      <ErrorMessage errorMessage={errorMessage} />
    </>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    margin: 10,
    marginTop: 20,
    width: WIDTH * 0.1,
    borderBottomWidth: 2,
    justifyContent: "center",
    color: "#3E3E3E",
  },
  otpViewStyle: { alignSelf: "center" },
});
