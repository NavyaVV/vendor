import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import Header from "@components/Header";
import { Box } from "@utils/Theme";
import React from "react";
import { ScrollView } from "react-native";

export default () => {
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerTrText="CHANGE PASSWORD" iconName="menu" />
      <ScrollView>
        <Box marginHorizontal="xxl">
          <CustomTextInput
            label="CURRENT PASSWORD"
            placeholder="CURRENT PASSWORD"
            secureTextEntry={true}
          />
          <CustomTextInput
            label="NEW PASSWORD"
            placeholder="CURRENT PASSWORD"
            secureTextEntry={true}
          />
          <CustomTextInput
            label="CONFIRM NEW PASSWORD"
            placeholder="CURRENT PASSWORD"
            secureTextEntry={true}
          />
        </Box>
      </ScrollView>
      <Box justifyContent="flex-end" marginHorizontal="xxl">
        <CustomButton label="SAVE CHANGES" />
      </Box>
    </Box>
  );
};
